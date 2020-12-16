/* displays details of an excerpt, lets user add reactions (maximum one of each) to post, 
lets user edit excerpt if they are the creator */

import React, { useContext, useEffect, useState, useRef } from "react";
import { ExcerptContext } from "./ExcerptProvider";
// import { DeleteItemContext } from "../utils/DeleteItem";
// import { Link } from "react-router-dom";
import { Heading } from "grommet";
import { RecordingList } from "../Recordings/RecordingList"
// import { Button, Box, Heading, Image, Text, Menu, Anchor } from "grommet";
// import { Edit, More, Trash } from "grommet-icons";
// import { DeleteItem } from "../utils/DeleteItem";

export const ExcerptDetails = (props) => {
  const { getExcerptById, excerpt, setExcerpt} = useContext(ExcerptContext)

    //state variable and functions that change state of the state variable
    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);
 
  const excerptId = parseInt(props.match.params.excerptId);

  //gets an excerpt by the excerptId
  useEffect(() => {
    getExcerptById(excerptId).then(setExcerpt)
   
  }, []);

//to do: get comments by excerpt

  return (
    <>
  
            <Heading level="2" className="post__title">
              {excerpt.name}
            </Heading>
            <RecordingList excerpt={excerpt} {...props} />
         
    </>

  );
};