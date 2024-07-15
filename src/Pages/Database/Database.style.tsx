import styled from "styled-components";
import { STYLE_GUIDE } from "../../assets/Style/global";

export const Container = styled.div`
margin-top: 100px;
    margin-left: 223px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 70px;
`

export const Wrapper = styled.div`
    display: flex;
    gap: 44px;
`
    
export const SearchInput = styled.div`
    border: 1px solid #C4C4C4;
    border-radius: 8px;
    width: 300px;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 13px;
    padding-left: 22px;
`
    
export const Input = styled.input`
    outline: none;
    border: none;
    width: 90%;
    
    
`
export const Icon = styled.i`
    color: #C4C4C4;
`

export const Button = styled.button`
    width: 182px; 
    height: 40px;
    border-radius: 30px;
    background-color: ${STYLE_GUIDE.color.secondary};
    color: ${STYLE_GUIDE.color.white};
    border: none;
    transition: 0.3s;
    cursor: pointer;

    &:hover{
        background-color: #6A5490;
    }
`

export const Table = styled.table`
    width: 70%;
`;

export const Column = styled.tr`
`;

export const ColumnName = styled.th`
    text-align: start;
    padding-bottom: 30px;
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.01em;
    color: #7D7D7D;
`;

export const Value = styled.td`
    padding-block: 8px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.01em;
    color: #7D7D7D;
`;

export const Line = styled.tr`
`;

export const Body = styled.tbody`
width: 100%;
`;

export const Head = styled.thead`
width: 100%;

`;

export const Actions = styled.td`
    position: relative;

    button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;

        &:hover {
            color: ${STYLE_GUIDE.color.secondary}; // Cor ao passar o mouse
        }
    }
`;