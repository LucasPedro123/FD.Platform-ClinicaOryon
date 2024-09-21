import styled from "styled-components";
import { STYLE_GUIDE } from "../../assets/Style/global";

export const Container = styled.div`
margin-top: 100px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 70px;
    @media (min-width: 1024px){
        margin-left: 223px;
    }
`

export const Wrapper = styled.div`
    display: flex;
    gap: 44px;
    @media(max-width: 768px){
        flex-direction: column;
        align-items: center;
    }
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
    @media(max-width: 768px){
        width: 100%;
    }
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
    @media(max-width: 768px){
        width: 90%;
    }
`;

export const Column = styled.tr`
`;

export const ColumnName = styled.th`
    text-align: start;
    padding-bottom: 30px;
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 14px;
    color: #7D7D7D;

    @media (max-width: 768px) {
        font-size: 12px;
    }

    @media (max-width: 480px) {
        display: none; 
    }
`;

export const Value = styled.td`
    padding-block: 8px;
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 1rem;
    color: #7D7D7D;
    padding-block: 20px;

    span{
        display: none;
    }
    @media (max-width: 768px) {
        font-size: 10px;
    }

    @media (max-width: 480px) {
        span{
            display: flex;
        }
    }
`;


export const Line = styled.tr`
`;

export const Body = styled.tbody`
width: 100%;
`;

export const Head = styled.thead`
    width: 100%;
    position: relative; 
    
    &::after {
        content: "";
        position: absolute;
        bottom: 0; 
        left: 0; 
        width: 100%; 
        height: 1px; 
        background: #e1e1e1; 
    }
`;

export const Actions = styled.td`
    position: relative;

    button {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            color: ${STYLE_GUIDE.color.secondary}; // Cor ao passar o mouse
        }
    }
`;

export const ModalTitle = styled.h2`
    margin-bottom: 22px;
`

export const WrapperForm = styled.div`
    flex-direction: column;
    display: flex;
    gap: 6px;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 28px;
`

export const inputModal = styled.input`
    outline: none;
    background: transparent;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 8px;
    padding-left: 20px;
`
export const Label = styled.label`
    font-weight: 400;
    font-size: 15px;
    line-height: 130%;
    letter-spacing: 0.1px;
    color: #323C47;
`

export const ButtonCancel = styled.button`
    border: none;
    cursor: pointer;
    height: 38px;
    border-radius: 6px;
    padding-inline: 15px;
    color: ${STYLE_GUIDE.color.white};
    background: #7D7D7D;

    transition: 0.3s;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.2px;





    &:hover{
        background: #636363;
    }
    
`

export const ButtonConfirm = styled.button`
    border: none;
    height: 38px;
    border-radius: 6px;
    cursor: pointer;
    
    background-color: ${STYLE_GUIDE.color.secondary};
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.2px;
    color: #FFFFFF;
    width: 80px;
    transition: 0.3s;

    &:hover{
        background: #6A5490;
    }
`

export const ModalOptions = styled.div`
    position: absolute;
    bottom: 20px;
    right: 10px;
    width: 80px;
    background: #F1F1F1;
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    overflow: 'auto';
`

export const ButtonWrapper = styled.div`
    display: flex;  
    justify-content: end;
    gap: 12px;
    margin-top: 20px;
`

export const ButtonText = styled.p`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    &:hover{
        background-color: #e4e4e4;
    }
`

export const TextBackground = styled.div`
    padding-block: 10px;
    cursor: pointer;
    
    &:hover{
        background-color: #e4e4e4;
    }
`

export const ModalText = styled.p``