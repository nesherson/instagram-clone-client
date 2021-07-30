import styled from 'styled-components';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { selectUser } from '../../../user/userSlice/userSlice';

import { selectNewPost, submitNewPost} from '../../postsSlice/newPostSlice';

import { ImageUrlInput, CaptionTextarea } from './NewPostForm';

import { URL_REGEXP } from '../../../../constants/constants';


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
  background-color: #e7e7e7;
  border: 1px solid rgba(185,185,185,0.4);

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

const Button = styled.button`
  border: 1px solid transparent;
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

const Warning = styled.span`
  font-size: 0.8rem;
  color: #ff1a1a;
`;

function NewPost() {

  const dispatch = useDispatch();

  const { profileImg } = useSelector(selectUser);

  const { register, handleSubmit, reset, formState: {errors}} = useForm();
  const { isSuccess, isError, errorMessage } = useSelector(selectNewPost);

  const onSubmit = ({imageUrl, caption}) => {
    const values = {imageUrl, caption};

    dispatch(submitNewPost(values));
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  return (
    <Container>
      <UserImage>
        <ImageWrapper>
          <Img src={profileImg} />
        </ImageWrapper>
      </UserImage>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <ImageUrlInput type='text' name='imageUrl' register={register} required pattern={URL_REGEXP} placeholder='Paste u URL' errors={errors}/>
          <Button type='submit'>Post</Button>
        </FormControl>
        <FormControl>
          <CaptionTextarea name='caption' register={register} required placeholder='Post caption...' errors={errors} />
        </FormControl>
      </Form>
      { isError ?
        <Warning>{errorMessage}</Warning>
        : null
      }
    </Container>
  );
}

export default NewPost;
