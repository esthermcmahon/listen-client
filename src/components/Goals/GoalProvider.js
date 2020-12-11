//module to handle all goal data manipulation
import React, { useState } from "react";
export const GoalContext = React.createContext();
export const GoalProvider = (props) => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({});

  const getGoals = () => {
    return fetch("http://localhost:8000/goals", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setGoals);
  };

  const createGoal = (goal) => {
    return fetch("http://localhost:8000/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      },
      body: JSON.stringify(goal),
    })
      .then((res) => res.json())
      .then(getGoals);
  };

  const deleteGoal= (goalId) => {
    return fetch(`http://localhost:8000/goals/${goalId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`,
        },
    })
        .then(getGoals)
  }

  const editGoal = goal => {
    return fetch(`http://localhost:8000/goals/${goal.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
        },
        body: JSON.stringify(goal)
    })
        .then(getGoals)
}

const getGoalById = (id) => {
  return fetch(`http://localhost:8000/goals/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

const getGoalByRecording = (recordingId) => {
    return fetch(`http://localhost:8000/goals?recording=${recordingId}` , {
        headers: {
          Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
          "Content-Type": "application/json",   
        }   
      })
        .then(res => res.json())
}

  return (
    <GoalContext.Provider
      value={{
        goal,
        setGoal,
        goals,
        setGoal,
        createGoal,
        deleteGoal,
        editGoal,
        getGoalById,
        getGoalByRecording
      }}
    >
      {props.children}
    </GoalContext.Provider>
  );
};
