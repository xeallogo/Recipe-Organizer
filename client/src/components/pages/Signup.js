import React from 'react';
import { post } from 'axios';
import { Button, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { tertiaryColor } from '../../colors';
const { Title } = Typography;

const SignupPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (params) => {
    try {
      const response = await post('/api/signup', params);
      if (response.status === 201) {
        navigate(`/recipes`);
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ color: 'white', marginTop: '20px' }}>Sign Up</Title>

      <Form
        form={form}
        onFinish={handleSubmit}
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
          <Button style={{ margin: '20px 5px', backgroundColor: 'gray' }} type="primary" danger onClick={() => navigate("/login")}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default SignupPage;
