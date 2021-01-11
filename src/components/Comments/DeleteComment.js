//delete comment component with confirmation modal
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CommentContext } from "./CommentProvider";
import { Box, Button, Heading, Layer, Text } from "grommet"



export const DeleteComment = ({ open, onClose, commentId, func }) => {
    const { deleteComment, getCommentById } = useContext(CommentContext)

    const history = useHistory()

    const [comment, setComment] = useState({recording:{excerpt:{}}})

    useEffect(() => {
        getCommentById(commentId)
            .then(setComment)
        
    }, [])

    const excerptId = parseInt(comment.recording.excerpt.id)

    //function that is called when the delete button is clicked. 
    //This function deletes a comment
    //Lastly the function calls the close function which resets our modal state.
    const deleteThisComment = () => {
        deleteComment(commentId)
            .then(func)
            .then(onClose)
            .then(() => {
                // history.push(`/home`)
                history.push(`/excerpts/${excerptId}`)
            })

    };

    return (
        <>

            {open && (
                <Layer onEsc={onClose} onClickOutside={onClose} responsive={true} position="center">
                    <Box margin="xsmall">
                        <Heading margin="xsmall" level="3">
                            Confirm
            </Heading>
                        <Text margin="xsmall">Are you sure you want to delete?</Text>
                        <Box direction="row-responsive">
                            <Button primary margin="small" label="Delete" onClick={deleteThisComment} />
                            <Button secondary margin="small" label="Cancel" onClick={onClose} />
                        </Box>
                    </Box>
                </Layer>
            )}
        </>
    );
};