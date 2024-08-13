import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, storage, auth } from '../Services/fireConfig';
import { collection, getDocs, query, where, Timestamp, doc, deleteDoc } from 'firebase/firestore';
import { ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { deleteUser, signInWithEmailAndPassword } from 'firebase/auth';
import { IUser, UserContextType } from '../Interfaces/web.interfaces';
import { toast } from 'react-toastify';

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [userImages, setUserImages] = useState<{ [key: string]: string }>({});

    const fetchUsers = async () => {
        try {
            const usersCollection = await getDocs(collection(db, 'users'));
            const usersData: IUser[] = [];

            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            for (const doc of usersCollection.docs) {
                const userData = doc.data() as IUser;
                if (userData.email && userData.name && userData.password && userData.phone) {
                    const foodsCollectionRef = collection(db, `users/${userData.userId}/foods`);
                    const foodQuery = query(
                        foodsCollectionRef,
                        where('date', '>=', Timestamp.fromDate(startOfWeek)),
                        where('date', '<=', Timestamp.fromDate(endOfWeek))
                    );
                    
                    const foodSnapshot = await getDocs(foodQuery);
                    const foods = foodSnapshot.docs.map(doc => doc.data());

                    const totalCalories = foods.reduce((total, food: any) => total + food.calories, 0);
                    userData.weeklyCalories = totalCalories;
                    userData.firestoreId = doc.id;
                    usersData.push(userData);
                }
            }
            
            setUsers(usersData);
            await fetchUserImages(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchUserImages = async (users: IUser[]) => {
        const images: { [key: string]: string } = {};
        for (const user of users) {
            try {
                const imageRef = ref(storage, `profile_pictures/${user.userId}.jpg`);
                const imageUrl = await getDownloadURL(imageRef);
                if (imageUrl) {
                    images[user.userId] = imageUrl;
                }
            } catch (error) {
                console.error(`Error fetching image for user ${user.userId}:`, error);
            }
        }
        setUserImages(images);
    };

    const deleteUserAccount = async (user: IUser) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            const userToDelete = userCredential.user;
    
            await deleteUser(userToDelete);
            console.log(`Successfully deleted user with ID: ${user.userId}`);
    
            if (user.firestoreId) {
                await deleteDoc(doc(db, 'users', user.firestoreId));
    
                const foodsQuery = query(collection(db, 'users', user.firestoreId, 'foods'));
                const foodDocs = await getDocs(foodsQuery);
                foodDocs.forEach(async (foodDoc) => {
                    await deleteDoc(foodDoc.ref);
                });
            }
    
            setUsers((prevUsers) => prevUsers.filter((u) => u.userId !== user.userId));
            toast.success('Usuário deletado com sucesso');
    
            const imageRef = ref(storage, `profile_pictures/${user.userId}.jpg`);
            try {
                await deleteObject(imageRef);
            } catch (storageError) {
                console.log('No profile picture found for user, or it could not be deleted.', storageError);
            }
    
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Error deleting user.');
        }
    };

    const getUserWeeklyCalories = async (userId: string) => {
        try {
            const today = new Date();
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());
            startOfWeek.setHours(0, 0, 0, 0);

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const foodsCollectionRef = collection(db, `users/${userId}/foods`);
            const foodQuery = query(
                foodsCollectionRef,
                where('date', '>=', Timestamp.fromDate(startOfWeek)),
                where('date', '<=', Timestamp.fromDate(endOfWeek))
            );
            
            const foodSnapshot = await getDocs(foodQuery);
            const foods = foodSnapshot.docs.map(doc => doc.data());

            const totalCalories = foods.reduce((total, food: any) => total + food.calories, 0);
            return totalCalories;
        } catch (error) {
            console.error('Error fetching user weekly calories:', error);
            return 0;
        }
    };

    const getUserDailyCalories = async (userId: string) => {
        const foodsCollectionRef = collection(db, `users/${userId}/foods`);
        const foodSnapshot = await getDocs(foodsCollectionRef);
        const foods = foodSnapshot.docs.map(doc => doc.data());
    
        const caloriesByDay: { [date: string]: number } = {};
    
        foods.forEach((food: any) => {
            const date = food.date.toDate().toISOString().split('T')[0]; // Converte o Timestamp para string de data
            if (!caloriesByDay[date]) {
                caloriesByDay[date] = 0;
            }
            caloriesByDay[date] += food.calories;
        });
    
        return Object.entries(caloriesByDay).map(([date, calories]) => ({ date, calories }));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, userImages, fetchUsers, deleteUserAccount, getUserWeeklyCalories, getUserDailyCalories }}>
            {children}
        </UserContext.Provider>
    );
};

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUserContext };
