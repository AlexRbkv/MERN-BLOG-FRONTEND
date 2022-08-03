import React from "react";
import { useParams } from 'react-router-dom'
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch , useSelector } from "react-redux";
import { userDataSelector } from "../redux/slices/authSlice";
import { fetchRemoveComment } from "../redux/slices/commentsSlice";

export const CommentsBlock = ({ items, children, isLoading }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = useSelector(userDataSelector);

  const onDeleteComment = (commentId) => {
    dispatch(fetchRemoveComment({ commentId, id }));
  }

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.author.fullName} src={`${process.env.REACT_APP_API_URL}${obj.author.avatarUrl}`} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.author.fullName}
                  secondary={obj.text}
                />
              )}
              {
                (obj?.author?._id === userData?._id && id) && 
                  <Button onClick={() => onDeleteComment(obj.commentId)} variant="contained" color="error">
                    Удалить
                  </Button>
              }
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
