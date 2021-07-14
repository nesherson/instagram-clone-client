import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectPosts } from '../postsSlice/postListSlice';
import { fetchPosts } from '../postsSlice/postListSlice';

import { selectUser } from '../../user/userSlice/userSlice';
import { fetchUserByToken } from '../../user/userSlice/userSlice';

import { selectComments } from '../postsSlice/commentListSlice';
import { fetchComments } from '../postsSlice/commentListSlice';

import Header from './Header';
import Posts from './Posts';
import NewPost from './NewPost';
import UserDetails from './UserDetails';

const Container = styled.section`
  padding-top: 94px;
  height: 100%;
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
  const posts = useSelector(selectPosts);

  const token = localStorage.getItem('token');

  useEffect(() => {
    dispatch(fetchUserByToken(token));
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, []);

  useEffect(() => {
    dispatch(fetchComments());
  }, []);

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
