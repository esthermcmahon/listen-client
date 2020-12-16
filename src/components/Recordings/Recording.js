import React, { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
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
    const {getRecordingById} = useContext(RecordingContext)

    const [recordingObject, setRecordingObject] = useState({})

    useEffect(() => {
        getRecordingById(props.recordingId)
            .then(setRecordingObject)
    }, [])

    return (
    <Box direction="row" align="center">
                    <Text>{recordingObject.label}</Text>
                    <Text>{recordingObject.date}</Text>
                    <audio controls>
                        <source src={recordingObject.audio} type="audio/ogg" format="audio/ogg"></source>
                        <source src={recordingObject.audio} type="audio/mpeg" format="audio/mpeg"></source>
                            
                    </audio>
    </Box>

    )
}


