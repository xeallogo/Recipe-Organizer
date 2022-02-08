import React, { useState, useEffect } from 'react';
import  axios  from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';



function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [ newSearch, setNewSearch ] = useState('');


  useEffect(function() {
    async function getRecipes() {
      try {
        const response = await axios.get("/api/recipes");
        setRecipes(response.data);
      } catch(error) {
        console.log('error', error);
      }
    };
    getRecipes();
  }, []);

  const handleSearch = (event) => {
    const search = event.target.value;
    setNewSearch(search);
  };

  // console.log(newSearch);
  const showSearchResults = newSearch
    ? recipes.sort((a, b) => a.title.localeCompare(b.title)).filter(recipe =>
    recipe.title.toUpperCase().includes(newSearch.toUpperCase()))
    : recipes.sort((a, b) => a.title.localeCompare(b.title));


  return (
    <div>
      <h1>
        Recipe List
        <Link to="/recipes/new" className="btn btn-lg btn-primary float-right" style={{float: "right"}}>Create Recipe</Link>
      </h1>

      <div className="input-group float-right rounded">
        <div className="form-outline">
          <input type="search" id="form1" className="form-control" placeholder="Search" onChange={handleSearch} value={newSearch}/>
        </div>
        <button type="submit" className="btn btn-primary" onSubmit={handleSearch}>
          <i className="fas fa-search"></i>
        </button>
      </div>

      <hr/>

      <CardGroup>
      {showSearchResults.map(recipe => {
        return(
          <div key={recipe._id}>
            <Card style={{ width: '15rem', margin: "15px" }}>


              <div>
                {( () => {
                  if (recipe.typeOfRecipe == "Appetizer") {
                    return (
                      <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + '/appetizer.png'}
                      alt="Appetizer Image"
                      style={{width: "30vh"}}
                      />)
                  } else if (recipe.typeOfRecipe == "Entree") {
                    return (
                      <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + '/chicken-leg.png'}
                      alt="Entree Image"
                      style={{width: "30vh"}}
                      />)
                  } else if (recipe.typeOfRecipe == "Side") {
                    return (
                      <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + '/salad.png'}
                      alt="Side Image"
                      style={{width: "30vh"}}
                      />)
                  } else if (recipe.typeOfRecipe == "Dessert") {
                    return (
                      <Card.Img
                      variant="top"
                      src={process.env.PUBLIC_URL + '/cupcake.png'}
                      alt="Dessert Image"
                      style={{width: "30vh"}}
                      />
                    )
                  }
                })()}
              </div>

              <Card.Body>
                  <Card.Title><h2>{recipe.title}</h2> <h5>({recipe.typeOfRecipe})</h5></Card.Title>
                  <Card.Text>
                  </Card.Text>
                <Link to={`/recipes/${recipe._id}`}><Button variant="secondary">Go to recipe</Button></Link>
              </Card.Body>
            </Card>
          </div>
        )
      })}
      </CardGroup>
    </div>
  )
}

export default RecipeList;
