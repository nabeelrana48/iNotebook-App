import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setalert] = useState(null)

  const showAlert = (type, message) => {
    setalert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showalert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signup showalert={showAlert} />
            </Route>
            <Route exact path="/">
              <Home showalert={showAlert} />
            </Route>
          </Switch>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
