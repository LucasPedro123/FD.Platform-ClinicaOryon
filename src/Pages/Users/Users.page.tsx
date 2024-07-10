import React, { useEffect, useState } from "react";
import * as S from './User.style';
import { db, storage, auth } from '../../Services/fireConfig';
import { collection, getDocs, query, where, Timestamp, deleteDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, deleteObject } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import iconUser from '../../assets/icon-user.png';
import Modal from 'react-modal';


interface User {
    email: string;
    name: string;
    password: string;
    phone: string;
    photoURL: string;
    userId: string;
    weeklyCalories?: number; // Adicionando a propriedade para as calorias semanais
}

// Define the root element for the modal
Modal.setAppElement('#root');

export const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [userImages, setUserImages] = useState<{ [key: string]: string }>({});
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const getUsersFromFirestore = async () => {
            try {
                const usersCollection = await getDocs(collection(db, 'users'));
                const usersData: User[] = [];

                const today = new Date();
                const startOfWeek = new Date(today);
                startOfWeek.setDate(today.getDate() - today.getDay());
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(today);
                endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
                endOfWeek.setHours(23, 59, 59, 999);

                for (const doc of usersCollection.docs) {
                    const userData = doc.data() as User;
                    // Verificação se todos os campos estão preenchidos
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

        const fetchUserImages = async (users: User[]) => {
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

        getUsersFromFirestore();
        console.log("Imagem do usuário:",userImages)
    }, []);

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                // Remover o usuário do Firebase Authentication
                const userAuth = auth.currentUser;
                console.log(userAuth)
                if (userAuth) {
                    await deleteUser(userAuth);
                }

                // Remover o usuário do Firestore
                await deleteDoc(doc(db, 'users', selectedUser.userId));

                // Remover a imagem do usuário do Firebase Storage
                const imageRef = ref(storage, `profile_pictures/${selectedUser.userId}.jpg`);
                await deleteObject(imageRef);

                // Atualizar o estado para remover o usuário da lista
                setUsers(users.filter(user => user.userId !== selectedUser.userId));
                setShowModal(false);
                setSelectedUser(null);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <S.UserContainer>
            <S.UsersWrapper>
                <S.UserDiv>
                    <S.UserLength>{users.length}</S.UserLength>
                    <S.UserLabel>Peoples</S.UserLabel>
                </S.UserDiv>
            </S.UsersWrapper>
            <S.Table>
                <S.Head>
                    <S.Column>
                        <S.ColumnName>Users</S.ColumnName>
                        <S.ColumnName>Email</S.ColumnName>
                        <S.ColumnName>Telefone</S.ColumnName>
                        <S.ColumnName>Senha</S.ColumnName>
                        <S.ColumnName>Calorias Semanais</S.ColumnName>
                        <S.ColumnName></S.ColumnName>
                    </S.Column>
                </S.Head>
                <S.Body>
                    {users.map((user) => (
                        <S.Line key={user.userId}>
                            <S.LineProfile>
                                {userImages[user.userId] ? (
                                    <img src={userImages[user.userId]} alt={user.name} style={{ width: '43px', height: '43px', objectFit: 'cover', borderRadius: '100%' }} />
                                ) : (
                                    <img src={iconUser} alt="user" />
                                )}
                                <p>{user.name}</p>
                            </S.LineProfile>
                            <S.Value>{user.email}</S.Value>
                            <S.Value>{user.phone}</S.Value>
                            <S.Value>{user.password}</S.Value>
                            <S.Value>{user.weeklyCalories?.toFixed(2)}</S.Value> {/* Exibindo as calorias semanais */}
                            <S.Actions>
                                <button onClick={() => { setSelectedUser(user); setShowModal(true); }}>⋮</button>
                            </S.Actions>
                        </S.Line>
                    ))}
                </S.Body>
            </S.Table>

            {selectedUser && (
                <Modal
                    isOpen={showModal}
                    onRequestClose={() => setShowModal(false)}
                    contentLabel="Confirm Delete"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '450px',
                            height: 176,
                            padding: '20px',
                        },
                    }}
                >
                    <S.ModalTitle>Deseja excluir este usuário?</S.ModalTitle>
                    <S.ModalText>Tem certeza que deseja excluir o usuário {selectedUser.name}?</S.ModalText>
                    <S.ButtonWrapper >
                        <S.ButtonCancel  onClick={() => setShowModal(false)}>Cancelar</S.ButtonCancel>
                        <S.ButtonConfirm  onClick={handleDeleteUser} style={{ marginLeft: '10px' }}>Excluir</S.ButtonConfirm>
                    </S.ButtonWrapper>
                </Modal>
            )}
        </S.UserContainer>
    );
};
