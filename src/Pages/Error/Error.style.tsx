import styled from 'styled-components'

export const Container = styled.div`
    display: flex; 
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 38px;
    background-color: #fff;
    z-index: 99;
    width: 100vw;
    height: 100vh;
`
export const Image = styled.img`
    width: 340px;
`
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
export const ErrorTitle = styled.h2`
    font-weight: 800;
    font-size: 50px;
    line-height: 70px;
    color: #2C2B2B;
    text-align: center;
`
export const ErrorText = styled.p`
    font-weight: 800;
    font-size: 16px;
    line-height: 19px;
    color: #908D8D;
    text-align: center;
    padding-inline: 80px;

`
export const Link = styled.link`

`