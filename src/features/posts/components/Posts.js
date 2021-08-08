import styled from 'styled-components';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchPosts } from '../api/postsAPI';
import {
  selectNewPostSubmitStatus,
  selectPosts,
} from '../postsSlice/postsSlice';

import { fetchComments } from '../api/commentsAPI';
import { selectNewCommentSubmitStatus, selectComments } from '../postsSlice/commentsSlice';

import { fetchLikes } from '../api/likesAPI';
import { selectLikePostStatus, selectLikes } from '../postsSlice/likesSlice';

import { selectAuthUser } from '../../user/userSlice/authUserSlice/authUserSlice';

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

  const { userId } = useSelector(selectAuthUser);
  const postList = useSelector(selectPosts);
  const likes = useSelector(selectLikes);
  const comments = useSelector(selectComments);
  const newPostSubmitStatus = useSelector(selectNewPostSubmitStatus);
  const newCommentSubmitStatus = useSelector(selectNewCommentSubmitStatus);
  const likePostStatus = useSelector(selectLikePostStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, newPostSubmitStatus.isSuccess]);

  useEffect(() => {
    dispatch(fetchComments());
    dispatch(fetchLikes());
  }, [dispatch]);

  useEffect(() => {
    if (newCommentSubmitStatus.isSuccess) {
      dispatch(fetchComments());
    }
  }, [dispatch, newCommentSubmitStatus.isSuccess]);

  useEffect(() => {
    if (likePostStatus.isSuccess) {
      dispatch(fetchLikes());
    }
  }, [dispatch, likePostStatus.isSuccess]);

  return (
    <Container>
      <PostList>
        {postList.map((post) => {
          const postLikes = likes.filter((like) => like.postId === post.id);
          const isLiked = postLikes.some((like) => like.userId === userId);
          const postComments = comments.filter((comment) => comment.postId === post.id);
          return (
            <Post
              key={post.id}
              id={post.id}
              caption={post.caption}
              postImg={post.imageUrl}
              username={post.user.username}
              profileImg={post.user.profileImg}
              comments={postComments}
              likes={postLikes}
              isLiked={isLiked}
            />
          );
        })}
      </PostList>
    </Container>
  );
}

export default Posts;
