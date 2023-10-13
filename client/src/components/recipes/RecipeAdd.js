import React, { useContext, useEffect, useState } from "react";
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
  const [items, setItems] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [firstItem, setFirstItem] = useState('');
  const [secondItem, setSecondItem] = useState('')


  const initialValues = {
    typeOfRecipe: '',
    title: '',
    ingredients: [''],
    procedure: ['']
  }

  useEffect(() => {
    form.setFieldValue('ingredients', ingredients)
    form.setFieldValue('steps', steps)
  }, [form, ingredients, steps])

  const handleSubmit = async (params) => {
    try {
      params.user = user.id
      const response = await post('/api/recipes', params);
      navigate(`/recipes/${response.data._id}`);
    } catch (error) {
      console.log('error', error);
    }
  }

  const HandlePhotoText = (text) => {
    const array = text.split('e ');
    setItems(array)
  }

  const addIngredient = (ingredient) => {
    const newList = ingredients.concat([ingredient])
    setIngredients(newList)
  }

  const addStep = (step) => {
    const newList = steps.concat([step])
    setSteps(newList)
  }

  const removeItem = (array, item) => {
    const index = array.indexOf(item);
    if (index > -1) { // only splice array when item is found
      array.splice(index, 1); // 2nd parameter means remove one item only
    }
    return array
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
        }
      });
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      console.log(text);
      await worker.terminate();
      setIsUploading(false)
      //setPhotoText(text)
      setIsUploaded(true)
      HandlePhotoText(text)
    } catch (err) {
      setIsUploading(false)
      console.log(err)
    }
  }

  const handleDrop = (item1, item2) => {
    console.log(items)
    let newArray;
    if (items.indexOf(item1) === -1) {
      newArray = removeItem(items, item1)
    }
    if (items.indexOf(item2) === -1) {
      newArray = removeItem(items, item2)
    }
    setItems(newArray)
  }

  return (
    <div style={{ margin: 'auto', width: '60%' }}>
      <div style={{}}>
        <Title style={{ color: 'white', marginTop: '30px' }}>Create a Recipe</Title>
        <form onSubmit={() => { return false }}>
          <Card>
            <input type="file" id="myFile" name="filename" onChange={handleUploadPhoto} />
            {(isUploading || isUploaded) && (
              <Progress size={80} type="circle" percent={completionPercentage} />
            )}
          </Card>
        </form>
      </div>
      {isUploaded && items && (
        <>
          <Card style={{ whiteSpace: "pre-line", textAlign: 'left' }}>
          {console.log(items)}
            {items.map((item, i) => {
              return (
                <Input
                  draggable
                  onDragStart={() => setFirstItem(item)}
                  onDragOver={(e) => {
                    e.preventDefault()
                    setSecondItem(item)
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    handleDrop(firstItem, secondItem)
                    }}
                  value={item}
                  key={i}
                  addonAfter={(
                    <>
                      <Button
                        onClick={() => {
                          addIngredient(item)
                          const newList = removeItem(items, item)
                          setItems(newList)
                        }}
                        icon=<PlusOutlined />
                      >Add ingredient</Button>
                      <Button
                        onClick={() => {
                          addStep(item)
                          const newList = removeItem(items, item)
                          setItems(newList)
                        }}
                        icon=<PlusOutlined />
                      >Add step</Button>
                    </>
                  )}
                  placeholder="Item" />
              )
            })}
          </Card>
        </>
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
                  <Button type="dashed" onClick={() => add()} block icon=<PlusOutlined />>
                    Add an ingredient
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Card>
        <Title style={{ textAlign: 'left', color: 'white', margin: "30px 0 10px 0" }} level={3}>Preparation</Title>
        <Card>
          <Form.List name="steps">
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
