import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { userDataSelector } from '../../redux/slices/authSlice';
import { useParams } from 'react-router-dom'
import {
  fetchPostsFiltered,
  fetchTags,
  postsSelector,
} from '../../redux/slices/postsSlice';

const FilterByTag = () => {
	const dispatch = useDispatch();
  const { posts, tags } = useSelector(postsSelector);
  const userData = useSelector(userDataSelector);
  const isPostsLoading = posts.status === 'success';
  const isTagsLoading = !(tags.status === 'success');
  const [comments, setComments] = useState([]);
	const { tag } = useParams();

  useEffect(() => {
    dispatch(fetchPostsFiltered({ tag })).then((res) => setComments(res.payload.map((item) => item.comments)));
    dispatch(fetchTags());
  }, [dispatch, tag]);

	return (
		<>
			<h1>Статьи по тегу {tag}</h1>
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

export default FilterByTag;