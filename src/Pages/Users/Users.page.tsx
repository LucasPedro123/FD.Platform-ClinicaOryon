import React, { useEffect, useRef, useState } from "react";
import * as S from './User.style';
import iconUser from '../../assets/icon-user.png';
import Modal from 'react-modal';
import { useUserContext } from '../../Context/Users.context';
import { IUser } from "../../Interfaces/web.interfaces";
import { ClipLoader } from "react-spinners";
import { toast } from 'react-toastify';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { STYLE_GUIDE } from "../../assets/Style/global";


Modal.setAppElement('#root');

export const Users: React.FC = () => {
    const { users, userImages, deleteUserAccount, getUserDailyCalories, getUserWeeklyCalories } = useUserContext();
    const [showModalUser, setShowModalUser] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [optionsIsOpen, setOptionsIsOpen] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dailyCalories, setDailyCalories] = useState<{ date: string, calories: number }[]>([]);
    const optionsRef = useRef<HTMLDivElement>(null);


    // Handler for clicking outside the options menu
    const handleClickOutside = (event: MouseEvent) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setOptionsIsOpen(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDeleteUser = async () => {
        if (selectedUser) {
            setLoading(true);
            try {
                await deleteUserAccount(selectedUser);
                setShowModal(false);
                setSelectedUser(null);
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Error deleting user.');
            } finally {
                setLoading(false);
            }
        }
    };

    const handleOptionsClick = (index: number) => {
        setOptionsIsOpen(optionsIsOpen === index ? null : index);
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
    );

    const handleViewUser = async (user: IUser) => {
        if (!getUserWeeklyCalories || !getUserDailyCalories) {
            console.error('Funções de busca de calorias não estão definidas');
            toast.error('Erro ao buscar as calorias do usuário.');
            return;
        }

        setLoading(true);
        try {
            const dailyCalories = await getUserDailyCalories(user.userId);
            setDailyCalories(dailyCalories);
            setSelectedUser(user);
            setShowModalUser(true);
        } catch (error) {
            console.error('Error fetching calories:', error);
            toast.error('Error fetching calories.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString : string | undefined) => {
        // Cria um objeto Date a partir da string ISO 8601
        if (dateString == undefined) {
            return;
        }
        
        const date = new Date(dateString);
      
        // Extrai o dia, o mês e o ano
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mês começa de 0, então adicionamos 1
        const year = date.getFullYear();
      
        // Retorna a data formatada no formato DD/MM/AAAA
        return `${day}/${month}/${year}`;
    };
    
    return (
        <S.UserContainer>
            <S.UsersWrapper>
                <S.MetricsDiv>
                    <S.UserDiv>
                        <S.UserLength>{filteredUsers.length}</S.UserLength>
                        <S.UserLabel>Peoples</S.UserLabel>
                    </S.UserDiv>

                </S.MetricsDiv>
                <S.SearchInput>
                    <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
                    <S.Input
                        placeholder="Pesquisar usuário..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </S.SearchInput>
            </S.UsersWrapper>
            <S.Table>
                <S.Head>
                    <S.Column>
                        <S.ColumnName>Users</S.ColumnName>
                        <S.ColumnName>Email</S.ColumnName>
                        <S.ColumnName>Telefone</S.ColumnName>
                        <S.ColumnName>Senha</S.ColumnName>
                        <S.ColumnName>Data de Nascimento</S.ColumnName>
                        <S.ColumnName>Calorias Semanais</S.ColumnName>
                        <S.ColumnName></S.ColumnName>
                    </S.Column>
                </S.Head>
                <S.Body>
                    {filteredUsers.map((user, index: number) => (
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
                            <S.Value>{formatDate(user.birthDate)}</S.Value>
                            <S.Value>{user.weeklyCalories?.toFixed(2)}</S.Value>
                            <S.Actions>
                                <button onClick={() => { setSelectedUser(user); handleOptionsClick(index); }}>⋮</button>
                                {
                                    optionsIsOpen === index &&
                                    <S.ModalOptions ref={optionsRef}>
                                        <S.TextBackground onClick={() => handleViewUser(user)}>
                                            <S.ButtonText>Visualizar</S.ButtonText>
                                        </S.TextBackground>
                                        <S.TextBackground onClick={() => setShowModal(true)}>
                                            <S.ButtonText>Excluir</S.ButtonText>
                                        </S.TextBackground>
                                    </S.ModalOptions>
                                }
                            </S.Actions>
                        </S.Line>
                    ))}
                </S.Body>
            </S.Table>

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
                <S.ModalText>Tem certeza que deseja excluir o usuário {selectedUser?.name}?</S.ModalText>
                <S.ButtonWrapper >
                    <S.ButtonCancel onClick={() => setShowModal(false)}>Cancelar</S.ButtonCancel>
                    <S.ButtonConfirm onClick={handleDeleteUser} style={{ marginLeft: '10px' }}>{loading ? <ClipLoader size={20} color="#FFF" /> : 'Excluir'}</S.ButtonConfirm>
                </S.ButtonWrapper>
            </Modal>

            <Modal
                isOpen={showModalUser}
                onRequestClose={() => setShowModalUser(false)}
                contentLabel="Confirm Delete"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    },
                    content: {
                        position: "absolute",
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '450px',
                        padding: '20px',
                        backgroundColor: '#fff', // Fundo opaco para o conteúdo do modal
                    },
                }}
            >
                {selectedUser && (
                    <S.ModalContent>
                        <S.ModalUserWrapper>
                            {userImages[selectedUser.userId] ? (
                                <img src={userImages[selectedUser.userId]} alt={selectedUser.name} style={{ width: '43px', height: '43px', objectFit: 'cover', borderRadius: '100%' }} />
                            ) : (
                                <img src={iconUser} alt="user" />
                            )}
                            <S.ModelUserName>
                                {selectedUser.name}
                            </S.ModelUserName>
                        </S.ModalUserWrapper>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={dailyCalories} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="calories" fill={STYLE_GUIDE.color.secondary} radius={50} barSize={30}/>
                            </BarChart>
                        </ResponsiveContainer>
                        <S.ButtonCancel onClick={() => setShowModalUser(false)}>
                            Cancelar
                        </S.ButtonCancel>
                    </S.ModalContent>
                )}
            </Modal>
        </S.UserContainer>
    );
};
