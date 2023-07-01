import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { tertiaryColor } from '../../colors';
import { SearchOutlined } from '@ant-design/icons';
import { Card, Button, Typography, Input, Avatar } from 'antd';
const { Title } = Typography;
const { Meta } = Card;

const getIcon = (recipe) => {
  if (recipe.typeOfRecipe === "Appetizer") {
    return process.env.PUBLIC_URL + '/appetizer.png'
  } else if (recipe.typeOfRecipe === "Entree") {
    return process.env.PUBLIC_URL + '/chicken-leg.png'
  } else if (recipe.typeOfRecipe === "Side") {
    return process.env.PUBLIC_URL + '/salad.png'
  } else if (recipe.typeOfRecipe === "Dessert") {
    return process.env.PUBLIC_URL + '/cupcake.png'
  }
}

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [newSearch, setNewSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.log('error', error);
      }
    };
    getRecipes();
  }, []);

  const showSearchResults = newSearch
    ? recipes.sort((a, b) => a.title.localeCompare(b.title)).filter(recipe =>
      recipe.title.toUpperCase().includes(newSearch.toUpperCase()))
    : recipes.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div style={{ width: '80%' }}>
      <Title style={{ color: 'white', marginTop: '15px' }}>Your Book</Title>
      <div style={{ display: 'flex' }}>
        <Input.Search
          allowClear
          onSearch={(value) => setNewSearch(value)}
          style={{ width: '40%' }}
          placeholder='Search for a recipe by title'
          size='large'
          enterButton={(
            <Button type="primary" style={{ backgroundColor: tertiaryColor}}>
              <SearchOutlined/>
            </Button>
          )}
        />
        <Button
          type='primary'
          size='large'
          style={{ marginLeft: 'auto', backgroundColor: tertiaryColor }}
          onClick={() => navigate('/recipes/new')}
        >
          Create Recipe
        </Button>
      </div>
      <hr />
      <Card style={{ margin: '40px 0', backgroundColor: 'lightgrey' }}>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {showSearchResults.map(recipe => {
            return (
              <div onClick={() => navigate(`/recipes/${recipe._id}`)} key={recipe._id}>
                <Card
                  hoverable
                  style={{ display: 'flex', margin: '10px' }}
                >
                  <Meta
                    avatar={<Avatar size="large" src={getIcon(recipe)} />}
                    title={recipe.title}
                  />
                </Card>
              </div>
            )
          })}
        </div>
      </Card>

    </div>
  )
}

export default RecipeList;
