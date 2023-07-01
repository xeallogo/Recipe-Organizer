import React from "react";
import { post } from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Button, Select, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
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
    navigate(`/recipes/${params._id}`)
  }

  return (
    <div>
      <Title>Create a Recipe</Title>

      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Title level={3}>Type of Recipe</Title>
        <Form.Item
          name="typeOfRecipe"
          rules={[{ required: true, message: 'Please select a recipe type!' }]}
        >
          <Select>
            <Select.Option value="Appetizer">Appetizer</Select.Option>
            <Select.Option value="Entree">Entree</Select.Option>
            <Select.Option value="Side">Side</Select.Option>
            <Select.Option value="Dessert">Dessert</Select.Option>
          </Select>
        </Form.Item>
        <Title level={3}>Recipe Title</Title>
        <Form.Item
          name="title"
          rules={[{ required: true, message: 'Please enter a title!' }]}
        >
          <Input />
        </Form.Item>
        <Title level={3}>Ingredients</Title>
        <Card>
          <Form.List name="ingredients">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={name} rules={[{ required: true, message: "Missing ingredient" }]}>
                      <Input placeholder="Ingredient" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
        <Title level={3}>Procedure</Title>
        <Card>
          <Form.List name="procedure">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                    <Form.Item {...restField} name={name} rules={[{ required: true, message: "Missing step" }]}>
                      <Input placeholder="Step" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button type="primary" danger onClick={() => navigate("/recipes")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default RecipeAdd;
