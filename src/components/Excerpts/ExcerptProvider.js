//module to handle all excerpt data manipulation
import React, { useState } from "react";
export const ExcerptContext = React.createContext();
export const ExcerptProvider = (props) => {
  const [excerpts, setExcerpts] = useState([]);
  const [excerpt, setExcerpt] = useState({});

  const getExcerpts = () => {
    return fetch("http://localhost:8000/excerpts", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setExcerpts);
  };

  const createExcerpt = (excerpt) => {
    return fetch("http://localhost:8000/excerpts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      },
      body: JSON.stringify(excerpt),
    })
      .then((res) => res.json())
      .then(getExcerpts);
  };

  const deleteExcerpt = (excerptId) => {
    return fetch(`http://localhost:8000/excerpts/${excerptId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`,
        },
    })
        .then(getExcerpts)
  }

  const editExcerpt = excerpt => {
    return fetch(`http://localhost:8000/excerpts/${excerpt.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
        },
        body: JSON.stringify(excerpt)
    })
        .then(getExcerpts)
}

const getExcerptById = (id) => {
  return fetch(`http://localhost:8000/excerpts/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const getExcerptByMusician = (musicianId) => {
    return fetch(`http://localhost:8000/excerpts?musician=${musicianId}` , {
        headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json",   
        }   
      })
        .then(res => res.json())
}

const done = excerptId => {
  return fetch(`http://localhost:8000/excerpts/${excerptId}/done`, {
      method: "PUT",
      headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json"
      }
    
  })
      
}
const undone = excerptId => {
  return fetch(`http://localhost:8000/excerpts/${excerptId}/undone`, {
      method: "PUT",
      headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json"
      }
    
  })
      
}


  return (
    <ExcerptContext.Provider
      value={{
        excerpt,
        setExcerpts,
        getExcerpts,
        excerpts,
        setExcerpt,
        createExcerpt,
        deleteExcerpt,
        editExcerpt,
        getExcerptById,
        getExcerptByMusician,
        done,
        undone
      }}
    >
      {props.children}
    </ExcerptContext.Provider>
  );
};
