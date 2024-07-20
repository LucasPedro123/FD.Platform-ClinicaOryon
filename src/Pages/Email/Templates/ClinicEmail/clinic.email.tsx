import styled from 'styled-components';

const Container = styled.table`
  border-collapse: collapse;
  width: 100%;
  height: 100%;
`;

const Center = styled.td`
  text-align: center;
  width: 50%;
  padding: 20px 0;
  background-color: #fff;
`;

const Content = styled.td`
  background-color: #EEF0F2;
  padding: 40px 10%;
  width: 100%;
`;

const Image = styled.img`
  display: block;
  margin: 0 auto 24px auto;
`;

const Button = styled.a`
  background-color: #080A40;
  color: #fff;
  text-decoration: none;
  padding: 0px 14px;
  display: inline-block;
`;

const CardContainer = styled.td`
  text-align: center;
  margin-top: 20px;
  padding: 40px 0;
`;

const Card = styled.div`
  width: 252px;
  display: inline-block;
  vertical-align: top;
  border-left: solid 1px #ADADA9;
  border-bottom: solid 1px #ADADA9;
  border-right: solid 1px #ADADA9;
  margin: 0 8px;
`;

const CardImage = styled.img`
  width: 100%;
  display: block;
`;

const CardContent = styled.div`
  padding: 0 16px;
`;

const SocialIcons = styled.td`
  text-align: center;
  padding: 20px 0;
`;

const FooterLinks = styled.td`
  text-align: center;
  padding: 0 8px;
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: black;
  border-bottom: 1px solid black;
`;

