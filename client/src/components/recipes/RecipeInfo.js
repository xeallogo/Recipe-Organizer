import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Modal, Typography } from "antd";
import { tertiaryColor } from "../../colors";
const { Title } = Typography;

const RecipeInfo = (props) => {
  const [recipe, setRecipe] = useState({});
  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${_id}/`);
        setRecipe(response.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    getRecipe();
  }, [props, _id]);

  const handleDelete = () => {
    Modal.warning({
      okText: 'Yes',
      closable: true,
      title: 'Wait!',
      content: 'Are you sure you want to delete this recipe?',
      onOk: async () => {
        try {
          await axios.delete(`/api/recipes/${_id}/`);
          navigate("/recipes");
        } catch (error) {
          console.error(error);
        }
      },
      onCancel: () => { Modal.destroyAll() }
    })
  }

  const ingredientList = recipe.ingredients;
  const procedureList = recipe.procedure;

  return (
    <div>
      <Title style={{ color: 'white', marginTop: '30px' }} >{recipe.title}</Title>
      <Title style={{ color: 'white' }} level={3}>{recipe.typeOfRecipe}</Title>
      <div style={{ margin: 'auto', width: '80%' }}>
        <Title level={3} style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }}>Ingredients</Title>
        <ul>
          {ingredientList?.map((ingredient, i) =>
            <li style={{ textAlign: 'left' }} key={i}>{ingredient}</li>
          )}
        </ul>
        <Title level={3} style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }}>Preparation</Title>
        <ol>
          {procedureList?.map((step, i) =>
            <li style={{ textAlign: 'left' }} key={i}>{step}</li>
          )}
        </ol>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <Button
          type='link primary'
          onClick={() => navigate(`/recipes/${_id}/edit`)}
          style={{ margin: '5px', color: 'white', backgroundColor: tertiaryColor }}
        >
          Edit
        </Button>
        <Button
          type='link primary'
          onClick={handleDelete}
          style={{ margin: '5px', color: 'white', backgroundColor: 'red' }}
        >
          Delete
        </Button>
        <Button
          type='link primary'
          onClick={() => navigate(`/recipes`)}
          style={{ margin: '5px', color: 'white', backgroundColor: 'grey' }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default RecipeInfo;
