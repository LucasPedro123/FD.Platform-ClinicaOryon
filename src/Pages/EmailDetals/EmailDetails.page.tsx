import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'; // Importar o hook para acessar os parâmetros da rota
import * as S from './EmailDetails.style'; // Importe o módulo de estilos conforme necessário
import { EmailSendContext } from '../../Context/EmailsSend.context';

export const EmailDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const context = useContext(EmailSendContext);
    const EmailDetail = id ? context?.emailSend.find(e => e.id === parseInt(id)) : undefined;

    const ComponentEmail = EmailDetail?.component;
    
    return (
        <S.Container>
            {ComponentEmail ? <ComponentEmail /> : <div>Componente não encontrado</div>}
        </S.Container>
    );
};
