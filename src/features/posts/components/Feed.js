import styled from 'styled-components';

import Header from './Header';
import Posts from './Posts';
import NewPost from './NewPost';

const Container = styled.div`
  padding-top: 94px;
  height: 100%;
  display: grid;
  grid-template-rows: 130px auto;
  grid-template-columns: 1fr 614px 322px 1fr;
  column-count: 15px;
  background-color: #fbfbfb;
  min-width: 320px;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 614px 1fr;
  }

  @media only screen and (max-width: 632px) {
    grid-template-columns: 1fr auto 1fr;
  }
`;

function Feed() {
  return (
    <Container>
      <Header />
      <NewPost />
      {/* <Posts /> */}
    </Container>
  );
}

export default Feed;
