import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { useReactMediaRecorder } from "react-media-recorder";
import { RecordingContext } from "./RecordingProvider"
import React, { useContext, useState, useEffect } from "react"
import {
  Box,
  Button,
  TextInput,
  Text
} from "grommet"
import "./RecordingAnimation.css"


export const NewRecording = (props) => {
  //set state state var and setter function 
  // use Effect when recording ends, reset state

  const { getRecordings, createRecording } = useContext(RecordingContext)
  const [currentRecording, setCurrentRecording] = useState({})
  const excerptId = props.match.params.excerptId

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getRecordings()
  }, [])



  const handleChange = (event) => {
    const newRecordingState = Object.assign({}, currentRecording)
    newRecordingState[event.target.name] = event.target.value
    setCurrentRecording(newRecordingState)
  }
  const jsonDate = new Date(Date.now()).toJSON().slice(0, 10);

  const constructNewRecording = (secureUrl) => {
    const newRecording = {
      label: currentRecording.label,
      excerpt: excerptId,
      audio: secureUrl,
      date: jsonDate

    }

    createRecording(newRecording)
      .then(() => props.history.push("/home"))
  }



  const uploadAudio = async () => {
    var reader = new FileReader()

    const audioBlob = await fetch(mediaBlobUrl)
      .then(r => r.blob())
    reader.readAsDataURL(audioBlob)

    reader.onloadend = function () {
      var base64data = reader.result
      const data = new FormData()
      data.append('file', base64data)
      data.append('upload_preset', 'zv6murma')
      data.append('resource_type', 'video')

      fetch("https://api.cloudinary.com/v1_1/dkicrisrl/upload", {
        method: "POST",
        headers: {
          "Accept": "application/json"

        },
        body: data
      })
        .then(res => res.json())
        .then(res => {
          const audioresult = res
          constructNewRecording(audioresult.secure_url)
        })

    }
  }



  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    audio: true
  });



  return (

    <>
      <Button primary margin="medium" padding="large" onClick={startRecording}>Start Recording</Button>
      <Button primary onClick={stopRecording}>Stop Recording</Button>
      <div class="animation">
        {status === 'recording' ?

          <div class="loader-container">
            <div class="rectangle-1"></div>
            <div class="rectangle-2"></div>
            <div class="rectangle-3"></div>
            <div class="rectangle-4"></div>
            <div class="rectangle-5"></div>
            <div class="rectangle-6"></div>
            <div class="rectangle-5"></div>
            <div class="rectangle-4"></div>
            <div class="rectangle-3"></div>
            <div class="rectangle-2"></div>
            <div class="rectangle-1"></div>
          </div>

          : ""}

        <audio src={mediaBlobUrl} controls autoplay />
      </div>


      <Box>
        <Text htmlFor="label">Enter excerpt name and take: </Text>
        <Box margin="small">
          <TextInput
            type="text"
            name="label"
            required
            autoFocus
            placeholder="ex: Excerpt take 1"
            value={currentRecording.label}
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Button
        fill={false}
        primary
        label="Save"
        onClick={() => {
          uploadAudio()

            ;
        }}
      />


    </>
  )


}

