import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const initialState = {
  comments: [],
  status: 'loading',
};

export const fetchAddNewComment = createAsyncThunk('fetchAddNewComment', async (params) => {
  const { postId, text, author, commentId } = params;
  const { data } = await axios.post(`/posts/${postId}/comments`, {
    comment: { text, author, commentId },
  });
  return data;
});

export const fetchRemoveComment = createAsyncThunk('fetchRemoveComment', async (params) => {
  const { commentId, id } = params;
  const { data } = await axios.delete(`/comments/${id}/${commentId}`);
  return data;
});

const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Получение комментариев
    builder.addCase(fetchAddNewComment.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAddNewComment.fulfilled, (state, action) => {
      state.status = 'success';
      state.comments = [action, ...state.comments];
    });
    builder.addCase(fetchAddNewComment.rejected, (state) => {
      state.status = 'error';
    });

    // Удаление коментария
    builder.addCase(fetchRemoveComment.fulfilled, (state, action) => {
      state.comments = state.comments.filter((obj) => obj._id !== action.meta.arg.commentId);
    });
  },
});

export const commentsSelector = (state) => state.comments.comments;
export const commentsLoadingSelector = (state) => state.comments.status;

export const commentsReducer = commentsSlice.reducer;
