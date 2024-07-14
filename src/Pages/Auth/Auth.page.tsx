// Auth.js
import * as S from './Auth.style';
import logoAdmin from '../../assets/logo-admin.png';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { LoggedIn } from '../../Context/LoggedIn.context';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Services/fireConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function Auth() {
    const [eyeBlocked, setEyeBlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [secretWord, setSecretWord] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const context = useContext(LoggedIn);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const docRef = doc(db, 'auth', 'credentials');
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.password === password && data.secretWord === secretWord) {
                    context?.handleLogin(true);
                    navigate('/Users');
                } else {
                    setError('Credenciais inválidas. Tente novamente.');
                }
            } else {
                setError('Credenciais não encontradas.');
            }
        } catch (err) {
            setError('Erro ao verificar credenciais. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.AuthContainer>
            <S.AuthContent>
                <S.ImageLogo src={logoAdmin} />
                <S.Form onSubmit={handleSubmit}>
                    <S.Wrapper>
                        <S.Icon className="fas fa-lock"></S.Icon>
                        <S.Input
                            id='word-key'
                            type="text"
                            required
                            value={secretWord}
                            onChange={(e) => setSecretWord(e.target.value)}
                        />
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <S.Label htmlFor='pass'>Senha</S.Label>
                    </S.Wrapper>
                    {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
                    <S.Button type='submit' disabled={loading}>
                        {loading ? <ClipLoader size={20} color={"#fff"} /> : 'Entrar'}
                    </S.Button>
                </S.Form>
            </S.AuthContent>
        </S.AuthContainer>
    );
}
