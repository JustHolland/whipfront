import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import React, {Component} from 'react'
import Home from './Home'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      pantrys: []
    }
  }


render (){
  return (
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
        </nav>

        <Routes>
          <Route path= '/' element={<Home />} />
        </Routes>
      </div>
    );
  }
}

export default App;
