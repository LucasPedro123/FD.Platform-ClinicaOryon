import React, { useEffect, useRef, useState } from 'react';
import * as S from './Database.style';
import { useFoodContext } from '../../Context/Foods.context';
import Modal from 'react-modal';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Services/fireConfig';
import { ClipLoader } from 'react-spinners';
import { Food } from '../../Interfaces/web.interfaces';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

export const Database: React.FC = () => {
    const { foodItems, searchTerm, setSearchTerm, fetchFoodItems } = useFoodContext();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const [newFood, setNewFood] = useState({ name: '', portion: '', calories: 0 });
    const [loading, setLoading] = useState(false);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [optionsIsOpen, setOptionsIsOpen] = useState<number | null>(null);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            fetchFoodItems();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const handleAddFood = async () => {
        setLoading(true);
        const lastFoodItem = foodItems[foodItems.length - 1];
        const newFoodItem = {
            ...newFood,
            id: lastFoodItem ? lastFoodItem.id + 1 : 1,
            calories: Number(newFood.calories),
        };
        try {
            await addDoc(collection(db, 'foodItems'), newFoodItem);
            fetchFoodItems();
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditFood = async () => {
        setLoading(true);
        if (!selectedFood) return;
        try {
            const foodDoc = doc(db, 'foodItems', selectedFood.firestoreId);
            await updateDoc(foodDoc, {
                name: newFood.name,
                portion: newFood.portion,
                calories: Number(newFood.calories),
            });
            fetchFoodItems();
            setEditModalIsOpen(false);
            toast.success('Food item updated successfully!');
        } catch (error) {
            console.error('Error updating document: ', error);
            toast.error('Error updating food item.');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteFood = async () => {
        if (!selectedFood) return;
        setLoading(true);
        try {
            const foodDoc = doc(db, 'foodItems', selectedFood.firestoreId);
            await deleteDoc(foodDoc);
            fetchFoodItems();
            setDeleteModalIsOpen(false);
        } catch (error) {
            console.error('Error deleting document: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOptionsClick = (index: number) => {
        setOptionsIsOpen(optionsIsOpen === index ? null : index);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
            setOptionsIsOpen(null);
        }
    };

    const openEditModal = (food: Food) => {
        setSelectedFood(food);
        setNewFood({ name: food.name, portion: food.portion, calories: food.calories });
        setEditModalIsOpen(true);
    };

    const openDeleteModal = (food: Food) => {
        setSelectedFood(food);
        setDeleteModalIsOpen(true);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <S.Container>
            <S.Wrapper>
                <S.SearchInput>
                    <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
                    <S.Input
                        placeholder="Pesquisar alimento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                </S.SearchInput>
                <S.Button onClick={() => setModalIsOpen(true)}>
                    Incluir Novo Alimento
                </S.Button>
            </S.Wrapper>
            <S.Table>
                <S.Head>
                    <S.Column>
                        <S.ColumnName>Alimento</S.ColumnName>
                        <S.ColumnName>Porção</S.ColumnName>
                        <S.ColumnName>Calorias</S.ColumnName>
                    </S.Column>
                </S.Head>
                <S.Body>
                    {foodItems.slice(0, 60).map((foodItem, index) => (
                        <S.Line key={index}>
                            <S.Value>{foodItem.name}</S.Value>
                            <S.Value>{foodItem.portion}</S.Value>
                            <S.Value>{foodItem.calories}</S.Value>
                            <S.Actions>
                                <button onClick={() => handleOptionsClick(index)}>⋮</button>
                                {
                                    optionsIsOpen === index &&
                                    <S.ModalOptions ref={optionsRef}>
                                        <S.TextBackground onClick={() => openEditModal(foodItem)}>
                                            <S.ButtonText>Editar</S.ButtonText>
                                        </S.TextBackground>
                                        <S.TextBackground onClick={() => openDeleteModal(foodItem)}>
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
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
                <S.ModalTitle>Adicionar Novo Alimento</S.ModalTitle>
                <S.Form onSubmit={handleAddFood}>
                    <S.WrapperForm>
                        <S.Label>Nome do Alimento</S.Label>
                        <S.inputModal
                            type="text"
                            name="name"
                            placeholder='Digite o nome do alimento'
                            value={newFood.name}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Porção</S.Label>
                        <S.inputModal
                            type="text"
                            name="portion"
                            placeholder='Digite a porção do alimento'
                            value={newFood.portion}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Calorias</S.Label>
                        <S.inputModal
                            type="number"
                            placeholder='Digite as calorias do alimento'
                            name="calories"
                            value={newFood.calories}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.Wrapper style={{ gap: 22, marginTop: 22, justifyContent: 'flex-end' }}>
                        <S.ButtonCancel type="button" onClick={() => setModalIsOpen(false)}>
                            Cancelar
                        </S.ButtonCancel>
                        <S.ButtonConfirm type="submit" disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#FFF" /> : 'Adicionar'}
                        </S.ButtonConfirm>
                    </S.Wrapper>
                </S.Form>
            </Modal>

            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={() => setEditModalIsOpen(false)}
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
                <S.ModalTitle>Editar Alimento</S.ModalTitle>
                <S.Form onSubmit={handleEditFood}>
                    <S.WrapperForm>
                        <S.Label>Nome do Alimento</S.Label>
                        <S.inputModal
                            type="text"
                            name="name"
                            placeholder='Digite o nome do alimento'
                            value={newFood.name}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Porção</S.Label>
                        <S.inputModal
                            type="text"
                            name="portion"
                            placeholder='Digite a porção do alimento'
                            value={newFood.portion}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.WrapperForm>
                        <S.Label>Calorias</S.Label>
                        <S.inputModal
                            type="number"
                            placeholder='Digite as calorias do alimento'
                            name="calories"
                            value={newFood.calories}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.Wrapper style={{ gap: 22, marginTop: 22, justifyContent: 'flex-end' }}>
                        <S.ButtonCancel type="button" onClick={() => setEditModalIsOpen(false)}>
                            Cancelar
                        </S.ButtonCancel>
                        <S.ButtonConfirm type="submit" disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#FFF" /> : 'Salvar'}
                        </S.ButtonConfirm>
                    </S.Wrapper>
                </S.Form>
            </Modal>

            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={() => setDeleteModalIsOpen(false)}
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
                <S.ModalTitle>Excluir Alimento</S.ModalTitle>
                <S.Form onSubmit={handleDeleteFood}>
                    <S.ModalText>
                        Você tem certeza que deseja excluir este alimento?
                    </S.ModalText>
                    <S.Wrapper style={{ gap: 22, marginTop: 22, justifyContent: 'flex-end' }}>
                        <S.ButtonCancel type="button" onClick={() => setDeleteModalIsOpen(false)}>
                            Cancelar
                        </S.ButtonCancel>
                        <S.ButtonConfirm type="submit" disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#FFF" /> : 'Excluir'}
                        </S.ButtonConfirm>
                    </S.Wrapper>
                </S.Form>
            </Modal>
        </S.Container>
    );
};
