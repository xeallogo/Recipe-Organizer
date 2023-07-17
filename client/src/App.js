import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeInfo from './components/recipes/RecipeInfo';
import RecipeAdd from './components/recipes/RecipeAdd';
import RecipeEdit from './components/recipes/RecipeEdit';
import { Button, Layout, Menu } from 'antd';
import { primaryColor, secondaryColor } from './colors';
import LoginPage from './components/pages/Login';
import SignupPage from './components/pages/Signup';
const { Content, Header, Footer } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: secondaryColor,
  minHeight: '50px'
};
const contentStyle = {
  textAlign: 'center',
  height: '100%',
  color: '#fff',
  backgroundColor: primaryColor,
  flex: 1,
  display: 'flex', // overwrite the original 'block' setting
  alignItems: 'center', // vertical
  justifyContent: 'center' // horizontal
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: secondaryColor,
  minHeight: '50px'
};

const layoutStyle = {
  display: 'flex',
  minHeight: '100vh',
  margin: 0,
};

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navigation />
      </Router>
    </div>
  );
}

const Navigation = () => {
  const today = new Date();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('/api/loggedin')
      .then(res => {
        if (res.status === 200) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        setLoggedIn(false)
    });
  }, []);

  const handleLogout = async () => {
    try {
      setLoggedIn(false)
      await axios.get('/api/logout', {});
      navigate('/login')
    } catch (error) {
      console.log('error', error);
    }
  }

  const loggedInItems = [
    {
      label: (
        <Button
          type='link'
          onClick={() => navigate('/')}
          style={{ color: 'white' }}
        >
          Home
        </Button>
      ),
    },
    {
      label: (
        <Button
          type='link'
          onClick={() => navigate('/recipes')}
          style={{ color: 'white' }}
        >
          Recipes
        </Button>
      ),
    },
    {
      label: (
        <Button
          type='link'
          onClick={handleLogout}
          style={{ color: 'white' }}
        >
          Logout
        </Button>
      ),
    }
  ]

  return (
    <div>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Menu
            style={{ backgroundColor: secondaryColor, color: 'white' }}
            mode="horizontal"
            items={loggedIn ? loggedInItems : []}
          >
          </Menu>
        </Header>
        <Content style={contentStyle}>
          <Routes>
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn}/>} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/recipes/new" element={<RecipeAdd />} />
            <Route path="/recipes/:_id" element={<RecipeInfo />} />
            <Route path="/recipes/:_id/edit" element={<RecipeEdit />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Content>
        <Footer style={footerStyle}>
          <div className="footer">
            <p>Copyright © {today.getFullYear()} Alex Gool</p>
            <p><a style={{ color: 'white' }} href="https://www.flaticon.com/free-icons/cooking" title="cooking icons">Icons created by justicon, Freepik - Flaticon</a></p>
          </div>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
