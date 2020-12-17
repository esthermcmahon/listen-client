//module to handle all musician data
import React, { useState } from "react"
export const MusicianContext = React.createContext();

export const MusicianProvider = (props) => {
    const [musicians, setMusicians] = useState([{user:{}}])
    const [musician, setMusician] = useState({user:{}})
    const [currentUser, setCurrentUser] = useState({user:{}})
   

  const getMusicians = () => {
    return fetch("http://localhost:8000/musicians" , {
        headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then(setMusicians);
  };

    const getMusicianById = (id) => {
        return fetch(`http://localhost:8000/musicians/${id}`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
                "Content-Type": "application/json",
              }
        })
            .then(response => response.json()) 
    }

    const getCurrentUser = () => {
      return fetch(`http://localhost:8000/currentuser`, {
          headers: {
              Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
              "Content-Type": "application/json",
            }
      })
          .then(response => response.json())     
  }


    
    return (
        <MusicianContext.Provider value={{
            musicians, getMusicians, setMusicians, musician, setMusician, 
            getMusicianById, getCurrentUser
        }}>
            {props.children}
        </MusicianContext.Provider>
    )
}
