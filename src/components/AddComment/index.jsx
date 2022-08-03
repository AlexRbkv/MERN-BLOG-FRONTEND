import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { userDataSelector } from "../../redux/slices/authSlice";
import { fetchAddNewComment } from "../../redux/slices/commentsSlice";
import { nanoid } from 'nanoid'

export const Index = ({ postId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const userData = useSelector(userDataSelector);

  const onCommentChange = (e) => {
    setComment(e.target.value);
  }

  const onSendComment = () => {
    dispatch(fetchAddNewComment({
      postId: postId,
      text: comment,
      author: userData,
      commentId: nanoid(),
    })).then(() => setComment(''));
  };
    

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={`${process.env.REACT_APP_API_URL}${userData.avatarUrl}`}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            value={comment}
            onChange={onCommentChange}
            fullWidth
          />
          <Button onClick={onSendComment} variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
