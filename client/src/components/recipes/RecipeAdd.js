import React from "react";
import { post } from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Button, Select, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { tertiaryColor } from "../../colors";
const { Title } = Typography;

const RecipeAdd = (props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialValues = {
    typeOfRecipe: '',
    title: '',
    ingredients: [''],
    procedure: ['']
  }

  const handleSubmit = async (params) => {
    try {
      const response = await post('/api/recipes', params);
      navigate(`/recipes/${response.data._id}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div style={{ margin: 'auto', width: '60%' }}>
      <Title style={{ color: 'white', marginTop: '30px' }}>Create a Recipe</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Title style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }} level={3}>Type of Recipe</Title>
        <Form.Item
          name="typeOfRecipe"
          rules={[{ required: true, message: 'Please select a recipe type!' }]}
          placeholder="Type of recipe"
        >
          <Select >
            <Select.Option value="Appetizer">Appetizer</Select.Option>
            <Select.Option value="Entree">Entree</Select.Option>
            <Select.Option value="Side">Side</Select.Option>
            <Select.Option value="Dessert">Dessert</Select.Option>
          </Select>
        </Form.Item>
        <Title style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }} level={3}>Recipe Title</Title>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input placeholder="Title" />
        </Form.Item>
        <Title style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }} level={3}>Ingredients</Title>
        <Card>
          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: '15px' }} >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Missing ingredient" }]}
                    >
                      <Input
                        addonAfter={(
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                          />
                        )}
                        placeholder="Ingredient" />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add an ingredient
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
        <Title style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }} level={3}>Preparation</Title>
        <Card>
          <Form.List name="procedure">
            {(fields, { add, remove }) => (
              <>
              {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ marginBottom: '15px' }} >
                    <Form.Item
                      {...restField}
                      name={name}
                      rules={[{ required: true, message: "Missing step" }]}
                    >
                      <Input
                        addonAfter={(
                          <MinusCircleOutlined
                            onClick={() => remove(name)}
                          />
                        )}
                        placeholder="Step" />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add a step
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
        <Form.Item >
          <Button style={{ margin: '20px 5px', backgroundColor: tertiaryColor }} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ margin: '20px 5px', backgroundColor: 'gray' }} type="primary" danger onClick={() => navigate("/recipes")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecipeAdd;
