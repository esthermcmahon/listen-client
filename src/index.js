import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Listen } from "./components/Listen.js"
import "./index.css"
import { Grommet } from "grommet"

ReactDOM.render(
  <Grommet>
    <React.StrictMode>
      <Router>
        <Listen />
      </Router>
    </React.StrictMode>
  </Grommet>,
    document.getElementById("root")

)