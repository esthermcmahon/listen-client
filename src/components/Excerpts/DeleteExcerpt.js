//delete goal component with confirmation modal
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ExcerptContext } from "./ExcerptProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"



export const DeleteExcerpt = ({ open, onClose, excerptId, func }) => {
  const { deleteExcerpt } = useContext(ExcerptContext);
  const history = useHistory()

  //function that is called when the delete button is clicked. 
  //This function deletes an excerpt
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisExcerpt = () => {
    deleteExcerpt(excerptId)
    .then(func)
    .then(onClose)
    .then(() => {
      history.push(`/home`)
    })
    
  };

  return (
    <>
     
      {open && (
        <Layer onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
          <Box  margin="xsmall">
            <Heading margin="xsmall" level="3">
              Confirm
            </Heading>
            <Text margin="xsmall">Are you sure you want to delete?</Text>
            <Box direction="row-responsive">
              <Button primary margin="small" label="Delete" onClick={deleteThisExcerpt} />
              <Button secondary margin="small" label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};