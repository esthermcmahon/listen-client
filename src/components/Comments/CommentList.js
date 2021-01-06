import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { Link } from "react-router-dom"
import { MusicianContext } from "../Musicians/MusicianProvider"
import { Trash, Edit } from "grommet-icons"
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

    const [change, setChange] = useState(false)

    const relatedExcerpt = props.relatedExcerpt

    const func = () => {
        change ? setChange(false) : setChange(true)

    }

    //get the comments for this recording from the database
    useEffect(() => {
        getCommentByRecording(props.recordingId)
            .then(setComments)

    }, [change])




    return (
        <Box>
            <Heading level="3" margin={{left: "none"}}>Comments</Heading>
            <Box>
                {
                    comments.map((comment) => {
                        return (
                            <>
                                <Text>{comment.content}</Text>
                                <Text>{comment.date}</Text>
                                <Text>{comment.author.user.first_name} {comment.author.user.last_name}</Text>

                                {comment.created_by_current_user ? (
                                    <>
                                        <Button
                                            primary
                                            as={Link}
                                            to={{ pathname: `/editcomment/${comment.id}/${props.recordingId}` }}
                                            icon={<Edit />}
                                            margin="small"
                                        />
                                        <Button
                                            primary
                                            as={Link}
                                            onClick={() => deleteComment(comment.id).then(func)}
                                            icon={<Trash />}
                                            margin="small"
                                        />
                                    </>
                                )
                                    : ""}
                            </>
                        )
                    })
                }

            </Box>

        </Box>

    )
}
