import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MoreHorizontal, Heart, MessageCircle, Bookmark } from 'react-feather';

import {
  selectNewComments,
  selectNewComment,
} from '../postsSlice/newCommentSlice';

import {
  onTextChange,
  clearState,
  submitNewComment,
} from '../postsSlice/newCommentSlice';

import { selectComments } from '../postsSlice/commentListSlice';

const Container = styled.article`
  border: 1px solid rgba(204, 204, 204, 0.3);
  margin-top: 30px;
  border-radius: 7px;
  background-color: #fff;
  @media only screen and (max-width: 664px) {
    border-radius: 0;
  }
`;

const PostHeader = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserImage = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 38px;
  height: 38px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid rgba(204, 204, 204, 0.3);
`;

const ProfileImg = styled.img`
  width: 100%;
  height: auto;
`;

const HeaderLeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-size: 0.92rem;
  font-weight: 500;
`;

const HeaderRightSide = styled.div``;

const Icon = styled.div`
  cursor: pointer;
`;

const IconLeft = styled.div`
  cursor: pointer;
  margin-right: 12px;
`;

const ImgContainer = styled.div``;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostBody = styled.div`
  padding: 0.6em;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
`;

const Social = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconsWrapper = styled.div`
  display: flex;
`;

const Likes = styled.span`
  display: block;
  padding: 7px 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const PostCaption = styled.div`
  margin: 5px 0 10px 0;
`;

const Text = styled.p`
  margin: 5px 0 5px 5px;
  padding: 0;
  font-size: inherit;
`;

const PostComments = styled.div``;

const Comment = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const NewComment = styled.div`
  padding: 0.6em;
  display: flex;
`;

const Input = styled.input`
  border: none;
  outline: none;
  width: 90%;
  @media only screen and (max-width: 464px) {
    width: 85%;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  padding: 7px;
  margin-left: 5px;
  background-color: ${(props) => (props.disabled ? '#bdcedb' : '#5b86a7')};
  color: #fff;
  width: 10%;
  @media only screen and (max-width: 464px) {
    width: 15%;
  }
`;

function Post({ id, username, profileImg, postImg, likes, caption }) {
  const dispatch = useDispatch();
  const newComments = useSelector(selectNewComments);
  const { isSuccess } = useSelector(selectNewComment);

  const commentList = useSelector(selectComments)
    .filter((comment) => comment.postId === id)
    .map((comment) => ({
      id: comment.id,
      username: comment.user.username,
      text: comment.text,
    }));

  console.log('commentList: ', commentList);

  const newCommentText = useSelector((state) => {
    const index = state.newComment.comments.findIndex(
      (comment) => comment.postId === id
    );
    if (index !== -1) {
      return state.newComment.comments[index].commentText;
    } else {
      return '';
    }
  });

  const handleOnChange = (e) => {
    const values = {
      postId: id,
      commentText: e.target.value,
    };
    dispatch(onTextChange(values));
  };

  const handleOnClick = () => {
    const index = newComments.findIndex((comment) => comment.postId === id);

    const values = {
      postId: id,
      commentText: newComments[index].commentText,
    };

    dispatch(submitNewComment(values));
  };

  const isInputEmpty = () => {
    const index = newComments.findIndex((comment) => comment.postId === id);
    if (index === -1) {
      return true;
    } else {
      return newComments[index].commentText === '';
    }
  };

  useEffect(() => {
    dispatch(clearState());
  }, [dispatch, isSuccess]);

  return (
    <Container>
      <PostHeader>
        <HeaderLeftSide>
          <UserImage>
            <ImageWrapper>
              <ProfileImg src={profileImg} />
            </ImageWrapper>
          </UserImage>
          <Username>{username}</Username>
        </HeaderLeftSide>
        <HeaderRightSide>
          <Icon>
            <MoreHorizontal size={28} />
          </Icon>
        </HeaderRightSide>
      </PostHeader>
      <ImgContainer>
        <PostImg src={postImg} />
      </ImgContainer>
      <PostBody>
        <Social>
          <IconsWrapper>
            <IconLeft>
              <Heart size={30} strokeWidth={1.3} />
            </IconLeft>
            <IconLeft>
              <MessageCircle size={30} strokeWidth={1.3} />
            </IconLeft>
          </IconsWrapper>
          <Icon>
            <Bookmark size={30} strokeWidth={1.3} />
          </Icon>
        </Social>
        <Likes>{likes} likes</Likes>
        <PostCaption>
          <Username>{username}</Username>
          <Text>{caption}</Text>
        </PostCaption>
        <PostComments>
          {commentList.length > 0
            ? commentList.map((comment) => {
                return (
                  <Comment key={comment.id}>
                    <Username>{comment.username}</Username>
                    <Text>{comment.text}</Text>
                  </Comment>
                );
              })
            : null}
        </PostComments>
      </PostBody>
      <NewComment>
        <Input
          type='text'
          value={newCommentText}
          onChange={handleOnChange}
          placeholder='Add a comment...'
        />
        <Button disabled={isInputEmpty()} onClick={handleOnClick}>
          Post
        </Button>
      </NewComment>
    </Container>
  );
}

export default Post;
