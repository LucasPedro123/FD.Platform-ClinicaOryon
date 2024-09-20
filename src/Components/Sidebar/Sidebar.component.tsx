import React, { useContext, useEffect, useState } from "react"
import * as S from './Sidebar.style'
import Logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";
import { LoggedIn } from "../../Context/LoggedIn.context";
import { IlinkProps } from "../../Interfaces/web.interfaces";

export const Sidebar: React.FC = () => {
    const [link, setLink] = useState<IlinkProps>({ emailLink: false, usersLink: false, databaseLink: false, notificationsLink: false });
    const location = useLocation();
    const context = useContext(LoggedIn)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (location.pathname === "/Users") {
            setLink({ emailLink: false, usersLink: true, databaseLink: false, notificationsLink: false });
        } else if (location.pathname === "/EmailMarketing") {
            setLink({ emailLink: true, usersLink: false, databaseLink: false, notificationsLink: false });
        } else if (location.pathname === "/Database") {
            setLink({ emailLink: false, usersLink: false, databaseLink: true, notificationsLink: false });
        } else if (location.pathname === "/Notifications") {
            setLink({ emailLink: false, usersLink: false, databaseLink: false, notificationsLink: true });
        }
    }, [location]);

    return (

        <S.Page isOpen={isOpen}>
            <S.Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
            <S.MenuButton onClick={() => setIsOpen(!isOpen)}>
                <i className="fa-solid fa-bars"></i>
            </S.MenuButton>
            <S.SidebarContainer isOpen={isOpen}>
                <S.SidebarWrapper>
                    <S.SidebarImage src={Logo} />
                    <S.SidebarTitle>
                        Clínica ORYON
                    </S.SidebarTitle>
                </S.SidebarWrapper>
                <S.SidebarContent>
                    <Link to='/Users' style={{ textDecoration: 'none' }}>
                        <S.SidebarItem active={link.usersLink}>
                            <i className="fa-solid fa-users" style={{ color: link.usersLink ? 'white' : 'black', fontSize: '1.3em' }}></i>
                            <S.SidebarText active={link.usersLink}>Users</S.SidebarText>
                        </S.SidebarItem>
                    </Link>
                    <Link to='/EmailMarketing' style={{ textDecoration: 'none' }}>
                        <S.SidebarItem active={link.emailLink}>
                            <i className="fa-regular fa-envelope" style={{ color: link.emailLink == true ? 'white' : 'black', fontSize: '1.3em' }}></i>
                            <S.SidebarText active={link.emailLink}>Email Marketing</S.SidebarText>
                        </S.SidebarItem>
                    </Link>
                    <Link to='/Database' style={{ textDecoration: 'none' }}>
                        <S.SidebarItem active={link.databaseLink}>
                            <i className="fa-solid fa-database" style={{ color: link.databaseLink == true ? 'white' : 'black', fontSize: '1.3em' }}></i>
                            <S.SidebarText active={link.databaseLink}>Database</S.SidebarText>
                        </S.SidebarItem>
                    </Link>
                    <Link to='/Notifications' style={{ textDecoration: 'none' }}>
                        <S.SidebarItem active={link.notificationsLink}>
                            <i className="fa-solid fa-bell" style={{ color: link.notificationsLink == true ? 'white' : 'black', fontSize: '1.3em' }}></i>
                            <S.SidebarText active={link.notificationsLink}>Notificação</S.SidebarText>
                        </S.SidebarItem>
                    </Link>
                </S.SidebarContent>
                <S.Footer>
                    <S.FooterContent href="/">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <S.SidebarFooterText onClick={() => { context?.handleLogin(false) }}>Sair</S.SidebarFooterText>
                    </S.FooterContent>
                </S.Footer>
            </S.SidebarContainer>
        </S.Page>
    )

}