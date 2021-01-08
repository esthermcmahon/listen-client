import React, { useContext, useEffect, useState } from "react"
import { CommentContext } from "./CommentProvider"
import { MusicianContext } from "../Musicians/MusicianProvider"
import { Trash, Edit, More } from "grommet-icons"
import {
    Box,
    Menu,
    Heading,
    Text,
    Card
} from "grommet";
import { DeleteComment } from "./DeleteComment"

export const CommentList = (props) => {
    const { deleteComment, getCommentByRecording } = useContext(CommentContext)
    const { currentUser, getCurrentUser } = useContext(MusicianContext)

    const [comments, setComments] = useState([])

    const [open, setOpen] = useState();
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(undefined);
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
            
            <Box>
                {
                    comments.map((comment) => {
                        return (
                            <>  
                                <Heading level="3" margin={{top: "small", left:"xlarge", right:"small", bottom:"small"}}>Comments</Heading>
                                <Card background="#D5ECE1" margin={{top: "small", left: "xlarge", right:"small", bottom:"small"}} pad="medium">
                                <Text>{comment.content}</Text>
                                <Text>{comment.date}</Text>
                                <Text>{comment.author.user.first_name} {comment.author.user.last_name}</Text>
                               
                                {comment.created_by_current_user ? (
                                    <>

                                        <DeleteComment open={open} onClose={onClose} commentId={comment.id} func={func} />
                                        <Box width="xsmall" margin={{ left: "none", bottom: "xsmall" }}>
                                            <Menu
                                                icon={<More />}
                                                hoverIndicator
                                                alignSelf="start"
                                                size="small"
                                                items={[
                                                    {
                                                        icon: (
                                                            <Box>
                                                                <Edit />
                                                            </Box>
                                                        ),
                                                        onClick: () =>
                                                            props.history.push(`/editcomment/${comment.id}/${props.recordingId}`),
                                                    },
                                                    {
                                                        icon: (
                                                            <Box>
                                                                <Trash />
                                                            </Box>
                                                        ),
                                                        onClick: () => onOpen(),

                                                    },
                                                ]}
                                            />
                                        </Box>
                                    </>
                                )
                                    : ""}
                                    </Card>
                            </>
                            
                        )
                    })
                }

            </Box>

        </Box>

    )
}
