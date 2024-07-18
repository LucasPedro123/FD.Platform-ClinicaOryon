import React, { useState } from 'react';
import * as S from './Database.style';
import { useFoodContext } from '../../Context/Foods.context';
import Modal from 'react-modal';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Services/fireConfig';
import { PuffLoader } from 'react-spinners';

Modal.setAppElement('#root');

export const Database: React.FC = () => {
    const { foodItems, searchTerm, setSearchTerm, fetchFoodItems } = useFoodContext();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newFood, setNewFood] = useState({ name: '', portion: '', calories: 0 });
    const [loading, setLoading] = useState(false);

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
            id: lastFoodItem.id + 1,
            calories: Number(newFood.calories),
        };
        try {
            // Adicione o código para salvar o novo alimento no Firestore aqui
            await addDoc(collection(db, 'foodItems'), newFoodItem);
            fetchFoodItems();
            setModalIsOpen(false);
        } catch (error) {
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.SearchInput>
                    <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
                    <S.Input
                        placeholder="Pesquisar alimento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
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
                                <button onClick={() => { }}>⋮</button>
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
                        width: '530px',
                        height: '450px',
                        paddingInline: '40px',
                        borderRadius: '10px'
                    },
                }}
            >
                <S.ModalTitle>Adicionar Novo Alimento</S.ModalTitle>
                <S.Form>
                    <S.WrapperForm>
                        <S.Label>
                            Nome
                        </S.Label>
                        <S.inputModal
                            type="text"
                            name="name"
                            placeholder='Digite o nome do alimento'
                            value={newFood.name}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>

                    <S.WrapperForm>
                        <S.Label>
                            Porção
                        </S.Label>
                        <S.inputModal
                            type="text"
                            name="portion"
                            placeholder='Digite a porção do alimento'
                            value={newFood.portion}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>

                    <S.WrapperForm>
                        <S.Label>
                            Calorias
                        </S.Label>
                        <S.inputModal
                            type="number"
                            placeholder='Digite as calorias do alimento'
                            name="calories"
                            value={newFood.calories}
                            onChange={handleInputChange}
                        />
                    </S.WrapperForm>
                    <S.Wrapper style={{ gap: 22, marginTop: 22, justifyContent: 'flex-end' }}>
                        <S.ButtonCancel type="button" onClick={() => setModalIsOpen(false)}>Cancelar</S.ButtonCancel>
                        <S.ButtonConfirm type="button" onClick={handleAddFood}>Salvar</S.ButtonConfirm>
                    </S.Wrapper>
                </S.Form>
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <PuffLoader size={50} color={"#123abc"} loading={loading} />
                    </div>
                )}
            </Modal>
        </S.Container>
    );
};
