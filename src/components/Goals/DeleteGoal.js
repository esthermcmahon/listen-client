//delete goal component with confirmation modal
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GoalContext } from "./GoalProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"
import { Trash } from "grommet-icons"


export const DeleteGoal = ({ open, onClose, goalId, relatedExcerpt, func }) => {
  const { deleteGoal } = useContext(GoalContext);
  const history = useHistory()

  //function that is called when the delete button is clicked. 
  //This function deletes a goal
  //Lastly the function calls the close function which resets our modal state.
  const deleteThisGoal = () => {
    deleteGoal(goalId)
    .then(onClose)
    .then(() => {
      history.push(`/excerpts/${relatedExcerpt.id}`)
    })
    .then(func)
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
              <Button primary margin="small" label="Delete" onClick={deleteThisGoal} />
              <Button secondary margin="small" label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};