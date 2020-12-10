//main module that renders NavBar and ApplicationViews if user is logged in, or redirects to login or registration form
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { UserProvider } from "./Profiles/UserProvider";

export const Listen = () => (
  <>
    <UserProvider>
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
    </UserProvider>

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