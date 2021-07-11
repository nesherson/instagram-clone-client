import styled from 'styled-components';

import testImg from '../../../assets/images/test.jpg';

const Container = styled.div`
  border: 1px solid rgba(204, 204, 204, 0.3);
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color: #fff;
  border-radius: 7px;
  padding: 10px;
  display: flex;
`;

const UserImage = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-grow: 3;
  max-width: 506px;
  min-width: 506px;
`;

const Input = styled.input`
  background-color: #f7f8f9;
  border: none;
  font-family: inherit;
  color: #404040;
  border-radius: 6px;
  outline: none;
  margin-bottom: 3px;
  padding: 7px;

  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;
`;

const Textarea = styled.textarea`
  background-color: #f7f8f9;
  border: none;
  font-family: inherit;
  color: #404040;
  outline: none;
  border-radius: 6px;
  margin-top: 3px;
  padding: 7px;
  max-width: 492px;
  min-width: 492px;
  height: 100%;
  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;
`;

function NewPost() {
  return (
    <Container>
      <UserImage>
        <ImageWrapper>
          <Img src={testImg} />
        </ImageWrapper>
      </UserImage>
      <Form>
        <Input type='text' placeholder='Paste a URL' />
        <Textarea name='' id=''>
          Write caption...
        </Textarea>
      </Form>
    </Container>
  );
}

export default NewPost;
