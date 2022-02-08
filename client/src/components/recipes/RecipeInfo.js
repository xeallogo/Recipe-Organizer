import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function RecipeInfo(props) {
  const [recipe, setRecipe] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(function() {
    async function getRecipe() {
      try {
        const response = await axios.get(`/api/recipes/${_id}/`);
        setRecipe(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }

    getRecipe();
  }, [props, _id]);

  async function handleDelete() {
    try {
      await axios.delete(`/api/recipes/${_id}/`);
      navigate("/recipes");
    } catch(error) {
      console.error(error);
    }
  }


  let ingredientList = recipe.ingredients?.split(",");
  let procedureList = recipe.procedure?.split("Step:");
  procedureList?.shift();



  return (
    <div>
      <h1>{recipe.title}</h1>
      <h5>({recipe.typeOfRecipe})</h5>
      <h3 style={{margin: "30px 0 10px 0"}}>Ingredients</h3>
        <ul>
          {ingredientList?.map((ingredient, i) =>
            <li key={i}>{ingredientList[i]}</li>
          )}
        </ul>
      <h3 style={{margin: "30px 0 10px 0"}}>Preparation</h3>
        <ol>
          {procedureList?.map((step, i) =>
            <li key={i}>{procedureList[i]}</li>
          )}
        </ol>
      <div className="btn-group" style={{margin: "50px 0 0 0"}}>
        <Link to={`/recipes/${_id}/edit`} className="btn btn-primary">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        <Link to="/recipes" className="btn btn-secondary">Close</Link>
      </div>
      <hr/>
    </div>
  );
};

export default RecipeInfo;
