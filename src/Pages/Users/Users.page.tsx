import React, { useState } from "react";
import * as S from './User.style';
import { db, auth, storage } from '../../Services/fireConfig';
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import iconUser from '../../assets/icon-user.png';
import Modal from 'react-modal';
import { useUserContext } from '../../Context/Users.context';
import { IUser } from "../../Interfaces/web.interfaces";

Modal.setAppElement('#root');

export const Users: React.FC = () => {
    const { users, userImages, fetchUsers } = useUserContext();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

    const handleDeleteUser = async () => {
        if (selectedUser) {
            try {
                const userAuth = auth.currentUser;
                if (userAuth) {
                    await deleteUser(userAuth);
                }

                await deleteDoc(doc(db, 'users', selectedUser.userId));

                const imageRef = ref(storage, `profile_pictures/${selectedUser.userId}.jpg`);
                await deleteObject(imageRef);

                fetchUsers(); // Atualizar a lista de usuários
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
                            <S.Value>{user.weeklyCalories?.toFixed(2)}</S.Value>
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
