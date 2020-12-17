import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { MusicianContext } from "../Musicians/MusicianProvider"
import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    Text,
} from "grommet";

export const CommentList = (props) => {
    const {deleteComment, getCommentByRecording} = useContext(CommentContext)
    const {currentUser, getCurrentUser} = useContext(MusicianContext)
   
    const [comments, setComments] = useState([])



    //get the comments for this recording from the database
    useEffect(() => {
        getCommentByRecording(props.recordingId)
        .then(setComments)
    }, [])

 


    return (
        <Box>
            <Heading>Comments</Heading>
            <Box>
                {
                    comments.map((comment) => {
                        return (
                            <>
                            <Text>{comment.content}</Text>
                            <Text>{comment.date}</Text>
                            <Text>{comment.author.user.first_name} {comment.author.user.last_name}</Text>
                            </>
                        )
                    })
                }
            </Box>
            
        </Box>
     
    )
}
