import React, { useContext, useEffect, useRef } from "react"
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
    const deleteCommentDialog = useRef(null)
    const editCommentDialog = useRef(null)

    //get the comments for this recording from the database
    useEffect(() => {
        getCommentByRecording(props.recordingId)
    }, [])

 


    return (
        <Box>
            <Text></Text>
            <Text></Text>
            <Text></Text>
        </Box>
     
    )
}
