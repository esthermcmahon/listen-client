//renders each imported component depending on the URl path 
import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./Categories/CategoryProvider"
import { CommentProvider } from "./Comments/CommentProvider"
import { ConnectionProvider } from "./Connections/ConnectionProvider"
import { GoalProvider } from "./Goals/GoalProvider"
import { MusicianProvider } from "./Musicians/MusicianProvider"
import { NewRecording } from "./Recordings/NewRecording";
import { PlayRecording } from "./Recordings/PlayRecording";
import { RecordingProvider } from "./Recordings/RecordingProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}>
                <RecordingProvider>
                    <Route exact path="/excerpts/:excerptId(\d+)/newrecording" render={props => <NewRecording {...props}/>} />
                    <Route exact path="/recordings" render={props => <PlayRecording {...props}/>} />
                </RecordingProvider>
            </main>
        </>

    );
};
