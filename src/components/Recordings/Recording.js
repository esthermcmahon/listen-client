//module to play a recording and render its date and label
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GoalsPerRecording } from "../Goals/GoalsPerRecording"
import { RecordingContext } from "./RecordingProvider"
import { Trash, Add } from "grommet-icons"
import { Box, Button, Heading, Text } from "grommet";
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
                                    margin={{top:"small", bottom: "small", left:"xsmall", right:"small"}}
                                    label="Delete Recording"
                                    className="excerptDetailsButton"
                                    
                                />

                                <Button
                                    primary
                                    as={Link}
                                    margin={{top:"large", bottom: "small", left:"xsmall", right:"small"}}
                                    to={{ pathname: `/goals/${recordingObject.id}/create` }}
                                    icon={<Add />}
                                    label="Add New Goal"
                                    className="excerptDetailsButton"

                                />
                                

                            </>
                        )
                        :
                        ""
                    }




                    <Box margin="medium" direction="row-responsive">

                        <GoalsPerRecording recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />
                        <Box direction="column">
                        <CommentList recordingId={recordingObject.id} {...props} relatedExcerpt={relatedExcerpt} />
                        
                        {relatedExcerpt.created_by_current_user ? "" :
                            <Button
                                primary
                                margin={{top: "small", left: "xlarge", right:"small", bottom:"small"}}
                                as={Link}
                                to={{ pathname: `/comments/${recordingObject.id}/create` }}
                                icon={<Add />}
                                label="Add a comment"
                                className="commentButton"
                                
                                
                            />
                        }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>

    )
}


