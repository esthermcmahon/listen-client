/* displays details of an excerpt, lets user add reactions (maximum one of each) to post, 
lets user edit excerpt if they are the creator */

import React, { useContext, useEffect, useState, useRef } from "react";
import { ExcerptContext } from "./ExcerptProvider";
import { Link } from "react-router-dom";
import { Heading, Button, Box } from "grommet";
import { RecordingList } from "../Recordings/RecordingList"


export const ExcerptDetails = (props) => {
  const { getExcerptById, excerpt, setExcerpt } = useContext(ExcerptContext)

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const excerptId = parseInt(props.match.params.excerptId);

  //gets an excerpt by the excerptId
  useEffect(() => {
    getExcerptById(excerptId).then(setExcerpt)

  }, []);


  return (
    <>

      <Heading level="2" className="post__title">
        {excerpt.name}
      </Heading>
      {excerpt.created_by_current_user
        ? <Button
          primary
          as={Link}
          to={{ pathname: `/excerpts/${excerpt.id}/newrecording` }}
          label="Add New Recording"
          margin="small"

        />
        : ""

      }


      <RecordingList excerpt={excerpt} {...props} />

    </>

  );
};