import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db, storage } from '../Services/fireConfig';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { IUser, UserContextType } from '../Interfaces/web.interfaces';





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

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <UserContext.Provider value={{ users, userImages, fetchUsers }}>
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
