import { createContext, ReactNode } from 'react';
import { IEmailProps, IEmailSend } from '../Interfaces/web.interfaces';
import emailImage2 from '../assets/dr_danilo.jpg';
import EmailTemplate1 from '../Pages/Email/Templates/ClinicEmail/clinic.email';

export const EmailSendContext = createContext<IEmailSend | undefined>(undefined);

export const EmailSendProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const emailSend : IEmailProps[] = [
        {
            id: 1,
            image: emailImage2,
            company: 'Clínica ORYON',
            title: 'A Clínica: sobre',
            label: 'Este email apresenta os serviços de estética oferecidos pela clínica, destacando a expertise do Dr. Danilo Bianchini Höfling.',
            component: EmailTemplate1
        },
    ]

    const EmailSendValue : IEmailSend = {emailSend}
    return (
        <EmailSendContext.Provider value={EmailSendValue} >
            {children}
        </EmailSendContext.Provider>
    )
}