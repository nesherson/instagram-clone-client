import styled from 'styled-components';
import { User, Bookmark, Settings } from 'react-feather';

const Container = styled.div`
  position: absolute;
  z-index: 999;
  top: 62px;
  width: 270px;
  transform: translateX(-45%);
  box-shadow: 0 0.5px 2.2px rgba(0, 0, 0, 0.02),
    0 1.3px 5.3px rgba(0, 0, 0, 0.028), 0 2.4px 10px rgba(0, 0, 0, 0.035),
    0 4.2px 17.9px rgba(0, 0, 0, 0.042), 0 7.9px 33.4px rgba(0, 0, 0, 0.05),
    0 19px 80px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  background-color: #fff;
  overflow: hidden;
`;

const MenuItem = styled.a`
  display: flex;
  align-items: center;
  border-radius: 7px;
  transition: background 500ms;
  padding: 0.5rem;
  margin: 0.6rem;
  color: #404040;
  text-decoration: none;
  height: calc(64px * 0.55);

  &:hover {
    background-color: #cccccc;
  }
`;

const Icon = styled.span`
  border-radius: 50%;
  background-color: #fbfbfb;
  color: #404040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 2px 5px 2px 0;
  width: calc(64px * 0.45);
  height: calc(64px * 0.45);
  border: 1px solid rgba(204, 204, 204, 0.3);
`;

const Divider = styled.span`
  display: block;
  background: rgba(204, 204, 204, 0.3);
  height: 1px;
  margin: 5px 0;
`;

function DropdownMenu() {
  function DropdownItem(props) {
    return (
      <MenuItem href='#'>
        {props.icon ? <Icon>{props.icon}</Icon> : null}
        {props.children}
      </MenuItem>
    );
  }

  return (
    <Container>
      <DropdownItem icon={<User width={20} />}>Profile</DropdownItem>
      <DropdownItem icon={<Bookmark width={20} />}>Saved</DropdownItem>
      <DropdownItem icon={<Settings width={20} />}>Settings</DropdownItem>
      <Divider />
      <DropdownItem>Log out</DropdownItem>
    </Container>
  );
}

export default DropdownMenu;