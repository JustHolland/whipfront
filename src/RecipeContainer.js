import React, { Component } from "react";
import Axios from 'axios';

const API_KEY = "68d99d68c7e64c0bac45eb3d9dd0faf3";


class RecipeContainer extends Component{
  constructor(props) {
  super(props)

  this.state = {
  recipes: [],

  }
}

  componentDidMount() {
    Axios.get('https://api.spoonacular.com/recipes/random?apiKey=68d99d68c7e64c0bac45eb3d9dd0faf3')
      .then(response =>{
        this .setState({
          recipes:response.data
      })
      console.log(response.data)
    })
  }

  render(){
    return(
      <div>
        <h1> List of Recipes </h1>
      </div>
    )
  }
}
export default RecipeContainer
