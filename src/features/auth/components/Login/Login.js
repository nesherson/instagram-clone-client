import styled from 'styled-components';

import signupImg from '../../../../assets/images/signup_img.jpg';

const Container = styled.div`
  width: 800px;
  min-width: 340px;
  height: 580px;
  border-radius: 7px;
  margin: 150px auto 0 auto;
  display: flex;
  box-shadow: 0 0.5px 2.2px rgba(0, 0, 0, 0.02),
    0 1.3px 5.3px rgba(0, 0, 0, 0.028), 0 2.4px 10px rgba(0, 0, 0, 0.035),
    0 4.2px 17.9px rgba(0, 0, 0, 0.042), 0 7.9px 33.4px rgba(0, 0, 0, 0.05),
    0 19px 80px rgba(0, 0, 0, 0.07);

  @media only screen and (max-width: 1024px) {
    width: 100%;
    border-radius: 0;
  }
`;

const LoginWrapper = styled.section`
  width: 430px;
  margin: 0;
  padding: 50px 5%;
  @media only screen and (max-width: 1024px) {
    width: 60%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
    padding: 50px 16%;
  }
  @media only screen and (max-width: 520px) {
    width: 100%;
    padding: 50px 14%;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
    padding: 50px 6%;
  }
  @media only screen and (max-width: 380px) {
    width: 100%;
    padding: 50px 2%;
  }
`;

const ImageWrapper = styled.section`
  width: 370px;
  height: 100%;
  margin: 0;
  padding: 0;
  @media only screen and (max-width: 1024px) {
    width: 40%;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 7px 7px 0;
  @media only screen and (max-width: 1024px) {
    width: 100%;
    border-radius: 0;
  }
`;

const Headline = styled.h1`
  text-align: center;
  margin: 15px 0;
  padding: 0;
  font-size: 1.9rem;
  color: #5b86a7;
`;

const H2 = styled.h2`
  font-size: 1.3rem;
  text-align: center;
  margin: 10px 0;
  padding: 0;
  color: #3e494e;
`;

const Form = styled.form`
  margin: 20px 10%;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin: 6px 0;
  padding: 9px 10px;
  border-radius: 7px;
  border: 2px solid #dbe7eb;
  color: #808080;
  background-color: #f7f8f9;
  outline: none;
  &:focus {
    border-color: #8cb2c0;
  }
`;

const Button = styled.button`
  padding: 10px 45px;
  margin: 10px 0;
  align-self: center;
  border-radius: 7px;
  border: none;
  background-color: #5b86a7;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
`;

const P = styled.p`
  text-align: center;
  color: #3e494e;
  font-size: 0.95rem;
`;

const Link = styled.a`
  text-decoration: none;
  color: #5b86a7;
`;

const Signup = () => {
  return (
    <Container>
      <LoginWrapper>
        <Headline>Welcome back</Headline>
        <Form>
          <H2>Let's sign you in</H2>
          <Input type='email' name='email' placeholder='email' />
          <Input type='password' name='password' placeholder='password' />
          <Button type='submit'>Log in</Button>
        </Form>
        <P>
          Don't have an account? <Link href='#'>Sign up</Link>
        </P>
      </LoginWrapper>
      <ImageWrapper>
        <Image src={signupImg} alt='two hands trying to touch' />
        {/*Image author: https://unsplash.com/photos/iJ2IG8ckCpA?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink*/}
      </ImageWrapper>
    </Container>
  );
};

export default Signup;
