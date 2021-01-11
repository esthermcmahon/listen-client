//Form to let user create a new excerpt
import React, { useEffect, useContext, useState} from "react";
import { ExcerptContext } from "./ExcerptProvider";
import { Button, Box, Text, TextInput, Heading, Layer } from "grommet"


export const ExcerptForm = (props) => {
  const { getExcerpts, createExcerpt, editExcerpt, getExcerptById } = useContext(ExcerptContext)
  
  const editMode = props.match.url.split("/")[1] === "editexcerpt" //checks url to see if editMode

  const [currentExcerpt, setCurrentExcerpt] = useState({})

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  //gets the excerpts from the database
  useEffect(() => {
    getExcerpts()
  }, [])

  useEffect(() => {
    if (editMode) {
      getExcerptById(parseInt(props.match.params.excerptId))
        .then(excerpt => {
          setCurrentExcerpt({
            name: excerpt.name,
            done: excerpt.done,
            musician: excerpt.musician
          })
        })
    }
  }, [props.match.params.excerptId])

  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  const handleChange = (event) => {
    const newExcerptState = Object.assign({}, currentExcerpt)
    newExcerptState[event.target.name] = event.target.value
    setCurrentExcerpt(newExcerptState)
  }

  return (

    <Box align="center" alignContent="center">
      <Box htmlFor="name">
        <Heading level="2" className="name">Name your excerpt:</Heading>
        <Box margin="small">
        <TextInput
          type="text"
          name="name"
          value={currentExcerpt.name}
          onChange={handleChange}
        />
        </Box>
        
      {editMode ? <Button primary margin="small" label="SUBMIT" className="edit_excerpt" onClick={onOpen}/> : ""}
      </Box>

      {open && (

        <Layer onEsc={onClose}
        onClickOutside={onClose}
        responsive={true}
        position="center"
        >
          <Box width="medium" size="small" margin="small">
            <Heading level="3">Confirm</Heading>
            <Text>Are you sure you want to make these changes?</Text>
            <Box size="small" direction="row-responsive">
              <Button primary label="Submit" onClick={() => {
                editExcerpt({
                  id: props.match.params.excerptId,
                  name: currentExcerpt.name,
                  done: currentExcerpt.done
                }).then(() => {
                  props.history.push("/home")
                })
              }}
              margin="small"
              />
           
              <Button margin="small" secondary label="Cancel" onClick={onClose}/>
            </Box>
          </Box>
        </Layer>


      )}
      {editMode ? "" :
        <Button primary label = "Create New Excerpt"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            createExcerpt({
              name: currentExcerpt.name,
              done: false,
            })
              .then(() => props.history.push("/home"))
          }}
         
        />
      }
    </Box>

  );
};
