import styled from "styled-components";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { MoreHorizontal, Heart, MessageCircle, Bookmark } from "react-feather";

import { selectLikePostStatus } from "../postsSlice/likesSlice";

import { selectNewCommentSubmitStatus } from "../postsSlice/commentsSlice";

import { fetchPostById } from "../api/postsAPI";
import { fetchCommentsByPostId, submitNewComment } from "../api/commentsAPI";
import { fetchLikesByPostId, likePost } from "../api/likesAPI";

import { selectPost } from "../postsSlice/postSlice";

//import { savePost } from "../../user/userSlice/userSlice";

import { NewCommentInput } from "./Post/NewCommentForm";
import Modal from "../../../components/Modal/Modal";
import Header from "./Header";

const Container = styled.article`
  margin: 94px auto 25px auto;
  width: 862px;
  border: 1px solid rgba(185, 185, 185, 0.4);
  border-radius: 7px;
  background-color: #fff;
  @media only screen and (max-width: 664px) {
    border-radius: 0;
  }
`;

const PostHeader = styled.div`
  height: 52px;
  border-bottom: 1px solid rgba(185, 185, 185, 0.4);
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
  background-color: #e7e7e7;
  border: 1px solid rgba(185, 185, 185, 0.4);
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
  border-bottom: 1px solid rgba(185, 185, 185, 0.4);
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
  background-color: ${(props) => (props.disabled ? "#bdcedb" : "#5b86a7")};
  color: #fff;
  width: 10%;
  @media only screen and (max-width: 464px) {
    width: 15%;
  }
`;

const PostOptions = styled.section`
  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.button`
  border: none;
  border-bottom: 1px solid rgba(185, 185, 185, 0.4);
  padding: 15px 0;
  background-color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  color: #000;
`;

function PostDetails() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);


  const { imageUrl, caption, likes, comments, user } = useSelector(selectPost);

  const { register, handleSubmit, setValue, watch, formState: { errors }} = useForm();


  const newCommentSubmitStatus = useSelector(selectNewCommentSubmitStatus);
  const likePostStatus = useSelector(selectLikePostStatus);

  const onSubmit = ({newComment}) => {
    const values = {
      postId: id,
      newComment
    };

    dispatch(submitNewComment(values));
  };

  const handleModalOnClose = () => {
    setShowModal(false);
  };

  const handleModalOnOpen = () => {
    setShowModal(true);
  };

  const handleLikePost = () => {
    dispatch(likePost(id));
  };

  // const handleBookmark = () => {
  //   const values = {
  //     userId: user.id,
  //     postId: id,
  //   };
  //   dispatch(savePost(values));
  // };

  const isInputEmpty = () => {
    const newCommentValue = watch("newComment");
    return typeof newCommentValue === "undefined" || newCommentValue.length < 1
      ? true
      : false;
  };

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch]);

  useEffect(() => {
    if (newCommentSubmitStatus.isSuccess) {
      dispatch(fetchCommentsByPostId(id));
    }
  }, [dispatch, newCommentSubmitStatus.isSuccess]);

  useEffect(() => {
    if (newCommentSubmitStatus.isSuccess) {
      setValue('newComment', '');
    }
  }, [dispatch, newCommentSubmitStatus.isSuccess]);

  useEffect(() => {
    dispatch(fetchLikesByPostId(id));
  }, [dispatch, likePostStatus.isSuccess]);

  return (
    <>
      <Header />
      <Container>
        {user ? (
          <>
            <PostHeader>
              <HeaderLeftSide>
                <UserImage>
                  <ImageWrapper>
                    <ProfileImg src={user.profileImg} />
                  </ImageWrapper>
                </UserImage>
                <Username>{user.username}</Username>
              </HeaderLeftSide>
              <HeaderRightSide>
                <Icon onClick={handleModalOnOpen}>
                  <MoreHorizontal size={28} />
                </Icon>
              </HeaderRightSide>
            </PostHeader>
            <ImgContainer>
              <PostImg src={imageUrl} />
            </ImgContainer>
            <PostBody>
              <Social>
                <IconsWrapper>
                  <IconLeft onClick={handleLikePost}>
                    <Heart size={30} strokeWidth={1.3} />
                  </IconLeft>
                  <IconLeft>
                    <MessageCircle size={30} strokeWidth={1.3} />
                  </IconLeft>
                </IconsWrapper>
                <Icon>
                  {/*onClick={handleBookmark}*/}
                  <Bookmark size={30} strokeWidth={1.3} />
                </Icon>
              </Social>
              <Likes>{likes.length} likes</Likes>
              <PostCaption>
                <Username>{user.username}</Username>
                <Text>{caption}</Text>
              </PostCaption>
              <PostComments>
                {comments.length > 0
                  ? comments.map((comment) => {
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
              <NewCommentInput type='text' name='newComment' register={register} placeholder='Add a comment...' errors={errors} />
              <Button disabled={isInputEmpty()} onClick={handleSubmit(onSubmit)}>
                Post
              </Button>
            </NewComment>
            <Modal show={showModal} onClose={handleModalOnClose}>
              <PostOptions>
                <OptionButton>
                  <Link to={`/post/${id}`}>Go to post</Link>
                </OptionButton>
                <OptionButton onClick={handleModalOnClose}>Cancel</OptionButton>
              </PostOptions>
            </Modal>
          </>
        ) : null}
      </Container>
    </>
  );
}

export default PostDetails;
