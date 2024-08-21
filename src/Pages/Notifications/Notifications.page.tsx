import { useState, useEffect, useContext } from 'react';
import * as S from './Notifications.style';
import Modal from 'react-modal';
import { ClipLoader } from 'react-spinners';
import { NotificationsContext } from '../../Context/Notifications.context';

export const Notifications: React.FC = () => {
    const context = useContext(NotificationsContext);
    const [loading, setLoading] = useState(false);
    const [openisModalEdit, setOpenisModalEdit] = useState(false);
    const [openisModalAdd, setOpenisModalAdd] = useState(false);
    const [openisModalDelete, setOpenisModalDelete] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<any>(null);
    const [newNotificationTitle, setNewNotificationTitle] = useState('');
    const [newNotificationContent, setNewNotificationContent] = useState('');
    const [editNotificationTitle, setEditNotificationTitle] = useState('');
    const [editNotificationContent, setEditNotificationContent] = useState('');

    useEffect(() => {
        context?.fetchNotifications();
    }, []);

    const handleAddNotification = async () => {
        setLoading(true);
        await context?.addNotification({
            title: newNotificationTitle,
            content: newNotificationContent,
            date: new Date().toISOString(),
        });
        setLoading(false);
        setOpenisModalAdd(false);
        setNewNotificationTitle('');
        setNewNotificationContent('');
    };

    const handleEditNotification = async () => {
        if (selectedNotification) {
            setLoading(true);
            await context?.editNotification(selectedNotification.id, {
                title: editNotificationTitle,
                content: editNotificationContent,
                date: selectedNotification.date, 
            });
            setLoading(false);
            setOpenisModalEdit(false);
            setSelectedNotification(null);
            setEditNotificationTitle('');
            setEditNotificationContent('');
        }
    };

    const handleDeleteNotification = async () => {
        if (selectedNotification) {
            setLoading(true);
            await context?.deleteNotification(selectedNotification.id);
            setLoading(false);
            setOpenisModalDelete(false);
            setSelectedNotification(null);
        }
    };

    return (
        <S.NotificationsContainer>
            <S.Title>Notifications Manager</S.Title>
            <S.Button onClick={() => setOpenisModalAdd(true)}>
                Enviar Notificação
                <i className="fa-solid fa-bell"></i>
            </S.Button>
            <S.Wrapper>
                {context?.notifications.map((notification) => (
                    <S.NotificationsCard key={notification.id}>
                        <S.Content>
                            <S.NotificationsData>{notification.date}</S.NotificationsData>
                            <S.NotificationsTitle>{notification.title}</S.NotificationsTitle>
                            <S.NotificationsContent>{notification.content.slice(0, 100) + '...'}</S.NotificationsContent>
                        </S.Content>
                        <S.WrapperButton>
                            <S.ButtonDel onClick={() => {
                                setSelectedNotification(notification);
                                setOpenisModalDelete(true);
                            }}>
                                Excluir
                            </S.ButtonDel>
                            <S.ButtonEdit onClick={() => {
                                setSelectedNotification(notification);
                                setEditNotificationTitle(notification.title);
                                setEditNotificationContent(notification.content);
                                setOpenisModalEdit(true);
                            }}>
                                Editar
                            </S.ButtonEdit>
                        </S.WrapperButton>
                    </S.NotificationsCard>
                ))}
            </S.Wrapper>

            <Modal
                isOpen={openisModalAdd}
                onRequestClose={() => setOpenisModalAdd(false)}
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
                        width: '400px',
                    },
                }}
            >
                <S.ModalTitle>Adicionar Notificação</S.ModalTitle>
                <S.Form onSubmit={(e) => { e.preventDefault(); handleAddNotification(); }}>
                    <S.WrapperForm>
                        <S.Label>Título</S.Label>
                        <S.inputModal
                            type="text"
                            placeholder='Digite para adicionar Notificação'
                            name="title"
                            value={newNotificationTitle}
                            onChange={(e) => setNewNotificationTitle(e.target.value)}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Conteúdo</S.Label>
                        <S.textareaModal
                            
                            placeholder='Digite para adicionar conteúdo da Notificação'
                            name="content"
                            value={newNotificationContent}
                            onChange={(e) => setNewNotificationContent(e.target.value)}
                        />
                    </S.WrapperForm>
                    <S.ButtonWrapper >
                        <S.ButtonCancel type="button" onClick={() => setOpenisModalAdd(false)}>
                            Cancelar
                        </S.ButtonCancel>
                        <S.ButtonConfirm type="submit" disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#FFF" /> : 'Adicionar'}
                        </S.ButtonConfirm>
                    </S.ButtonWrapper>
                </S.Form>
            </Modal>

            {/* Modal de Editar Notificação */}
            <Modal
                isOpen={openisModalEdit}
                onRequestClose={() => setOpenisModalEdit(false)}
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
                        width: '400px',
                    },
                }}
            >
                <S.ModalTitle>Editar Notificação</S.ModalTitle>
                <S.Form onSubmit={(e) => { e.preventDefault(); handleEditNotification(); }}>
                    <S.WrapperForm>
                        <S.Label>Título</S.Label>
                        <S.inputModal
                            type="text"
                            placeholder='Digite para editar Notificação'
                            name="title"
                            value={editNotificationTitle}
                            onChange={(e) => setEditNotificationTitle(e.target.value)}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Conteúdo</S.Label>
                        <S.textareaModal
                           
                            placeholder='Digite para editar conteúdo da Notificação'
                            name="content"
                            value={editNotificationContent}
                            onChange={(e) => setEditNotificationContent(e.target.value)}
                        />
                    </S.WrapperForm>
                    <S.ButtonWrapper >
                        <S.ButtonCancel type="button" onClick={() => setOpenisModalEdit(false)}>
                            Cancelar
                        </S.ButtonCancel>
                        <S.ButtonConfirm type="submit" disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#FFF" /> : 'Editar'}
                        </S.ButtonConfirm>
                    </S.ButtonWrapper>
                </S.Form>
            </Modal>

            {/* Modal de Excluir Notificação */}
            <Modal
                isOpen={openisModalDelete}
                onRequestClose={() => setOpenisModalDelete(false)}
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
                        width: '400px',
                    },
                }}
            >
                <S.ModalTitle>Excluir Notificação</S.ModalTitle>
                <S.WrapperForm>
                    <S.Label>Tem certeza que deseja excluir esta notificação?</S.Label>
                </S.WrapperForm>
                <S.ButtonWrapper style={{ gap: 22, marginTop: 22, justifyContent: 'flex-end' }}>
                    <S.ButtonCancel type="button" onClick={() => setOpenisModalDelete(false)}>
                        Cancelar
                    </S.ButtonCancel>
                    <S.ButtonConfirm type="button" onClick={handleDeleteNotification} disabled={loading}>
                        {loading ? <ClipLoader size={20} color="#FFF" /> : 'Excluir'}
                    </S.ButtonConfirm>
                </S.ButtonWrapper>
            </Modal>
        </S.NotificationsContainer>
    );
};
