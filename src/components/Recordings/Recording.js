//module to play a recording and render its date and label
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GoalsPerRecording } from "../Goals/GoalsPerRecording"
import { RecordingContext } from "./RecordingProvider"
import { Trash, Add } from "grommet-icons"
import {
    Box,
    Button,
    Heading,
    Text,
} from "grommet";
import { CommentList } from "../Comments/CommentList"
import { ExcerptContext } from "../Excerpts/ExcerptProvider"
import "../Excerpts/extra.css"

export const Recording = (props) => {
    const { getRecordingById, deleteRecording } = useContext(RecordingContext)

    const [recordingObject, setRecordingObject] = useState({})

    const { getExcerptById } = useContext(ExcerptContext)

    const [relatedExcerpt, setRelatedExcerpt] = useState({})

    const excerptId = props.excerptId

    const toggleFunction = () => {
        props.func()
    }


    useEffect(() => {
        getRecordingById(props.recordingId)
            .then(setRecordingObject)

        getExcerptById(excerptId)
            .then(setRelatedExcerpt)


    }, [])


    return (
        <>

            <Box>
                <Box margin="medium">
                    <Text weight="bold" size="large">{recordingObject.label}</Text>
                    <Text weight="bold">{recordingObject.date}</Text>
                    <Box margin="medium">

                        <audio src={recordingObject.audio} controls />

                    </Box>
                    {relatedExcerpt.created_by_current_user
                        ? (
                            <>
                                <Button
                                    primary
                                    as={Link}
                                    onClick={() => deleteRecording(recordingObject.id).then(toggleFunction)}
                                    icon={<Trash />}
                                    label="Delete Recording"
                                    className="excerptDetailsButton"
                                    
                                />


                                <Heading level="3" margin={{top: "large"}}>Goals</Heading>
                                <Button
                                    primary
                                    as={Link}
                                    to={{ pathname: `/goals/${recordingObject.id}/create` }}
                                    icon={<Add />}
                                    margin="xsmall"
                                    label="Add New Goal"
                                    className="excerptDetailsButton"

                                />

                            </>
                        )
                        :
                        ""
                    }




                    <Box margin="medium">

                        <GoalsPerRecording recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />
                        <CommentList recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />
                        {relatedExcerpt.created_by_current_user ? "" :
                            <Button
                                primary
                                as={Link}
                                to={{ pathname: `/comments/${recordingObject.id}/create` }}
                                icon={<Add />}
                                label="Add a comment"
                                margin="small"
                            />
                        }
                    </Box>
                </Box>
            </Box>
        </>

    )
}


