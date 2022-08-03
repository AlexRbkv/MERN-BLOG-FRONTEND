import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

export const fetchPosts = createAsyncThunk('fetchPosts', async (params) => {
  const { data } = await axios.get('/posts', { params });
  return data;
});

export const fetchPostsFiltered = createAsyncThunk('fetchPostsFiltered', async ({ tag }) => {
  const { data } = await axios.get(`/posts/tags/${tag}`);
  return data;
});

export const fetchTags = createAsyncThunk('fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('fetchRemovePost', async (id) => {
  const { data } = await axios.delete(`/posts/${id}`);
  return data;
});

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение постов
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.status = 'success';
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    });

    // Получение отфильтрованных постов
    builder.addCase(fetchPostsFiltered.pending, (state) => {
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPostsFiltered.fulfilled, (state, action) => {
      state.posts.status = 'success';
      state.posts.items = action.payload;
    });
    builder.addCase(fetchPostsFiltered.rejected, (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    });

    //Получение тегов
    builder.addCase(fetchTags.pending, (state) => {
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.status = 'success';
      state.tags.items = action.payload;
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    });

    //Удаление поста
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const postsSelector = (state) => state.posts;

export const postsReducer = postsSlice.reducer;
