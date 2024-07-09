import React, { useEffect, useState } from "react"
import * as S from './Sidebar.style'
import Logo from '../../assets/logo.png'
import { Link, useLocation } from "react-router-dom";

export interface IlinkProps {
    emailLink: boolean;
    usersLink: boolean;
}

export const Sidebar: React.FC = () => {
    const [link, setLink] = useState<IlinkProps>({ emailLink: false, usersLink: false });
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/Users") {
            setLink({ emailLink: false, usersLink: true });
        } else if (location.pathname === "/EmailMarket") {
            setLink({ emailLink: true, usersLink: false });
        }
    }, [location]);

    return (
        <S.SidebarContainer>
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
                <Link to='/EmailMarket' style={{ textDecoration: 'none' }}>
                    <S.SidebarItem active={link.emailLink}>
                        <i className="fa-regular fa-envelope" style={{ color: link.emailLink == true ? 'white' : 'black', fontSize: '1.3em' }}></i>
                        <S.SidebarText active={link.emailLink}>Email Market</S.SidebarText>
                    </S.SidebarItem>
                </Link>
            </S.SidebarContent>
            <S.Footer>
                <S.FooterContent href="/">
                    <i className="fa-solid fa-right-from-bracket"></i>
                    <S.SidebarFooterText>Sair</S.SidebarFooterText>
                </S.FooterContent>
            </S.Footer>
        </S.SidebarContainer>
    )

}