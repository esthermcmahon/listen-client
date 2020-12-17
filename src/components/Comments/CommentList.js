import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { Link } from "react-router-dom"
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
import { get } from "http";

export const CommentList = (props) => {
    const { deleteComment, getCommentByRecording } = useContext(CommentContext)
    const { currentUser, getCurrentUser } = useContext(MusicianContext)

    const [comments, setComments] = useState([])

    const relatedExcerpt = props.relatedExcerpt

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

                                {comment.author.user == currentUser ?
                                    <Button
                                        primary
                                        as={Link}
                                        to={{ pathname: `/editcomment/${comment.id}/${props.recordingId}` }}
                                        label="EDIT"
                                        margin="small"
                                    />
                                    : ""}
                            </>
                        )
                    })
                }

            </Box>

        </Box>

    )
}
