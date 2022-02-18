
import './App.css';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from 'react'
import Home from './Home'
import PantryContainer from './PantryContainer'
import Whip from './Whip'
import Login from "./Login";
import SignUp from "./SignUp"
import Recipe from './Recipe';



let baseUrl = 'http://localhost:8000'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pantrys: [],
      recipes: [],


    }
  }

  getRecipes = () => {
     fetch("https://api.edamam.com/search?q=chicken&app_id=4e9f05eb&app_key=9b904d703fa0d46a88ce1ac63f29f498")
       .then((res) => res.json())
       .then((json) =>
         this.setState({
           recipes: json,
         })
       );
   };
getPantrys = () => {
  // fetch to the backend
  fetch(baseUrl + "/api/v1/pantrys/",{
    credentials: "include"
  })
  .then(res => {
    if(res.status === 200) {
      return res.json()
    } else {
      return []
    }
  }).then(data => {
    console.log(data.data)
    this.setState({ pantrys: data.data })
  })
}

addPantry= () => {
  // fetch to the backend
  fetch(baseUrl + "/api/v1/pantrys/",{
    credentials: "include"
  })
  .then(res => {
    if(res.status === 200) {
      return res.json()
    } else {
      return []
    }
  }).then(data => {
    console.log(data.data)
    this.setState({ pantrys: data.data })
  })
}

loginUser = async (e) => {
  console.log('loginUser')
  e.preventDefault()
  const url = baseUrl + '/api/v1/users/login'
  const loginBody = {
    password: e.target.password.value,
    email: e.target.email.value
  }
  try {

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(loginBody),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include"
    })

    console.log(response)
    console.log("BODY: ",response.body)

    if (response.status === 200) {
      this.getPantrys()
    }
  }
  catch (err) {
    console.log('Error => ', err);
  }
}

register = async (e) => {
  e.preventDefault()
  const url = baseUrl + '/api/v1/users/register'
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response.status === 200) {
      this.getPantrys()
    }
  }
  catch (err) {
    console.log('Error => ', err);
  }
}


handleChange = (e)=>{
 this.setState({
   [e.target.name]: e.target.value
 })
}

componentDidMount() {
  this.getPantrys()
  this.getRecipes()
}

 render () {
    return (
      <div className="App">
         <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
          <Link className="navbar-brand" to="/">WHIP</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                  </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                  </li>
                <li className="nav-item">
                  <Link className="nav-link"  to="/pantrys">List All Pantrys</Link>
                  </li>
                <li className="nav-item">
                  <Link className="nav-link"  to="/whip">Find A Recipe</Link>
                  </li>

               </ul>
                 </div>
               </div>
             </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<SignUp signUp={this.signUp}/>} />
          <Route path='/login' element={<Login login={this.login}/>} />
          <Route path='/pantrys' element={<PantryContainer pantrys={this.state.pantrys}/>} />
          <Route path="/whip" element={<Whip/>} />
        </Routes>
      </div>

    );
  }
}

export default App;
