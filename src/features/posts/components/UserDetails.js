import styled from 'styled-components';

const Container = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  height: 80px;
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 7px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1024px) {
    display: none;
  }
`;

const UserImage = styled.div`
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  overflow: hidden;
  border-radius: 50%;
  background-color: #e7e7e7;
`;

const Img = styled.img`
  width: 100%;
  height: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

const Fullname = styled.span`
  font-size: 0.95rem;
  color: #ccc;
`;

function UserDetails({ username, fullname, profileImg }) {
  return (
    <Container>
      <UserImage>
        <ImageWrapper>
          <Img src={profileImg} />
        </ImageWrapper>
      </UserImage>
      <Wrapper>
        <Username>{username}</Username>
        <Fullname>{fullname}</Fullname>
      </Wrapper>
    </Container>
  );
}

export default UserDetails;
