import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { RecordingContext } from "./RecordingProvider"
import React, { useContext, useState, useEffect } from "react"
import {
  Box,
  Button,
  TextInput,
  Text
} from "grommet"
// import { Audio, Transformation, CloudinaryContext } from 'cloudinary-react'


export const NewRecording = (props) => {
  //set state state var and setter function 
  // use Effect when recording ends, reset state

  const { getRecordings, createRecording } = useContext(RecordingContext)
  const [currentRecording, setCurrentRecording] = useState({})
  const excerptId = props.match.params.excerptId

  const [audio, setAudio] = useState('')
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

  const constructNewRecording = () => {
    const newRecording = {
      label: currentRecording.label,
      excerpt: excerptId,
      audio: audio,
      date: jsonDate

    }
    // recorderState.url

    createRecording(newRecording)
      .then(() => props.history.push("/home"))
  }

  // var cloudinary_api = "https://api.cloudinary.com/v1_1/dkicrisrl/mh/upload"
  // var cloudinary_upload_preset = "zv6murma/raw/upload"


  const uploadAudio = () => {
    var reader = new FileReader()

    reader.readAsDataURL(recorderState.blob)
    reader.onloadend = function () {
      var base64data = reader.result
      // console.log(base64data)
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
          setAudio(audioresult.secure_url)
          // setAudio(data.secure_url)
          console.log(audio)
        })   

    }
  }

  const [recorderState, setRecorderState] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: 0,
      m: 0,
      s: 0
    }
  })

  const handleAudioStop = (data) => {
    console.log(data)
    setRecorderState(data)
    
  }
  
  const handleAudioUpload = () => {
    uploadAudio()
  }

  const handleReset = () => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };
    setRecorderState(reset)
  }


  return (
    <>
      <Recorder
        record={true}
        title={"New recording"}
        audioURL={recorderState.url}
        showUIAudio
        handleAudioStop={data => handleAudioStop(data)}
        handleAudioUpload={data => handleAudioUpload(data)}
        handleRest={() => handleReset()}

      />

      {/* <Audio src={recorderState.url} cloudName="dkicrisrl" controls publicId="dkicrisrl" type="ogg" onClick={uploadAudio} /> */}


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
        onClick={(evt) => {
          constructNewRecording(evt)
            ;
        }}
      />


    </>
  )


}

