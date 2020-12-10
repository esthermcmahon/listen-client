//renders each imported component depending on the URl path 
import React from "react";
import { Route } from "react-router-dom";


export const ApplicationViews = (props) => {
    return (
        <>
            <main
                style={{
                    margin: "5rem 2rem",
                    lineHeight: "1.75rem",
                }}>
                <Route exact path="/" >
                    
                </Route>

            </main>
        </>

    );
};
