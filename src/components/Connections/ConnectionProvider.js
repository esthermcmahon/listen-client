//module to handle all connection data manipulation- getting categories, and creating categories
import React, { useState } from "react";
export const ConnectionContext = React.createContext();
export const ConnectionProvider = (props) => {
  const [connections, setConnections] = useState([]);
  const [connection, setConnection] = useState({});

  const getConnections = () => {
    return fetch("http://localhost:8000/connections", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      }
    })
      .then((res) => res.json())
      .then(setConnections);
  };

  const createConnection = (connection) => {
    return fetch("http://localhost:8000/connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
      },
      body: JSON.stringify(connection),
    })
      .then((res) => res.json())
      .then(getConnections);
  };

  const deleteConnection= (connectionId) => {
    return fetch(`http://localhost:8000/connections/${connectionId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`,
        },
    })
        .then(getConnections)
  }

  const editConnection = connection => {
    return fetch(`http://localhost:8000/connections/${connection.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("listen_user_id")}`
        },
        body: JSON.stringify(connection)
    })
        .then(getConnections)
}

const getConnectionById = (id) => {
  return fetch(`http://localhost:8000/connections/${id}` , {
      headers: {
        Authorization: `Token ${localStorage.getItem("listen_user_id")}`,
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
}

  return (
    <ConnectionContext.Provider
      value={{
        connection,
        setConnection,
        connections,
        setConnection,
        createConnection,
        deleteConnection,
        editConnection,
        getConnectionById
      }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};
