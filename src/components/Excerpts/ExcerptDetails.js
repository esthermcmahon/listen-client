/* displays details of an excerpt, lets user add reactions (maximum one of each) to post, 
lets user edit excerpt if they are the creator */

import React, { useContext, useEffect, useState, useRef } from "react";
import { ExcerptContext } from "./ExcerptProvider";
import { Link } from "react-router-dom";
import { Heading, Button, Box, Menu } from "grommet";
import { RecordingList } from "../Recordings/RecordingList"
import { Add } from "grommet-icons"
import { Edit, More, Trash } from "grommet-icons";
import { DeleteExcerpt } from "./DeleteExcerpt"


export const ExcerptDetails = (props) => {
  const { getExcerptById, excerpt, setExcerpt } = useContext(ExcerptContext)

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const excerptId = parseInt(props.match.params.excerptId);

  const [change, setChange] = useState(false)

  const func = () => {
        change ? setChange(false) : setChange(true)

    }

  //gets an excerpt by the excerptId
  useEffect(() => {
    getExcerptById(excerptId).then(setExcerpt)

  }, []);


  return (
    <>
      
      <Heading level="1" className="post__title" margin={{bottom: "none"}}>
        {excerpt.name}
      </Heading>
      {excerpt.created_by_current_user
        ? 
        <>
        <DeleteExcerpt open={open} onClose={onClose} excerptId={excerpt.id} func={func} />
        <Box width="xsmall" margin={{left: "none", bottom: "medium"}}>
            <Menu
                icon={<More />}
                hoverIndicator
                alignSelf="start"
                size="small"
                items={[
                    {
                        icon: (
                            <Box>
                                <Edit />
                            </Box>
                        ),
                        onClick: () =>
                            props.history.push(`/editexcerpt/${excerpt.id}`),
                    },
                    {
                        icon: (
                            <Box>
                                <Trash />
                            </Box>
                        ),
                        onClick: () => onOpen(),
                       
                    },
                ]}
            />
          </Box>
          

        <Button
          primary
          as={Link}
          to={{ pathname: `/excerpts/${excerpt.id}/newrecording` }}
          icon={<Add />}
          label="Add new recording"
          margin={{top: "none", bottom: "small"}}

        />
       </> : ""

      }


      <RecordingList excerpt={excerpt} {...props} />

    </>

  );
};