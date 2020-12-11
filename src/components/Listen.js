//main module that renders NavBar and ApplicationViews if user is logged in, or redirects to login or registration form
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./Nav/Nav";
import { Login } from "./Auth/Login";
import { Register } from "./Auth/Register";
import { MusicianProvider } from "./Musicians/MusicianProvider";

export const Listen = () => (
  <>
    <MusicianProvider>
      <Route
        render={() => {
          if (localStorage.getItem("listen_user_id")) {
            return (
              <>
                <Route render={(props) => <NavBar {...props} />} />
                <Route render={(props) => <ApplicationViews {...props} />} />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </MusicianProvider>

    <Route
      path="/login"
      render={(props) => {
        if (localStorage.getItem("listen_user_id")) {
          return <Redirect to="/home" />;
        } else {
          return <Login {...props} />;
        }
      }}
    />

    <Route
      path="/register"
      render={(props) => {
        if (localStorage.getItem("listen_user_id")) {
          return <Redirect to="/home" />;
        } else {
          return <Register {...props} />;
        }
      }}
    />
  </>
);