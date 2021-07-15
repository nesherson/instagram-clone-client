import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';

import {
  onImageUrlChange,
  onCaptionChange,
  submitNewPost,
} from '../postsSlice/newPostSlice';
import { selectNewPost } from '../postsSlice/newPostSlice';

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
  @media only screen and (max-width: 664px) {
    grid-column-start: 1;
    grid-column-end: 4;
    padding: 10px 2%;
    border-radius: 0;
  }
`;

const UserImage = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  @media only screen and (max-width: 420px) {
    display: none;
  }
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
  @media only screen and (max-width: 664px) {
    min-width: 320px;
    flex-grow: 4;
  }
`;

const FormControl = styled.div`
  width: 100%;
  height: 100%;
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
  width: 425px;
  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;
  @media only screen and (max-width: 664px) {
    width: 80%;
  }
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
  max-width: 506px;
  min-width: 506px;
  box-sizing: border-box;

  &:focus {
    background-color: #f0f2f4;
  }
  transition: background-color 200ms ease;

  @media only screen and (max-width: 664px) {
    min-width: 100%;
    max-width: 100%;

    width: 100%;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 7px;
  margin-left: 5px;
  background-color: #5b86a7;
  color: #fff;
  width: 60px;
  @media only screen and (max-width: 632px) {
    width: 14%;
  }
`;

function NewPost({ profileImg }) {
  const dispatch = useDispatch();
  const { imageUrl, caption } = useSelector(selectNewPost);

  const handleOnChange = (e, input) => {
    switch (input) {
      case 'imageUrl':
        dispatch(onImageUrlChange(e.target.value));
        break;
      case 'caption':
        dispatch(onCaptionChange(e.target.value));
        break;
      default:
        return;
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const values = {
      imageUrl: imageUrl,
      caption: caption,
    };
    dispatch(submitNewPost(values));
  };

  return (
    <Container>
      <UserImage>
        <ImageWrapper>
          <Img src={profileImg} />
        </ImageWrapper>
      </UserImage>
      <Form onSubmit={handleOnSubmit}>
        <FormControl>
          <Input
            type='text'
            placeholder='Paste a URL'
            value={imageUrl}
            onChange={(e) => {
              handleOnChange(e, 'imageUrl');
            }}
          />
          <Button type='submit'>Post</Button>
        </FormControl>
        <FormControl>
          <Textarea
            name=''
            id=''
            value={caption}
            onChange={(e) => {
              handleOnChange(e, 'caption');
            }}
          >
            Write caption...
          </Textarea>
        </FormControl>
      </Form>
    </Container>
  );
}

export default NewPost;
