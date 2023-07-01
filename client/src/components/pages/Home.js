import React from 'react';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { tertiaryColor } from '../../colors';
const { Title } = Typography;

function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ textAlign: 'center' }}>
      <Title style={{ color: 'white' }}>Recipe Book</Title>
      <Title style={{ color: 'white' }} level={3}>
        Welcome to the app that keeps all your favorite recipes in one place!
      </Title>
      <Button
        type='primary link'
        size='large'
        onClick={() => navigate('/recipes')}
        style={{backgroundColor: tertiaryColor}}
      >
        Get started
      </Button>
    </div>
  );
}

export default Home;