const EmailTemplate1 = () => {
  return (
    <Container>
      <tbody>
        <tr>
          <Center>
            <Image width="150" src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/41f0b822-c276-4740-9416-a765a6a8740e" alt="Logo" />
          </Center>
        </tr>
        <tr>
          <Content>
            <h1 className="center" style={{ fontSize: '22px' }}>Olá, user_name! Bem-vindo à Clínica Oryon!</h1>
            <p style={{ fontSize: '14px', fontWeight: '400', marginTop: '24px', textAlign: 'center', margin: '24px auto 0 auto' }}>
              Na Clínica Oryon, unimos expertise médica e tecnologia de ponta para oferecer tratamentos estéticos e de saúde personalizados.
            </p>
            <Image className="main-image" src="http://clinicaoryon.com.br/wp-content/uploads/2016/08/dr_danilo.jpg" style={{ maxWidth: '420px', width: '100%', marginTop: '20px' }} />
            <p className="center" style={{ marginBottom: '24px', fontFamily: 'DM Sans', fontWeight: '400', fontSize: '14px', marginInline: '20px' }}>
              Dr. Danilo Bianchini Höfling, renomado endocrinologista e especialista em estética, possui Doutorado e Pós-Doutorado pela USP. Com vasta experiência e qualificação, ele oferece tratamentos inovadores e personalizados para sua saúde e beleza. Venha conhecer a excelência da Clínica Oryon!
            </p>
            <div className="center">
              <Button href="http://clinicaoryon.com.br/">
                <p style={{ color: '#fff' }}>Saiba mais</p>
              </Button>
            </div>
          </Content>
        </tr>
        <tr>
          <CardContainer>
            <Card>
              <CardImage src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/5628a67c-95cc-4a9a-a7d1-e10b725cb1a6" alt="Estrutura de Ponta no Itaim Bibi" />
              <CardContent>
                <h1 style={{ margin: '16px 0px 0px', fontWeight: '700', fontSize: '14px', textAlign: 'start' }}>Estrutura de ponta no Itaim Bibi</h1>
                <FooterLink href="http://clinicaoryon.com.br/a-clinica/"><p>Ler mais</p></FooterLink>
              </CardContent>
            </Card>
            <Card>
              <CardImage src="https://sorridents.com.br/wp-content/uploads/site//2/post_thumbnail-d17ef48f99228d653b64a2f5b3bc874a-768x512.jpeg" alt="Equipe altamente qualificada" />
              <CardContent>
                <h1 style={{ margin: '16px 0px 0px', fontWeight: '700', fontSize: '14px', textAlign: 'start' }}>Equipe altamente qualificada</h1>
                <FooterLink href="http://clinicaoryon.com.br/a-clinica/"><p>Ler mais</p></FooterLink>
              </CardContent>
            </Card>
          </CardContainer>
        </tr>
        <tr>
          <CardContainer>
            <Card>
              <CardImage src="http://clinicaoryon.com.br/wp-content/uploads/2016/08/3-191015-Oryon-016.jpg" alt="Tecnologia de última geração" />
              <CardContent>
                <h1 style={{ margin: '16px 0px 0px', fontWeight: '700', fontSize: '14px', textAlign: 'start' }}>Tecnologia de última geração</h1>
                <FooterLink href="http://clinicaoryon.com.br/a-clinica/"><p>Ler mais</p></FooterLink>
              </CardContent>
            </Card>
            <Card>
              <CardImage src="http://clinicaoryon.com.br/wp-content/uploads/2016/08/estetica_nova.jpg" alt="Tratamentos personalizados" />
              <CardContent>
                <h1 style={{ margin: '16px 0px 0px', fontWeight: '700', fontSize: '14px', textAlign: 'start' }}>Tratamentos personalizados</h1>
                <FooterLink href="http://clinicaoryon.com.br/estetica/"><p>Ler mais</p></FooterLink>
              </CardContent>
            </Card>
          </CardContainer>
        </tr>
        <tr>
          <td style={{ textAlign: 'center', paddingBottom: '40px' }}>
            <div className="center">
              <Button href="http://clinicaoryon.com.br/">
                <p style={{ color: '#fff' }}>Saiba mais</p>
              </Button>
            </div>
          </td>
        </tr>
        <tr>
          <SocialIcons>
            <table style={{ margin: '0 auto' }}>
              <tbody>
                <tr>
                  <td>
                    <a href="">
                      <Image src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/efa19c2c-9212-481c-944d-0fef76eaf8ed" width="30px" alt="Facebook" />
                    </a>
                  </td>
                  <td>
                    <a href="">
                      <Image src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/1ffe0214-0a40-40a4-98af-3a96b0df24a7" width="30px" alt="Instagram" />
                    </a>
                  </td>
                  <td>
                    <a href="">
                      <Image src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/15490e1b-4960-4dfd-a0bc-70279e74d3ad" width="30px" alt="Twitter" />
                    </a>
                  </td>
                  <td>
                    <a href="">
                      <Image src="https://github.com/LucasPedro123/clinica-oryon-app/assets/107084988/efeff5c7-335c-4b40-b155-9160516e4472" width="30px" alt="LinkedIn" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </SocialIcons>
        </tr>
        <tr>
          <td>
            <h1 style={{ marginTop: '24px', color: '#7A7474', fontSize: '14px', textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
              A Clínica Oryon conta com profissionais experientes em endocrinologia e metabologia, estética, dermatologia, ginecologia e obstetrícia e nutrição. Além disso, possui diversos equipamentos e tecnologias para tratamentos estéticos de alta performance, em ambiente agradável e acolhedor.
            </h1>
          </td>
        </tr>
        <tr>
          <td>
            <p style={{ fontSize: '12px', color: 'black', textAlign: 'center', fontWeight: '600' }}>Enviado por Clínica Oryon, Itaim Bibi, São Paulo</p>
          </td>
        </tr>
        <tr>
          <td>
            <table className="footer-links" style={{ margin: '20px auto' }}>
              <tbody>
                <tr>
                  <FooterLinks>
                    <FooterLink href="#">Política de Privacidade</FooterLink>
                  </FooterLinks>
                  <FooterLinks>
                    <FooterLink href="#">Termos de Uso</FooterLink>
                  </FooterLinks>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </Container>
  );
};

export default EmailTemplate1;
