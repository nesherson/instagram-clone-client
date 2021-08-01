import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchAuthUser } from '../../auth/authSlice/authSlice';

import Header from './Header';
import Posts from './Posts';
import NewPost from './NewPost/NewPost';
import UserDetails from './UserDetails';

const Container = styled.section`
  padding-top: 94px;
  min-height: 100vh;
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

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <NewPost />
      <UserDetails />
      <Posts />
    </Container>
  );
}

export default Feed;
