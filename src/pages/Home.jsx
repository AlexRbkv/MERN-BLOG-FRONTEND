import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import {
  fetchPosts,
  fetchTags,
  postsSelector,
} from '../redux/slices/postsSlice';
import { userDataSelector } from '../redux/slices/authSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(0);
  const { posts, tags } = useSelector(postsSelector);
  const userData = useSelector(userDataSelector);
  const isPostsLoading = posts.status === 'success';
  const isTagsLoading = !(tags.status === 'success');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts({ sort: false })).then((res) => setComments(res.payload.map((item) => item.comments)));
    dispatch(fetchTags());
  }, [dispatch]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
    if (newValue === 0) {
      dispatch(fetchPosts({ sort: false }));
    } else {
      dispatch(fetchPosts({ sort: true }));
    }
  }

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={currentTab}
        aria-label="basic tabs example"
        onChange={handleTabChange}
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? posts.items : [...Array(5)]).map((item, index) => 
            isPostsLoading ? (
              <Post
                key={item._id}
                id={item._id}
                title={item.title}
                imageUrl={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''}
                user={item.user}
                createdAt={item.createdAt}
                viewsCount={item.viewsCount}
                commentsCount={item.comments.length}
                tags={item.tags}
                isEditable={userData?._id === item.user._id}
              />
            )
            : (
              <Post key={index} isLoading={true} />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.flat().slice(0,5)}
            isLoading={!isPostsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
