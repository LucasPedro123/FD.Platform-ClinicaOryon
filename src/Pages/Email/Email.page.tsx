import React, { useContext } from "react";
import * as S from './Email.style';
import emailjs from '@emailjs/browser';
import { db } from '../../Services/fireConfig';
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS da biblioteca
import { Link } from "react-router-dom";
import { IEmailProps } from "../../Interfaces/web.interfaces";
import { EmailSendContext } from "../../Context/EmailsSend.context";


const Email: React.FC = () => {
    const context = useContext(EmailSendContext);
    const emailSendValue = context?.emailSend;


    const sendEmail = (emailData: IEmailProps) => {
        const getUsersFromFirestore = async () => {
            try {
                const usersCollection = await getDocs(collection(db, 'users'));
                usersCollection.forEach((doc) => {
                    const userData = doc.data();
                    if (userData.name && userData.email) {
                        const templateParams = {
                            company: emailData.company,
                            user_name: userData.name,
                            to_email: userData.email
                        };

                        emailjs.send('service_mvm0i4e', 'template_6yfcnup', templateParams, 'Y_t8Xe4z0hOvSRyQq')
                            .then((response) => {
                                console.log('SUCCESS!', response.status, response.text);
                            })
                            .catch((err) => {
                                console.log('FAILED...', err);
                                toast.error("Falha ao enviar E-mail")
                            });
                        toast.success("Email enviado com sucesso")
                    }
                });
                return toast.success("Email enviado com sucesso");
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Erro ao buscar usuários.');
            }
        };


        getUsersFromFirestore();
    };

    return (
        <S.EmailContainer>
            <S.EmailTitle>EMAIL MARKETING</S.EmailTitle>
            <S.EmailItems>
                {emailSendValue && emailSendValue.map((e: IEmailProps) => {
                    return (
                        <Link
                            to={`/EmailMarketing/${e.id}`}
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <S.EmailItem key={e.id}>
                                <S.EmailWrapper>
                                    <S.EmailImage src={e.image} alt="email" />
                                    <S.EmailContent>
                                        <S.EmailContentCompany>{e.company}</S.EmailContentCompany>
                                        <S.EmailContentTitle>{e.title}</S.EmailContentTitle>
                                        <S.EmailContentLabel>{e.label}</S.EmailContentLabel>
                                    </S.EmailContent>
                                </S.EmailWrapper>
                                <S.EmailButton onClick={() => sendEmail(e)}>
                                    Enviar
                                </S.EmailButton>
                            </S.EmailItem>
                        </Link>
                    )
                })}
            </S.EmailItems>
            <ToastContainer />
        </S.EmailContainer>
    )
}

export default Email;
