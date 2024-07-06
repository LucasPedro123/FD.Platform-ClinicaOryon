import React from "react"
import * as S from './Sidebar.style'
import Logo from '../../assets/logo.png'
import { Link } from "react-router-dom"

export const Sidebar: React.FC = () => {
    return (
        <S.SidebarContainer>
            <S.SidebarWrapper>
                <S.SidebarImage src={Logo} />
                <S.SidebarTitle>
                    Clínica ORYON
                </S.SidebarTitle>
            </S.SidebarWrapper>
            <S.SidebarContent>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <S.SidebarItem >
                        <i className="fa-solid fa-users" style={{ color: 'white', fontSize: '1.3em' }}></i>
                        <S.SidebarText>Users</S.SidebarText>
                    </S.SidebarItem>
                </Link>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <S.SidebarItem >
                        <i className="fa-regular fa-envelope" style={{ color: 'white', fontSize: '1.3em' }}></i>
                        <S.SidebarText>Email Market</S.SidebarText>
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