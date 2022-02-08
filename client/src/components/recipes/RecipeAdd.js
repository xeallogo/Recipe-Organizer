import React, { useState } from "react";
import { post } from 'axios';
import { useNavigate } from "react-router-dom";



function RecipeAdd(props) {
  const initialState = {
    typeOfRecipe: '',
    title: '',
    ingredients: '',
    procedure: ''
  }
  const [recipe, setRecipe] = useState(initialState);
  const navigate = useNavigate();


  function handleChange(event) {
    setRecipe({...recipe, [event.target.name]: event.target.value})
  }


  function handleSubmit(event) {
    event.preventDefault();
    if(!recipe.title || !recipe.ingredients || !recipe.procedure) return
    async function postRecipe() {
      try {
        const response = await post('/api/recipes', recipe);
        navigate(`/recipes/${response.data._id}`);
      } catch(error) {
        console.log('error', error);
      }
    }
    postRecipe();
    navigate("/recipes")
  }

  function handleCancel() {
    navigate("/recipes");
  }

  const inputStyle = {
    margin: "5px"
  }
  const buttonStyle = {
    marginBottom: "80px",
    marginTop: "20px"
  }


  return (
    <div>
      <h1>New Recipe</h1>
      <hr/>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <h5>Type of Recipe</h5>
          <select name="typeOfRecipe" value={recipe.typeOfRecipe} onChange={handleChange} className="form-control">
            <option value="Appetizer">Appetizer</option>
            <option value="Entree">Entree</option>
            <option value="Side">Side</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div className="form-group">
          <h5 style={{margin: "30px 0 10px 0"}}>Title</h5>
          <input name="title" type="text" value={recipe.title} onChange={handleChange} className="form-control" style={inputStyle} />
        </div>

        <div className="form-group">
          <h5 style={{margin: "30px 0 10px 0"}}>Ingredients</h5>
          <textarea name="ingredients" rows="5" value={recipe.ingredients} onChange={handleChange} className="form-control" style={inputStyle} placeholder="Ingredients must be separated by a comma." />
        </div>

        <div className="form-group">
          <h5 style={{margin: "30px 0 10px 0"}}>Preparation</h5>
          <textarea name="procedure" rows="5" value={recipe.procedure} onChange={handleChange} className="form-control" style={inputStyle} placeholder="Steps in the preparation must each begin with 'Step'."/>
        </div>

        <div className="btn-group">
          <input type="submit" value="Submit" className="btn btn-primary" style={buttonStyle}/>
          <button type="button" onClick={handleCancel} className="btn btn-secondary" style={buttonStyle}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RecipeAdd;
