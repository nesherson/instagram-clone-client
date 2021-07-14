import styled from 'styled-components';

import { useSelector } from 'react-redux';

import { selectUser } from '../userSlice/userSlice';

import Header from '../../posts/components/Header';

const Container = styled.section`
  padding-top: 94px;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 294px 294px 294px 1fr;
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

const UserDetails = styled.div`
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

function UserProfile() {
  const { profileImg, username, fullname } = useSelector(selectUser);

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
          <SocialStats>35 posts</SocialStats>
          <Fullname>{fullname}</Fullname>
        </UserDetails>
      </ProfileHeader>
    </Container>
  );
}

export default UserProfile;
