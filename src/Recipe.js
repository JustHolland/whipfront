import React from "react";
import "./App.css";
import style from "./rep.css";

const Recipe = ({ key, title, calories, image, ingredients }) => {
  return (
    <div className={style.recipe}>
      <h1 className={style.h1}>{title}</h1>
      <img className={style.image} src={image} alt={title} />
      <ol className={style.ingredients}>
        {ingredients.map((ingredient) => (
          <li key={key}>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories:{calories}</p>
    </div>
  );
};
export default Recipe;
