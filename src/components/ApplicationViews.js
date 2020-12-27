//MVP renders each imported component depending on the URl path 
import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./Categories/CategoryProvider"
import { CommentProvider } from "./Comments/CommentProvider"
import { ConnectionProvider } from "./Connections/ConnectionProvider"
import { GoalProvider } from "./Goals/GoalProvider"
import { MusicianProvider } from "./Musicians/MusicianProvider"
import { ExcerptProvider } from "./Excerpts/ExcerptProvider"
import { NewRecording } from "./Recordings/NewRecording";
import { RecordingProvider } from "./Recordings/RecordingProvider"
import { ExcerptForm } from "./Excerpts/ExcerptForm";
import { ExcerptList } from "./Excerpts/ExcerptList"
import { ExcerptDetails } from "./Excerpts/ExcerptDetails"
import { GoalForm } from "./Goals/GoalForm"
import { MyConnections } from "./Connections/MyConnections";
import { PracticerProfile } from "./Connections/PracticerProfile";
import { CommentForm } from "./Comments/CommentForm"
import { CompletedExcerpts } from "./Excerpts/CompletedExcerpts"


export const ApplicationViews = (props) => {
    return (
        <>
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}>
              

                <ExcerptProvider>
                    <RecordingProvider>
                        <GoalProvider>
                            <CommentProvider>
                                <Route exact path="/excerpts/:excerptId(\d+)/newrecording" render={props => <NewRecording {...props}/>} />
                                <Route exact path = "/excerpts/create" render={props => <ExcerptForm {...props}/>} />
                                <Route exact path = "/editexcerpt/:excerptId(\d+)" render = {props => <ExcerptForm {...props} />} />
                                <Route exact path = "/home" render = {props => <ExcerptList {...props} />} />
                                <Route exact path = "/excerpts/:excerptId(\d+)" render = {props => <ExcerptDetails {...props} />} />
                                <Route exact path = "/completed" render = {props => <CompletedExcerpts {...props} />} />
                            </CommentProvider>
                        </GoalProvider>
                    </RecordingProvider>
                </ExcerptProvider>
                
                <CategoryProvider>
                    <GoalProvider>
                        <Route exact path = "/goals/:recordingId(\d+)/create" render = {props => <GoalForm {...props} /> } />
                        <Route exact path = "/editgoal/:goalId(\d+)/:recordingId(\d+)" render = {props => <GoalForm {...props} /> } />
                    </GoalProvider>
                </CategoryProvider>
                
                <MusicianProvider>
                    <ConnectionProvider>
                        <Route exact path = "/connections" render = {props => <MyConnections {...props} /> } />
                    </ConnectionProvider>
                </MusicianProvider>

                <MusicianProvider>
                    <ConnectionProvider>
                        <ExcerptProvider>
                            <RecordingProvider>
                                <GoalProvider>
                                    <CommentProvider>
                                        <Route exact path = "/profiles/:practicerId(\d+)" render = {props => <PracticerProfile {...props} /> } />
                                        <Route exact path = "/comments/:recordingId(\d+)/create" render = {props => <CommentForm {...props} /> } />
                                        <Route exact path = "/editcomment/:commentId(\d+)/:recordingId(\d+)" render = {props => <CommentForm {...props} /> } />
                                    </CommentProvider>
                                </GoalProvider>
                            </RecordingProvider>
                        </ExcerptProvider>
                    </ConnectionProvider>
                </MusicianProvider>
            </main>
        </>

    );
};
