import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Home, Compass, User } from 'react-feather';

const MainContainer = styled.section`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  min-width: 340px;
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 15%;
`;

const Headline = styled.h1`
  margin: 0;
  padding: 0;
`;

const LogoWrapper = styled.div``;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
`;

const NavItem = styled(NavLink)`
  cursor: pointer;
  fill: red;
`;

function Header() {
  return (
    <MainContainer>
      <Container>
        <LogoWrapper>
          <Headline>Instaclone</Headline>
        </LogoWrapper>
        <IconsWrapper>
          <NavItem to='/'>
            <Home color='#000' size={24} />
          </NavItem>
          <NavItem to='/explore'>
            <Compass color='#000' size={24} />
          </NavItem>
          <User color='#000' size={24} />
        </IconsWrapper>
      </Container>
    </MainContainer>
  );
}

export default Header;
