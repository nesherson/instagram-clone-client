import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectNewPost } from '../postsSlice/newPostSlice';
import { selectPosts, fetchPosts, } from '../postsSlice/postListSlice';

import Post from './Post/Post';

const Container = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  @media only screen and (max-width: 664px) {
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;

const PostList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

function Posts() {

  const dispatch = useDispatch();

  const { newPostSubmitSuccess } = useSelector(selectNewPost);
  const postList = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, newPostSubmitSuccess]);

  return (
    <Container>
      <PostList>
      {postList.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              caption={post.caption}
              postImg={post.imageUrl}
              username={post.user.username}
              profileImg={post.user.profileImg}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
      </PostList>
    </Container>
  );
}



export default Posts;
