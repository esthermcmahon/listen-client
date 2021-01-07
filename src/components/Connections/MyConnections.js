import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MusicianContext } from "../Musicians/MusicianProvider";
import { ConnectionContext } from "./ConnectionProvider"
import { Anchor, Box, Heading, Text, Button, Card } from "grommet";
import "../Excerpts/extra.css"


export const MyConnections = () => {
  const { musicians, getMusicians, getCurrentUser } = useContext(MusicianContext);

  const { connections, getConnections, createConnection, unFollow } = useContext(ConnectionContext)

  const [currentUser, setCurrentUser] = useState([])

  const [filteredMusicians, setFilteredMusicians] = useState([])

  const [searchTerms, setSearchTerms] = useState("")



  useEffect(() => {
    getMusicians()
    getConnections()
    getCurrentUser().then(setCurrentUser);
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      const results = musicians.filter(musician =>
        musician.user.username.toLowerCase().includes(searchTerms) || musician.user.first_name.toLowerCase().includes(searchTerms) || musician.user.last_name.toLowerCase().includes(searchTerms)
      )
      setFilteredMusicians(results);
    }
  }, [searchTerms])

  const handleChange = event => {
    const userInput = event.target.value.toLowerCase()
    setSearchTerms(userInput);
  }

  return (

    <>

      <Heading level="1">My Connections</Heading>

      <Box background="background-contrast" elevation="large">
        {connections.map(connection =>
          connection.practicer.user.id !== currentUser.id && connection.follower.user.id === currentUser.id && connection.ended_on == null ?
            (
              <Card margin="small" direction="row-responsive" >
                <Anchor
                  margin="small"
                  color="text"
                  as={Link}
                  to={{ pathname: `/profiles/${connection.practicer.user.id}` }}
                >
                  {connection.practicer.user.first_name} {connection.practicer.user.last_name}
                </Anchor>

                <Button primary size="small" label="Unfollow" alignSelf="center" className="unfollowButton" onClick={() => unFollow(connection.practicer.id).then(getConnections)}></Button>
              </Card>
            )
            : "")}


      </Box>

      <Heading level="2">Find a Musician</Heading>
      <Box>
        <input type="text" className="musicians__search" style={{ borderRadius: "8px", width: "400px", height: "20px" }}
          onChange={handleChange}
          placeholder="Enter username, first name, or last name" />

      </Box>
      {filteredMusicians.map(musician => {
        console.log(musician)
        return (
          <Box direction="row" padding="medium" margin="medium">
            <Text margin="medium">{musician.user.username}</Text>
            <Button primary label="Follow" className="unfollowButton" alignSelf="center" onClick={() => {
              createConnection({
                practicer: parseInt(musician.id)

              })
                .then(() => {
                  window.alert(`You are now following ${musician.user.username}`)
                })
                .then(() => {
                  setSearchTerms("")
                })
            }} />
          </Box>

        )

      })}
    </>
  );
};