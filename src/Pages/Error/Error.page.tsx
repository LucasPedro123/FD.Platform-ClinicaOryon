import * as S from './Error.style'
import ErrorImage404 from '../../assets/erro-404.png'
import ErrorImage401 from '../../assets/icon-police-error.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { LoggedIn } from '../../Context/LoggedIn.context';
interface ErrorProps {
    typeError: string;
}

export const Error: React.FC<ErrorProps> = ({ typeError }) => {
    const context = useContext(LoggedIn);

    return (
        <S.Container>
            <S.Image src={typeError == '404' ? ErrorImage404 : ErrorImage401} style={{ width: typeError == '401' ? '520px' : '320px' }} alt="Error" />

            <S.Wrapper>
                <S.ErrorTitle>
                    {typeError === "404" ? "Oops, esta página não foi encontrada." : "Você não tem permissão para acessar esta página."}
                </S.ErrorTitle>
                <S.ErrorText>
                    {
                        typeError === '404'
                            ?
                            " A página que você procura pode ter sido removida, ter seu nome alterado ou estar temporariamente indisponível."
                            :
                            "A página que você tentou acessar requer credenciais de autenticação válidas. Verifique suas informações de login ou entre em contato com o administrador do sistema para obter acesso."
                    } <Link to={`/${context?.loggedIn ? 'Users' : ''}`}>Ir para página principal</Link>.
                </S.ErrorText>
            </S.Wrapper>
        </S.Container>
    )
}