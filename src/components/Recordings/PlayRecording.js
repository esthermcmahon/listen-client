//module to play a recording and render its date and label
import React, { useEffect, useContext, useState } from "react";
import { RecordingContext } from "./RecordingProvider";
import { Button, Box, Heading, List, Text } from "grommet";
import { Link } from "react-router-dom";

export const PlayRecording = (props) => {
  const { recordings, getRecordings } = useContext(RecordingContext);
  
//   let audioFile = new File([recordingObject.audio])

  //gets the recordings from the database
  useEffect(() => {
    getRecordings();
  }, []);


  return (
    <Box>
      <Heading level="1">Recordings</Heading>

      <Box className="categoryList" direction="row">
        <Box background="background-contrast" elevation="small">
        <List data={recordings} primaryKey="label" />
        </Box>
        <Box>

        <audio controls>
                        <source src="http://localhost:3000/21bce805-3519-4193-aabc-126b08896615" type="audio/ogg" format="audio/ogg"></source>
                        <source src="http://localhost:3000/21bce805-3519-4193-aabc-126b08896615" type="audio/mpeg" format="audio/mpeg"></source>
                            
                    </audio>
        

          {recordings.map((recordingObject) => {
            return (
              <>
                <Box direction="row" align="center">
                    <Text>{recordingObject.label}</Text>
                    <Text>{recordingObject.date}</Text>
                    <audio controls>
                        <source src={recordingObject.audio} type="audio/ogg" format="audio/ogg"></source>
                        <source src={recordingObject.audio} type="audio/mpeg" format="audio/mpeg"></source>
                            
                    </audio>
                </Box>
              </>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};