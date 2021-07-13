import styled from 'styled-components';

import Post from './Post';

const Container = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

function Posts({ postList }) {
  return (
    <Container>
      <PostList>
        {postList.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              username={post.user.username}
              profileImg={post.user.profileImg}
              postImg={post.imageUrl}
              likes={post.likes}
              caption={post.caption}
            />
          );
        })}
      </PostList>
    </Container>
  );
}

export default Posts;
