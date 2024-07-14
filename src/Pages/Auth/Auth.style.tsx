import styled from "styled-components";
import imageClinic from '../../assets/imageClinic.jpg';
import { STYLE_GUIDE } from "../../assets/Style/global";

export const AuthContainer = styled.div`
    background-image: url(${imageClinic});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    &::before {
        content: '';
        z-index: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(217, 217, 217, 0.2);
        backdrop-filter: blur(6.15px);
    }
`;

export const AuthContent = styled.div`
    z-index: 1;
    width: 374px;
    height: 501px;
    background-color: #fff;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-inline: 37px;
`;

export const ImageLogo = styled.img`
    height: 140px;
    width: 280px;
`;

export const Form = styled.form`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    position: relative;
`;

export const Icon = styled.i`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    cursor: pointer;
`;

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.44);
    margin: 30px 0;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    padding: 0 35px 0 5px;
    border: none;
    background: transparent;
    font-size: 1em;
    color: #343434;
    font-weight: 600;

    &:focus {
        outline: none;
    }

    &:focus + label,
    &:valid + label {
        top: 0px;
        color: #999;
    }

    &::-ms-reveal, 
    &::-ms-clear {
        display: none;
    }
`;

export const Label = styled.label`
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    font-weight: 600;
    pointer-events: none;
    transition: 0.4s;
    font-style: normal;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.44);


`;

export const Button = styled.button`
    width: 100%;
    height: 40px;
    background-color: ${STYLE_GUIDE.color.secondary};
    margin-top: 60px;

    border: none;
    color: #fff;
    border-radius: 30px;
    cursor: pointer;
    transition: 0.3s;
    font-size: 16px;

    &:hover{
        background-color: #6A5490;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`
export const ErrorMessage = styled.p`
    position: absolute;
    bottom: 100px;
    color: #f86969;
`