import styled from 'styled-components';

import Header from './Header';
import Posts from './Posts';
import NewPost from './NewPost';

const Container = styled.div`
  padding-top: 94px;
  height: 100%;
  display: grid;
  grid-template-rows: 120px auto;
  grid-template-columns: 1fr 614px 322px 1fr;
  column-count: 15px;
  background-color: #fbfbfb;
`;

function Feed() {
  return (
    <Container>
      <Header />
      <NewPost />
      <Posts />
    </Container>
  );
}

export default Feed;
