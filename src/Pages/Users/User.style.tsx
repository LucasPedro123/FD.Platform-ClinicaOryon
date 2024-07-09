import styled from "styled-components";

export const UserContainer = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const Table = styled.table`
    width: 70%;
    margin-left: 223px; 
`;

export const UsersWrapper = styled.div`
    margin-block: 40px;
    margin-left: 223px;
    padding: 0 20px; 

    display: flex;
    gap: 120px;
`;

export const UserLabel = styled.p`
    width: 108px;
    height: 14px;
    font-family: 'Roboto';
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.15px;
    color: #C4C4C4;
`
export const UserDiv = styled.div`

`

export const UserLength = styled.h1`
    font-family: 'Roboto';
    font-weight: 500;
    font-size: 64px;
    line-height: 75px;
    text-align: center;
    color: #343434;
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

export const LineProfile = styled.td`
    padding-block: 8px;
    display: flex;
    align-items: center;
    gap: 12px;

    p {
        font-family: 'Roboto';
        font-weight: 500;
        font-size: 15px;
        letter-spacing: 0.01em;
        color: #323C47;
    }
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
            color: #007BFF; // Cor ao passar o mouse
        }
    }
`;
