import React from 'react';
import * as S from './Database.style';
import { useFoodContext } from '../../Context/Foods.context';

export const Database: React.FC = () => {
    const { foodItems, searchTerm, setSearchTerm } = useFoodContext();

    return (
        <S.Container>
            <S.Wrapper>
                <S.SearchInput>
                    <S.Icon className="fa-solid fa-magnifying-glass"></S.Icon>
                    <S.Input 
                        placeholder="Pesquisar alimento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </S.SearchInput>
                <S.Button>
                    Incluir novo alimento +
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
                    {foodItems.map((foodItem, index) => (
                        <S.Line key={index}>
                            <S.Value>{foodItem.name}</S.Value>
                            <S.Value>{foodItem.portion}</S.Value>
                            <S.Value>{foodItem.calories}</S.Value>
                            <S.Actions>
                                <button onClick={() => {}}>⋮</button>
                            </S.Actions>
                        </S.Line>
                    ))}
                </S.Body>
            </S.Table>
        </S.Container>
    );
};
