import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  onEmailChange,
  onFullnameChange,
  onUsernameChange,
  onPasswordChange,
} from '../../authSlice/signUpSlice';
import {
  selectEmail,
  selectFullname,
  selectUsername,
  selectPassword,
} from '../../authSlice/signUpSlice';

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

const Link = styled(NavLink)`
  text-decoration: none;
  color: #5b86a7;
`;

const Signup = () => {
  const emailValue = useSelector(selectEmail);
  const fullnameValue = useSelector(selectFullname);
  const usernameValue = useSelector(selectUsername);
  const passwordValue = useSelector(selectPassword);

  const dispatch = useDispatch();

  const handleOnChange = (e, input) => {
    switch (input) {
      case 'email':
        dispatch(onEmailChange(e.target.value));
        break;
      case 'fullname':
        dispatch(onFullnameChange(e.target.value));
        break;
      case 'username':
        dispatch(onUsernameChange(e.target.value));
        break;
      case 'password':
        dispatch(onPasswordChange(e.target.value));
        break;
      default:
        return;
    }
  };

  return (
    <Container>
      <LoginWrapper>
        <Headline>Create Account</Headline>
        <Form>
          <H2>Sign up to see photos and videos from your friends.</H2>
          <Input
            type='email'
            name='email'
            value={emailValue}
            onChange={(e) => {
              handleOnChange(e, 'email');
            }}
            placeholder='email'
          />
          <Input
            type='text'
            name='fullname'
            value={fullnameValue}
            onChange={(e) => {
              handleOnChange(e, 'fullname');
            }}
            placeholder='fullname'
          />
          <Input
            type='text'
            name='username'
            value={usernameValue}
            onChange={(e) => {
              handleOnChange(e, 'username');
            }}
            placeholder='username'
          />
          <Input
            type='password'
            name='password'
            value={passwordValue}
            onChange={(e) => {
              handleOnChange(e, 'password');
            }}
            placeholder='password'
          />
          <Button type='submit'>Sign up</Button>
        </Form>
        <P>
          Have an account? <Link to='/'>Log in</Link>
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
