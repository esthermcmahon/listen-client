//module to handle all recording data manipulation
import React, { useState } from "react";
export const RecordingContext = React.createContext();
export const RecordingProvider = (props) => {
  const [recordings, setRecordings] = useState([]);
  const [recording, setRecording] = useState({});

  const getRecordings = () => {
    return fetch("http://localhost:8000/recordings", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setRecordings);
  };

  const createRecording = (recording) => {
    return fetch("http://localhost:8000/recordings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      },
      body: JSON.stringify(recording),
    })
      .then((res) => res.json())
      .then(getRecordings);
  };

  const deleteRecording= (recordingId) => {
    return fetch(`http://localhost:8000/recordings/${recordingId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`,
        },
    })
        .then(getRecordings)
  }

  const editRecording = recording => {
    return fetch(`http://localhost:8000/recordings/${recording.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
        },
        body: JSON.stringify(recording)
    })
        .then(getRecordings)
}

const getRecordingById = (id) => {
  return fetch(`http://localhost:8000/recordings/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const getRecordingByExcerpt = (excerptId) => {
    return fetch(`http://localhost:8000/recordings?excerpt=${excerptId}` , {
        headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json",   
        }   
      })
        .then(res => res.json())
}

const getRecordingByMusician = (musicianId) => {
    return fetch(`http://localhost:8000/recordings?musician=${musicianId}` , {
        headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json",   
        }   
      })
        .then(res => res.json())
}

  return (
    <RecordingContext.Provider
      value={{
        recording,
        setRecording,
        recordings,
        setRecording,
        createRecording,
        deleteRecording,
        editRecording,
        getRecordings,
        getRecordingById,
        getRecordingByExcerpt,
        getRecordingByMusician
      }}
    >
      {props.children}
    </RecordingContext.Provider>
  );
};