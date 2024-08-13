import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { db } from '../Services/fireConfig'; // Importe sua configuração do Firebase
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Notification } from '../Interfaces/web.interfaces'; // Importe seu tipo de notificação

type NotificationsContextType = {
    notifications: Notification[];
    fetchNotifications: () => Promise<void>;
    addNotification: (notification: Omit<Notification, 'id'>) => Promise<void>;
    editNotification: (id: string, notification: Omit<Notification, 'id'>) => Promise<void>;
    deleteNotification: (id: string) => Promise<void>;
};

export const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const fetchNotifications = async () => {
        const querySnapshot = await getDocs(collection(db, 'notifications'));
        const notificationsData: Notification[] = [];
        querySnapshot.forEach((doc) => {
            notificationsData.push({ id: doc.id, ...doc.data() } as Notification);
        });
        setNotifications(notificationsData);
    };

    const addNotification = async (notification: Omit<Notification, 'id'>) => {
        const docRef = await addDoc(collection(db, 'notifications'), notification);
        setNotifications([...notifications, { id: docRef.id, ...notification }]);
    };

    const editNotification = async (id: string, notification: Omit<Notification, 'id'>) => {
        const docRef = doc(db, 'notifications', id);
        await updateDoc(docRef, notification);
        setNotifications(notifications.map((notif) => (notif.id === id ? { id, ...notification } : notif)));
    };

    const deleteNotification = async (id: string) => {
        const docRef = doc(db, 'notifications', id);
        await deleteDoc(docRef);
        setNotifications(notifications.filter((notif) => notif.id !== id));
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <NotificationsContext.Provider value={{ notifications, fetchNotifications, addNotification, editNotification, deleteNotification }}>
            {children}
        </NotificationsContext.Provider>
    );
};
