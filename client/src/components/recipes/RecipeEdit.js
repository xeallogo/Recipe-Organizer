import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


function RecipeEdit(props) {
  const [recipe, setRecipe] = useState({})
  const navigate = useNavigate();
  const { _id } = useParams();




  useEffect(function() {
    async function getRecipe() {
      try {
        const response = await axios.get(`/api/recipes/${_id}`);
        setRecipe(response.data);
      } catch(error) {
        console.log(error);
      }
    }
    getRecipe();
  }, [props, _id]);

  function handleSubmit(event) {
    event.preventDefault();
    async function updateRecipe() {
      try {
        await axios.patch(`/api/recipes/${_id}`, recipe);
        navigate(`/recipes/${_id}`);
      } catch(error) {
        console.log(error);
      }
    }
    updateRecipe();
    navigate("/recipes")
  }

  function handleChange(event) {
    setRecipe({...recipe, [event.target.name]: event.target.value})
  }

  function handleCancel() {
    navigate(`/recipes/${_id}`);
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
      <h1>Edit Recipe</h1>
      <hr/>
      <form onSubmit={handleSubmit}>



      <div className="form-group">
        <h5>Type of Recipe</h5>
        <select name="typeOfRecipe" value={recipe.typeOfRecipe} onChange={handleChange}>
          <option value="Appetizer">Appetizer</option>
          <option value="Entree">Entree</option>
          <option value="Side">Side</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <div className="form-group">
        <h5>Title:</h5>
        <input name="title" type="text" value={recipe.title} onChange={handleChange} className="form-control" style={inputStyle}/>
      </div>
      <div className="form-group">
        <h5>Ingredients:</h5>
        <textarea name="ingredients" rows="5" value={recipe.ingredients} onChange={handleChange} className="form-control" style={inputStyle}/>
      </div>
      <div className="form-group">
        <h5>Procedure:</h5>
        <textarea name="procedure" rows="5" value={recipe.procedure} onChange={handleChange} className="form-control" style={inputStyle} />
      </div>

      <div className="btn-group">
        <input type="submit" value="Submit" className="btn btn-primary" style={buttonStyle}/>
        <button type="button" onClick={handleCancel} className="btn btn-secondary" style={buttonStyle}>Cancel</button>
      </div>
      </form>
    </div>
  );
}

export default RecipeEdit;
