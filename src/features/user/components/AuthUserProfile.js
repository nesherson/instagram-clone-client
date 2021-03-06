import { useEffect } from 'react';
import styled from 'styled-components';
import { Route, NavLink, useRouteMatch, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bookmark, Grid, Heart, MessageCircle } from 'react-feather';

import { fetchPostsByUserId } from '../../posts/api/postsAPI';
import { fetchSavedPosts } from '../../posts/api/savedPostsAPI';
import { selectAuthUser } from '../userSlice/authUserSlice/authUserSlice';
import {
  selectAuthUserPosts,
  selectaAuthUserPostsFetchStatus,
} from '../userSlice/authUserSlice/authUserPostsSlice';

import { selectSavedPosts } from '../../user/userSlice/authUserSlice/authUserSavedPostsSlice';

import Header from '../../posts/components/Header';

const Container = styled.section`
  margin-top: 64px;
  height: calc(100vh - 94px);
  display: grid;
  grid-template-columns: 1fr 294px 294px 294px 1fr;
  grid-template-rows: 170px 53px auto;
  background-color: #fbfbfb;
  padding: 10px 25px 10px 25px;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 85% 1fr;
  }

  @media only screen and (max-width: 716px) {
    padding: 10px 0 10px 0;
    grid-template-rows: 145px 53px auto;
  }
`;

const ProfileHeader = styled.header`
  grid-column: 2 / 5;
  grid-row: 1 / 2;
  display: flex;
  @media only screen and (max-width: 1024px) {
    grid-column: 2 / 3;
  }
`;

const UserImage = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 2;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 126px;
  height: 126px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #e7e7e7;
  border: 1px solid rgba(204, 204, 204, 0.3);

  @media only screen and (max-width: 716px) {
    width: 76px;
    height: 76px;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: auto;
`;

const UserDetails = styled.section`
  flex-grow: 6;
`;

const Username = styled.h2`
  font-weight: 300;
  font-size: 1.45rem;
`;

const Fullname = styled.h2`
  font-weight: 500;
  font-size: 1.02rem;
`;

const SocialStats = styled.h3`
  font-size: 0.9rem;
  font-weight: 300;
`;

const Selection = styled.div`
  grid-column: 2 / 5;
  grid-row: 2 / 3;
  border-top: 1px solid rgba(185, 185, 185, 0.4);
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 1024px) {
    grid-column: 1 / 4;
  }
`;

const ItemWrapper = styled(NavLink)`
  margin-right: 30px;
  margin-top: -1px;
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  color: #737373;
  box-sizing: border-box;
  font-size: 0.9rem;
  &.active {
    border-top: 1px solid rgba(32, 32, 32, 0.6);
    color: #404040;
  }
`;

const SelectionItem = styled.span`
  color: inherit;
`;

const ItemIcon = styled.div`
  margin-right: 3px;
  color: #737373;
  width: 22px;
  height: auto;
`;

const PostsContainer = styled.section`
  grid-column: 2 / 5;
  height: 80%;
  display: flex;

  @media only screen and (max-width: 1024px) {
    grid-column: 2 / 3;
  }
`;

const Post = styled.div`
  margin: 10px;
  position: relative;

  &:hover div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
  }

  @media only screen and (max-width: 716px) {
    margin: 5px;
  }
`;

const PostImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostStats = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  display: none;
`;

const Stats = styled.span`
  margin-right: 3%;
  display: flex;
  align-items: center;
  width: 35px;
  justify-content: space-evenly;
`;

function AuthUserProfile() {
  const { userId, profileImg, username, fullname } =
    useSelector(selectAuthUser);
  const posts = useSelector(selectAuthUserPosts);
  const savedPosts = useSelector(selectSavedPosts);

  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(fetchSavedPosts(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPostsByUserId(userId));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container>
        <ProfileHeader>
          <UserImage>
            <ImageWrapper>
              <ProfileImg src={profileImg} />
            </ImageWrapper>
          </UserImage>
          <UserDetails>
            <Username>{username}</Username>
            <SocialStats>{posts.length} posts</SocialStats>
            <Fullname>{fullname}</Fullname>
          </UserDetails>
        </ProfileHeader>
        <Selection>
          <ItemWrapper exact to={`${url}`}>
            <ItemIcon>
              <Grid size='100%' viewBox='0 0 24 24' />
            </ItemIcon>
            <SelectionItem>Posts</SelectionItem>
          </ItemWrapper>
          <ItemWrapper to={`${url}/saved`}>
            <ItemIcon>
              <Bookmark size='100%' viewBox='0 0 24 24' />
            </ItemIcon>
            <SelectionItem>Saved</SelectionItem>
          </ItemWrapper>
        </Selection>
        <PostsContainer>
          <Route exact path={`${url}`}>
            {posts.map((post) => {
              return (
                <Post key={post.id}>
                  <PostImg src={post.imageUrl} />
                  <PostStats className='after'>
                    <Stats>
                      <Heart size={20} color='#fff' fill='#fff' />
                      <span>{post.like_count}</span>
                    </Stats>
                    <Stats>
                      <MessageCircle size={20} color='#fff' fill='#fff' />
                      <span>{post.comment_count}</span>
                    </Stats>
                  </PostStats>
                </Post>
              );
            })}
          </Route>
          <Route path={`${url}/saved`}>
            {savedPosts.map((savedPost) => {
              return (
                <Post key={savedPost.id}>
                  <PostImg src={savedPost.post.imageUrl} />
                  <PostStats className='after'>
                    <Stats>
                      <Heart size={20} color='#fff' fill='#fff' />
                      <span>{savedPost.post.likes_count}</span>
                    </Stats>
                    <Stats>
                      <MessageCircle size={20} color='#fff' fill='#fff' />
                      <span>{savedPost.post.comments_count}</span>
                    </Stats>
                  </PostStats>
                </Post>
              );
            })}
          </Route>
        </PostsContainer>
      </Container>
    </>
  );
}

export default AuthUserProfile;
