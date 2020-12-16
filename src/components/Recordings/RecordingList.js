//module to play a recording and render its date and label
import React, { useEffect, useContext, useState } from "react";
import { RecordingContext } from "./RecordingProvider";
import { Button, Box, Heading, List, Text } from "grommet";
import { Link } from "react-router-dom";
import { Recording } from "./Recording"
export const RecordingList = (props) => {
  const { getRecordingByExcerpt } = useContext(RecordingContext);

  const [recordings, setRecordings] = useState([])
  const excerptId = props.match.params.excerptId

  //gets the recordings from the database
  useEffect(() => {
    getRecordingByExcerpt(excerptId)
    .then(setRecordings);
  }, []);


  return (
    <Box>
      <Heading level="3">Recordings</Heading>

      <Box className="categoryList" direction="row">
        <Box background="background-contrast" elevation="small">
        <List data={recordings} primaryKey="label" />
        </Box>
        <Box>

          {recordings.map((recordingObject) => {
            return (
              <Recording recordingId = {recordingObject.id} {...props}/>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};
