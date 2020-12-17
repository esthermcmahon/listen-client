//module to handle all comment data manipulation
import React, { useState } from "react";
export const CommentContext = React.createContext();
export const CommentProvider = (props) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({});

  const getComments = () => {
    return fetch("http://localhost:8000/comments", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setComments);
  };

  const createComment = (comment) => {
    return fetch("http://localhost:8000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then(getComments);
  };

  const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`,
        },
    })
        .then(getComments)
  }

  const editComment = comment => {
    return fetch(`http://localhost:8000/comments/${comment.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
        },
        body: JSON.stringify(comment)
    })
        .then(getComments)
}

const getCommentById = (id) => {
  return fetch(`http://localhost:8000/comments/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const getCommentByRecording = (recordingId) => {
  return fetch(`http://localhost:8000/comments?recording=${recordingId}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",   
      }   
    })
      .then(res => res.json())
}

  return (
    <CommentContext.Provider
      value={{
        comment,
        setComment,
        comments,
        getComments,
        setComments,
        createComment,
        deleteComment,
        editComment,
        getCommentById,
        getCommentByRecording
      }}
    >
      {props.children}
    </CommentContext.Provider>
  );
};
