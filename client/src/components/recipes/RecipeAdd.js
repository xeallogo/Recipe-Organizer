import React, { useContext, useState } from "react";
import { post } from 'axios';
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Button, Select, Card, Progress } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { tertiaryColor } from "../../colors";
import { UserContext } from "../../App";
import { createWorker } from "tesseract.js";
const { Title } = Typography;

const RecipeAdd = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const [isUploading, setIsUploading] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [completionPercentage, setCompletionPercentage] = useState(0)
  const [photoText, setPhotoText] = useState('')

  const initialValues = {
    typeOfRecipe: '',
    title: '',
    ingredients: [''],
    procedure: ['']
  }

  const handleSubmit = async (params) => {
    try {
      params.user = user.id
      const response = await post('/api/recipes', params);
      navigate(`/recipes/${response.data._id}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  const handleUploadPhoto = async (e) => {
    try {
      setIsUploading(true)
      const files = Array.from(e.target.files)
      const file = files[0]
      const worker = await createWorker({
        logger: m => {
          if (m.progress === 1) {
            if (m.status === 'loading tesseract core') {
              setCompletionPercentage(10)
            }
            if (m.status === 'initialized tesseract') {
              setCompletionPercentage(20)
            }
            if (m.status === 'loaded language traineddata') {
              setCompletionPercentage(30)
            }
            if (m.status === 'initialized api') {
              setCompletionPercentage(40)
            }
            if (m.status === 'recognizing text') {
              setCompletionPercentage(100)
            }
          }
          if (m.status === 'recognizing text' && m.progress !== 1) {
            const n = Math.round(40 + (m.progress * 60))
            setCompletionPercentage(n)
          }
          // console.log(m)
        }
      });
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      console.log(text);
      await worker.terminate();
      setIsUploading(false)
      setPhotoText(text)
      setIsUploaded(true)
    } catch (err) {
      setIsUploading(false)
      console.log(err)
    }
  }

  return (
    <div style={{ margin: 'auto', width: '60%' }}>
      <div style={{}}>
        <Title style={{ color: 'white', marginTop: '30px' }}>Create a Recipe</Title>
        <form onSubmit={() => { return false }}>
        <Card>
          <input type="file" id="myFile" name="filename" onChange={handleUploadPhoto}/>
          {(isUploading || isUploaded) && (
            <Progress size={80} type="circle" percent={completionPercentage} />
          )}
          </Card>
        </form>
      </div>
      {isUploaded && (
        <><Card>{photoText}</Card></>
      )}
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
