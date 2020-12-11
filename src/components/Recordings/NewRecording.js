import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { RecordingContext } from "./RecordingProvider"
import React, { useContext, useState, useEffect } from "react"
import {
    Box,
    Button,
    TextInput,
    Text
  } from "grommet";




export const NewRecording = (props) => {
//set state state var and setter function 
// use Effect when recording ends, reset state

const {getRecordings, createRecording } = useContext(RecordingContext)

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
        audio: recorderState.url,
        date: jsonDate
    
    }
    createRecording(newRecording)
        .then(() => props.history.push("/home"))
}

var cloudinary_api = "https://api.cloudinary.com/v1_1/dkicrisrl/mh/upload"
var cloudinary_upload_preset = "zv6murma/mh/upload"

// const uploadAudio = async e => {
//     const files = e.target.files
//     const data = new FormData()
//     data.append('file', files[0])
//     data.append(cloudinary_upload_preset, 'listen')
//     setLoading(true)
//     const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dkicrisrl/mh/upload",
//         {
//             method: "POST",
//             body: data
//         }
//     )
//     const file = await res.json()
//     setAudio(file.secure_url)
//     setLoading(false)
//     console.log(audio)
// }

const uploadAudio = async url => {
    const data = new FormData()
    data.append('url', url)
    data.append(cloudinary_upload_preset, 'listen')
    setLoading(true)
    debugger
    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dkicrisrl/mh/upload", {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        })
        const file = res.json()
        setAudio(file.secure_url)
        setLoading(false)
        console.log(audio) 
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

const handleAudioUpload = (file) => {
    uploadAudio(recorderState.url)
    console.log(file);
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
        record = { true }
        title = { "New recording" }
        audioURL = {recorderState.url}
        showUIAudio
        handleAudioStop = {data => handleAudioStop(data) }
        handleAudioUpload = {data => handleAudioUpload(data)}
        handleRest = {() => handleReset()}

        />

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

