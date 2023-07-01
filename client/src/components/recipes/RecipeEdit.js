import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Button, Card, Form, Input, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const RecipeEdit = (props) => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${_id}`);
        form.setFieldsValue(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    getRecipe();
  }, [props, _id, form]);

  const handleSubmit = async (params) => {
    try {
      await axios.patch(`/api/recipes/${_id}`, params);
      navigate(`/recipes/${_id}`);
    } catch (error) {
      console.log(error);
    }
    navigate(`/recipes/${params._id}`)
  }

  return (
    <div>
      <Title>Edit a Recipe</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="_id"
          hidden
        >
          <input type="hidden" />
        </Form.Item>
        <Title level={3}>Type of Recipe</Title>
        <Form.Item
          name="typeOfRecipe"
          rules={[{ required: true, message: 'Please select a recipe type!' }]}
        >
          <Select>
            <Select.Option value="appetizer">Appetizer</Select.Option>
            <Select.Option value="entree">Entree</Select.Option>
            <Select.Option value="side">Side</Select.Option>
            <Select.Option value="dessert">Dessert</Select.Option>
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
                  <div key={key} style={{ marginBottom: 8 }} align="baseline">
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
                  <div key={key} style={{ marginBottom: 8 }} align="baseline">
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

export default RecipeEdit;
