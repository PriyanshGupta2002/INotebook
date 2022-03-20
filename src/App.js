import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home  from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import  Alert  from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import React,{useState} from 'react';
function App() {

  const [alert, setalert] = useState({message:"",type:""})
  const showAlert=(message,type)=> {
    setalert({message:message,type:type})

    setTimeout(() => {
      setalert({message:"",type:""})
    },2500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar alert={showAlert} />
          <Alert alert={alert}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About showAlert={showAlert}/>
              </Route>
              <Route exact path="/login">
                <Login  showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup  showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;