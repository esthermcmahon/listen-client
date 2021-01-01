//module to list recordings on the excerpt details
import React, { useEffect, useContext, useState } from "react";
import { RecordingContext } from "./RecordingProvider";
import { Button, Box, Heading, List, Text } from "grommet";
import { Link } from "react-router-dom";
import { Recording } from "./Recording"
export const RecordingList = (props) => {
  const { getRecordingByExcerpt } = useContext(RecordingContext);

  const [recordings, setRecordings] = useState([])
  const excerptId = props.match.params.excerptId

  const [change, setChange] = useState(false)

  const func = () => {
    change ? setChange(false) : setChange(true)

}
  //gets the recordings from the database
  useEffect(() => {
    getRecordingByExcerpt(excerptId)
    .then(setRecordings);
  }, [change]);


  return (
    <Box>
      <Heading level="3">Recordings</Heading>

      <Box className="categoryList" direction="row">
        <Box background="background-contrast" elevation="small">
        </Box>
        <Box>

          {recordings.map((recordingObject) => {
            return (
              <Recording recordingId = {recordingObject.id} excerptId={excerptId} func={func} {...props}/>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
