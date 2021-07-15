import { useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Bookmark, Grid, Heart, MessageCircle } from 'react-feather';

import { selectUser } from '../userSlice/userSlice';
import { fetchUser } from '../userSlice/userSlice';

import { fetchCommentsByPostId } from '../../posts/postsSlice/commentListSlice';

import { selectPosts } from '../../posts/postsSlice/postListSlice';

import Header from '../../posts/components/Header';

const Container = styled.section`
  padding-top: 94px;
  height: calc(100vh - 94px );
  display: grid;
  grid-template-columns: 1fr 324px 324px 324px 1fr;
  grid-template-rows: 200px 53px 294px auto;
  background-color: #fbfbfb;
`;

const ProfileHeader = styled.header`
  grid-column: 2 / 5;
  grid-row: 1 / 2;
  display: flex;
`;

const UserImage = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 2;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 136px;
  height: 136px;
  overflow: hidden;
  border-radius: 50%;
  border: 2px solid rgba(204, 204, 204, 0.3);
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
`;

const Fullname = styled.h2`
  font-weight: 500;
  font-size: 1.2rem;
`;

const SocialStats = styled.div``;

const Selection = styled.div`
  grid-column: 2 / 5;
  grid-row: 2 / 3;
  border-top: 1px solid rgba(185, 185, 185, 0.4);
  display: flex;
  justify-content: center;
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
  &.active {
    border-top: 1px solid rgba(32, 32, 32, 0.6);
    color: #404040;
  }
`;

const SelectionItem = styled.span`
  color: inherit;
  box-sizing: border-box;
`;

const Icon = styled.div`
  margin-right: 3px;
  background-color: transparent;
`;

const PostsContainer = styled.section`
  grid-column: 2 / 5;
  grid-row: 3 / 4;
  display: flex;
  justify-content: space-evenly;
`;

const Post = styled.div`
  width: 294px;
  height: 294px;
  position: relative;

  &:hover div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .3);
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
  margin-right: 20px;
  display: flex;
  align-items: center;
  width: 35px;
  justify-content: space-evenly;
`;

function UserProfile() {
  const { id, profileImg, username, fullname, posts } = useSelector(selectUser);

  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  

  return (
    <Container>
      <Header />
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
          <Icon>
            <Grid size={18} color='#737373' />
          </Icon>
          <SelectionItem>Posts</SelectionItem>
        </ItemWrapper>
        <ItemWrapper to={`${url}/saved`}>
          <Icon>
            <Bookmark size={18} color='#737373' />
          </Icon>
          <SelectionItem>Saved</SelectionItem>
        </ItemWrapper>
      </Selection>
      <PostsContainer>
        {posts.map((post) => {
          return (
            <Post key={post.id}>
              <PostImg src={post.imageUrl} />
              <PostStats className='after'>
                <Stats>
                   <Heart size={20} color='#fff' fill='#fff'/>
                   <span>{post.likes}</span>
                </Stats>
                <Stats>
                  <MessageCircle size={20} color='#fff' fill='#fff'/>
                  <span>{post.comments.length}</span>
                </Stats>
              </PostStats>
            </Post>
          );
        })}
      </PostsContainer>
    </Container>
  );
}

export default UserProfile;
