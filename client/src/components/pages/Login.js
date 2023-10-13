import React, { useContext } from 'react';
import axios from 'axios';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { tertiaryColor } from '../../colors';
import { UserContext } from '../../App';
const { Title } = Typography;

const LoginPage = ({setLoggedIn}) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (params) => {
    try {
      const response = await axios.post('/api/login', params);
      if (response.status === 200) {
        setUser(response.data)
        setLoggedIn(true)
        navigate('/recipes')
      }
    } catch (error) {
      setLoggedIn(false)
      console.log('error', error);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ color: 'white', marginTop: '20px' }}>Login</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        style={{margin: 'auto'}}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter a username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter a password!' }]}
        >
          <Input placeholder="Password" />
        </Form.Item>
        <Form.Item >
          <Button style={{ margin: '20px 5px', backgroundColor: tertiaryColor }} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button style={{ margin: '20px 5px', backgroundColor: tertiaryColor }} type="primary" danger onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginPage;
