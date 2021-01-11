//Form to let user create a comment
import React, { useEffect, useContext, useState } from "react";
import { CommentContext } from "../Comments/CommentProvider"
import { Button, Box, Text, TextInput, Heading, Layer, Select, FormField, Form } from "grommet"
import { RecordingContext } from "../Recordings/RecordingProvider"


export const CommentForm = (props) => {
    const { createComment, editComment, getCommentById } = useContext(CommentContext)

    const { getRecordingById } = useContext(RecordingContext)

    const editMode = props.match.url.split("/")[1] === "editcomment" //checks url to see if editMode

    const [currentComment, setCurrentComment] = useState({})

    const [recording, setRecording] = useState({excerpt:{musician:{}}})

    //state variable and functions that change state of the state variable
    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);

    const showHideClassName = open ? "modal display-block" : "modal display-none";

    const recordingId = props.match.params.recordingId

    


    useEffect(() => {
        
        getRecordingById(parseInt(props.match.params.recordingId))
            .then(setRecording)
            .then(() => {
                if (editMode) {
                    getCommentById(parseInt(props.match.params.commentId))
                        .then(comment => {
                            setCurrentComment({
                                recording: comment.recording,
                                content: comment.content,
                                author: comment.author,
                                date: comment.date
                            })
                        })
                        
                }
            })
    

    }, [])

    //function that is called when a change happens in the form. It sets the state variable that is imported via context.
    //whatever the value that goes in the input (the evt) is being written as single property object with a key of 'type'
    //and the value of the form input
    const handleChange = (event) => {
        const newCommentState = Object.assign({}, currentComment)
        newCommentState[event.target.name] = event.target.value
        setCurrentComment(newCommentState)

    }

    return (

        <Box align="center" alignContent="center">
            <Box htmlFor="comment">
                <Heading level="2" className="comment">Enter comment:</Heading>
                <Box margin="small">
                    <TextInput
                        type="text"
                        name="content"
                        value={currentComment.content}
                        onChange={handleChange}
                    />
                </Box>
                {editMode ? <Button primary margin="small" label="SUBMIT" className="edit_goal" onClick={onOpen} /> : ""}
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

                                editComment({
                                    id: parseInt(props.match.params.commentId),
                                    content: currentComment.content,
                                    recording: parseInt(recordingId)

                                }).then(() => {
                                    props.history.push(`/excerpts/${recording.excerpt.id}`)
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
                <Button primary label="Create New Comment"
                    type="submit"
                    onClick={(evt) => {
                        console.log(recording)
                        evt.preventDefault()
                        createComment({
                            content: currentComment.content,
                            recording: parseInt(recordingId)
                        })
                            .then(() => props.history.push(`/excerpts/${recording.excerpt.id}`))
                    }}

                />
            }
        </Box>



    )
};