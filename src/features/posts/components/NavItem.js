import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Item = styled.li`
  width: calc(64px * 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Link = styled(NavLink)``;

const Icon = styled.div`
  border-radius: 50%;
  background-color: #fbfbfb;
  color: #404040;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 2px;
  width: calc(64px * 0.5);
  height: calc(64px * 0.5);
  border: 1px solid rgba(204, 204, 204, 0.3);
  transition: filter 300ms;

  &:hover {
    filter: brightness(0.9);
  }
`;

function NavItem(props) {
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Item>
      <Link to={props.to} onClick={handleOnClick}>
        <Icon>{props.icon}</Icon>
      </Link>
      {open ? props.children : null}
    </Item>
  );
}

export default NavItem;
