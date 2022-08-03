import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useSelector } from "react-redux";
import { commentsSelector } from "../redux/slices/commentsSlice";
import { isAuthSelector } from "../redux/slices/authSlice";

export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const comments = useSelector(commentsSelector);
  const isAuth = useSelector(isAuthSelector);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/posts/${id}`)
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи');
    });
  }, [id, comments]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        items={data.comments}
        isLoading={isLoading}
      >
        {isAuth && <Index postId={data._id} />}
      </CommentsBlock>
    </>
  );
};
