import styled from 'styled-components';
import { Home, Compass, User } from 'react-feather';

import NavItem from './NavItem';
import DropdownMenu from './DropdownMenu';

const MainContainer = styled.section`
  background-color: #fff;
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
  @media only screen and (max-width: 664px) {
    margin: 0 2%;
  }
`;

const Headline = styled.h1`
  margin: 0;
  padding: 0;
`;

const LogoWrapper = styled.div``;

const Nav = styled.ul`
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

function Header() {
  return (
    <MainContainer>
      <Container>
        <LogoWrapper>
          <Headline>Instaclone</Headline>
        </LogoWrapper>
        <Nav>
          <NavItem icon={<Home width={22} />} to='/' />
          <NavItem icon={<Compass width={22} />} to='/explore' />
          <NavItem icon={<User width={22} />} to='#'>
            <DropdownMenu />
          </NavItem>
        </Nav>
      </Container>
    </MainContainer>
  );
}

export default Header;
