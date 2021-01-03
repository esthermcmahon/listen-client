//Form to let user create a new goal
import React, { useEffect, useContext, useState } from "react";
import { GoalContext } from "./GoalProvider";
import { CategoryContext } from "../Categories/CategoryProvider"
import { Button, Box, Text, TextInput, Heading, Layer, Select, FormField, Form } from "grommet"


export const GoalForm = (props) => {
  const { getGoals, createGoal, editGoal, getGoalById, getGoalByRecording } = useContext(GoalContext)
  const { categories, getCategories } = useContext(CategoryContext)

  const editMode = props.match.url.split("/")[1] === "editgoal" //checks url to see if editMode

  const [currentGoal, setCurrentGoal] = useState({})

  const [category, setCategory] = useState("")

  //state variable and functions that change state of the state variable
  const [open, setOpen] = useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  const showHideClassName = open ? "modal display-block" : "modal display-none";

  const recordingId = props.match.params.recordingId


  useEffect(() => {
    getCategories()
      .then(() => {
        if (editMode) {
          getGoalById(parseInt(props.match.params.goalId))
            .then(goal => {
              setCurrentGoal({
                recording: goal.recording,
                category_id: goal.category.id,
                goal: goal.goal,
                action: goal.action
              })
            })
        }
      })

    
  }, [])

  console.log(category)
  //function that is called when a change happens in the form. It sets the state variable that is imported via context.
  //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
  //and the value of the form input
  const handleChange = (event) => {
    const newGoalState = Object.assign({}, currentGoal)
    newGoalState[event.target.name] = event.target.value
    setCurrentGoal(newGoalState)

  }

  //separate state for category, instead of handleChange

  return (

    <Box align="start" alignContent="center">
     
      < Heading align="start" margin="none" level="2" className="goal">Category: </Heading>
      
        <Box>
          <div className="form-group">
            <select style={{marginTop: "10px", marginLeft:"5px", height: "50px", backgroundColor: "#DADED4", fontFamily: "serif", font: "inherit", borderRadius: "8px", width: "200px", color: "#3C403D"}} name="category_id" className="form-control"
              value={currentGoal.category_id}
              onChange={handleChange}>

              <option value="0">Choose a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id} name={currentGoal.category}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
       

      </Box>
      <Box htmlFor="goal">
        <Heading level="2" className="goal">Enter goal:</Heading>
        <Box margin="small">
          <TextInput
            type="text"
            name="goal"
            value={currentGoal.goal}
            onChange={handleChange}
          />
        </Box>

        <Heading level="2" className="goal">Enter action:</Heading>
        <Box margin="small">
          <TextInput
            type="text"
            name="action"
            value={currentGoal.action}
            onChange={handleChange}
          />
        </Box>





        {editMode ? <Button primary margin="small" label="EDIT" className="edit_goal" onClick={onOpen} /> : ""}
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
              <Button primary label="Edit" onClick={() => {

                editGoal({
                  id: parseInt(props.match.params.goalId),
                  goal: currentGoal.goal,
                  action: currentGoal.action,
                  category: parseInt(currentGoal.category_id),
                  recording: parseInt(recordingId)

                }).then(() => {
                  props.history.goBack()
                })
              }}
                margin="small"
              />

              <Button margin="small" secondary label="Cancel" onClick={onClose} />
            </Box>
          </Box>
        </Layer>


      )}
      {editMode ? "" :
        <Button primary label="Create New Goal"
          type="submit"
          onClick={(evt) => {
            evt.preventDefault()
            createGoal({
              goal: currentGoal.goal,
              action: currentGoal.action,
              category: parseInt(currentGoal.category_id),
              recording: parseInt(recordingId)
            })
              .then(() => props.history.goBack())
          }}

        />
      }
    </Box>



  )
};

