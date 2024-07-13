import * as S from './Auth.style';
import logoAdmin from '../../assets/logo-admin.png';
import { useState } from 'react';

export default function Auth() {
    const [eyeBlocked, setEyeBlocked] = useState<boolean>(false);

    return (
        <S.AuthContainer>
            <S.AuthContent>
                <S.ImageLogo src={logoAdmin} />
                <S.Form>
                    <S.Wrapper>
                        <S.Icon className="fas fa-lock"></S.Icon>
                        <S.Input id='word-key' type="text" required />
                        <S.Label htmlFor='word-key'>Palavra-chave</S.Label>
                    </S.Wrapper>
                    <S.Wrapper>
                        <S.Icon
                            className={eyeBlocked ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'}
                            onClick={() => setEyeBlocked(!eyeBlocked)}
                        ></S.Icon>
                        <S.Input
                            id='pass'
                            type={eyeBlocked ? "text" : "password"}
                            required
                        />
                        <S.Label htmlFor='pass'>Senha</S.Label>
                    </S.Wrapper>
                    <S.Button type='submit'>Entrar</S.Button>
                </S.Form>
            </S.AuthContent>
        </S.AuthContainer>
    );
}
