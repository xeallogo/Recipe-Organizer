import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeInfo from './components/recipes/RecipeInfo';
import RecipeAdd from './components/recipes/RecipeAdd';
import RecipeEdit from './components/recipes/RecipeEdit';
import { Button, Layout, Menu } from 'antd';
import { primaryColor, secondaryColor } from './colors';
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
  return (
    <div>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Menu
            style={{ backgroundColor: secondaryColor, color: 'white' }}
            mode="horizontal"
            items={[
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
              }
            ]}
          >
          </Menu>
        </Header>
        <Content style={contentStyle}>
          <Routes>
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
