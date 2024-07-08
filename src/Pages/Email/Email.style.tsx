import styled from 'styled-components'
import { STYLE_GUIDE } from '../../assets/Style/global'

export const EmailContainer = styled.div`
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

`

export const EmailTitle = styled.h1`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 42px;
    line-height: 130%;
    letter-spacing: 0.1px;
    color: ${STYLE_GUIDE.color.primary};

    margin-top: 30px;
    margin-bottom: 30px;
`
export const EmailItems = styled.div`
    display: flex;
    flex-direction: column;
    gap: 34px;
    
`
export const EmailItem = styled.div`
    width: 575px;
    height: 100%;;
    background: #EDEDED;
    box-shadow: 15px 15px 30px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-inline-start: 16px;
    padding-block-start: 16px;
    
    transition: 0.3s;

    &:hover{
        transform: scale(1.03);
        transform: translateY(-07px);
    }
`

export const EmailWrapper = styled.div`
    display: flex;
    gap: 24px;
`
export const EmailContent = styled.div`
    display: flex;
    flex-direction: column;
`


export const EmailContentCompany = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #666666;
`
export const EmailContentTitle = styled.h3`
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
`
export const EmailContentLabel = styled.p`
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #3C3C43;
`

export const EmailImage = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 12px;
    object-fit: cover;
`

export const EmailButton = styled.button`


    width: 274px;
    height: 30px;
    background: ${STYLE_GUIDE.color.secondary};
    border-radius: 100px;
    color: ${STYLE_GUIDE.color.white};
    cursor: pointer;
    border: none;
    align-self: center;
    margin-bottom: 20px;
    transition: 0.3s;

    &:hover{
        background: #6A5490;
    }

`