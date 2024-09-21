import styled from 'styled-components';
import { STYLE_GUIDE } from '../../assets/Style/global';

export const NotificationsContainer = styled.div`
    margin-top: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 1024px){
        margin-left: 223px;
    }
`

export const Title = styled.h1`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 42px;
    line-height: 130%;
    letter-spacing: 0.1px;
    color:${STYLE_GUIDE.color.primary};

    text-align: center;
    
    @media(max-width: 1023px){
        font-size: 2rem;
    }
`



export const Button = styled.button`
    margin-top: 22px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    i{
        font-size: 1em
    }
`

export const Wrapper = styled.div`
    margin-top: 46px;
    display: flex;
    flex-direction: column;
    gap: 22px;
    align-items: center;
`
export const NotificationsCard = styled.div`
    width: 575px;
    padding-block: 15px;
    padding-inline: 24px;

    display: flex;
    flex-direction: column;
    gap: 14px;

    background: #EDEDED;
    box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.25);
    border-radius: 12px;

    cursor: pointer;
    transition: 0.3s;

    &:hover{
        transform: scale(1.03);
        transform: translateY(-07px);
    }
    @media(max-width: 768px){
        width: 90%;
        gap: 20px;
    }
`

export const WrapperButton = styled.div`
    display: flex;
    gap: 10px;
`
export const ButtonDel = styled.button`
    border: none;
    cursor: pointer;
    height: 38px;
    border-radius: 6px;
    padding-inline: 15px;
    color: ${STYLE_GUIDE.color.white};
    background: ${STYLE_GUIDE.color.gray200};

    transition: 0.3s;

    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.2px;

    &:hover{
        background: #636363;
    }
    
`

export const ButtonEdit = styled.button`
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

export const NotificationsData = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #666666;
`
export const NotificationsTitle = styled.h3`
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
    color: ${STYLE_GUIDE.color.dark};
`
export const NotificationsContent = styled.p`
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: ${STYLE_GUIDE.color.gray200};
`

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    @media(max-width: 768px){
        gap: 12px;
    }
`









// Modal

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
export const textareaModal = styled.textarea`
    outline: none;
    resize: none;
    height: 167px;
    background: transparent;
    border: 1px solid #C4C4C4;
    display: flex;
    align-items: center;
    border-radius: 8px;
    padding-left: 20px;
    padding-top: 10px;
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
    height: 38px;
    border-radius: 6px;
    cursor: pointer;
    
    background-color: #7D7D7D;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.2px;
    color: #FFFFFF;
    width: 80px;
    transition: 0.3s;
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