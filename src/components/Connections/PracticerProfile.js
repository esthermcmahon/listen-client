//component to render another practicer's profile
import React, { useContext, useEffect, useState } from "react"
import { PracticerExcerptList } from "../Excerpts/PracticerExcerptList"
import { MusicianContext } from "../Musicians/MusicianProvider"
import { Heading } from "grommet";

export const PracticerProfile = (props) => {
  const { getMusicianById, getCurrentUser } = useContext(MusicianContext)

  const [practicer, setPracticer] = useState({user:{}})

  const practicerId = parseInt(props.match.params.practicerId)

  useEffect(() => {
    
    getMusicianById(practicerId)
        .then(setPracticer);
  }, []);


  return (
      <>
      <Heading>{practicer.user.username}'s profile</Heading>
      <PracticerExcerptList practicerId={practicerId}/>
      </>
  )
}
