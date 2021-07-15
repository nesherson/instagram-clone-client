import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectPosts } from '../postsSlice/postListSlice';
import { fetchPosts } from '../postsSlice/postListSlice';

import { selectUser } from '../../user/userSlice/userSlice';
import { fetchUser } from '../../user/userSlice/userSlice';

import { fetchComments } from '../postsSlice/commentListSlice';

import { selectNewPost } from '../postsSlice/newPostSlice';

import Header from './Header';
import Posts from './Posts';
import NewPost from './NewPost';
import UserDetails from './UserDetails';
import { selectNewCommentPostSuccess } from '../postsSlice/newCommentSlice';

const Container = styled.section`
  padding-top: 94px;
  height: calc(100vh - 94px );
  display: grid;
  grid-template-rows: 130px auto;
  grid-template-columns: 1fr 614px 322px 1fr;
  grid-column-gap: 30px;
  background-color: #fbfbfb;
  min-width: 320px;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr auto 1fr;
  }

  @media only screen and (max-width: 632px) {
    grid-template-columns: 1fr auto 1fr;
  }
`;

function Feed() {
  const dispatch = useDispatch();
  const { username, fullname, profileImg } = useSelector(selectUser);
  const {newPostSubmitSuccess} = useSelector(selectNewPost);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [newPostSubmitSuccess]);

  return (
    <Container>
      <Header />
      <NewPost profileImg={profileImg} />
      <UserDetails
        username={username}
        fullname={fullname}
        profileImg={profileImg}
      />
      <Posts postList={posts} />
    </Container>
  );
}

export default Feed;
