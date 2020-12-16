//module to play a recording and render its date and label
import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import { GoalsPerRecording } from "../Goals/GoalsPerRecording"
import { RecordingContext } from "./RecordingProvider"
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

export const Recording = (props) => {
    const { getRecordingById } = useContext(RecordingContext)

    const [recordingObject, setRecordingObject] = useState({})

    useEffect(() => {
        getRecordingById(props.recordingId)
            .then(setRecordingObject)
    }, [])

    return (
        <>
            <Box>
                <Box margin="medium">
                    <Heading level="3" >{recordingObject.label}</Heading>
                    <Text>{recordingObject.date}</Text>
                    <audio controls>
                        <source src={recordingObject.audio} type="audio/ogg" format="audio/ogg"></source>
                        <source src={recordingObject.audio} type="audio/mpeg" format="audio/mpeg"></source>
                    </audio>
                    <Button
                        primary
                        as={Link}
                        to={{ pathname: `/goals/${recordingObject.id}/create` }}
                        label="Add Goal"
                        margin="small"

                    />
                    <Box margin="medium">

                        <GoalsPerRecording recordingId={recordingObject.id} {...props} />

                    </Box>
                </Box>
            </Box>
        </>

    )
}

