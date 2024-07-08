import React from "react";
import * as S from './Email.style';
import emailImage from '../../assets/Rectangle 1.png';
import emailImage2 from '../../assets/dr_danilo.jpg';
import emailjs from '@emailjs/browser';
import { db } from '../../Services/fireConfig';
import { collection, getDocs } from "firebase/firestore";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importe o CSS da biblioteca

interface IEmailSend {
    id: number;
    image: string;
    company: string;
    title: string;
    label: string;
}

const Email: React.FC = () => {
    const emailSend = [
        {
            id: 1,
            image: emailImage2,
            company: 'Clínica ORYON',
            title: 'A Clínica: sobre',
            label: 'Este email apresenta os serviços de estética oferecidos pela clínica, destacando a expertise do Dr. Danilo Bianchini Höfling.'
        },
        {
            id: 2,
            image: emailImage,
            company: 'Clínica ORYON',
            title: 'Estética',
            label: 'Email que fala sobre a clínica'
        },
        {
            id: 3,
            image: emailImage,
            company: 'Clínica ORYON',
            title: 'Estética',
            label: 'Mais Email que oferece os serviços de estética'
        },
    ]

    const sendEmail = (emailData: IEmailSend) => {
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
                    }
                });
                return  toast.success("Email enviado com sucesso");
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
                {emailSend.map((e: IEmailSend) => {
                    return (
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
                    )
                })}
            </S.EmailItems>
            <ToastContainer/>
        </S.EmailContainer>
    )
}

export default Email;
