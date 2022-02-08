import React from 'react';
import {BrowserRouter as Router, Route, NavLink, Routes} from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import RecipeList from './components/recipes/RecipeList';
import RecipeInfo from './components/recipes/RecipeInfo';
import RecipeAdd from './components/recipes/RecipeAdd';
import RecipeEdit from './components/recipes/RecipeEdit';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
    <div className="main-wrapper">
      <Router>
        <Navigation />
        <div className="container">
          <Main />
        </div>
      </Router>
    </div>
    <Footer />

    </div>
  );
}

function Navigation() {
  return(

    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">

      <div className='container'>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink exact="true" className="nav-link"  to="/" style={{fontSize: "3vh"}}>Home</NavLink></li>
          <li className="nav-item"><NavLink exact="true" className="nav-link"  to="/recipes" style={{fontSize: "3vh"}}>Recipes</NavLink></li>
        </ul>
      </div>
    </nav>
    </div>

  );
}

function Main() {
  return(
    <Routes>
      <Route path="/recipes" element={<RecipeList />} />
      <Route path="/recipes/new" element={<RecipeAdd />} />
      <Route path="/recipes/:_id" element={<RecipeInfo />} />
      <Route path="/recipes/:_id/edit" element={<RecipeEdit />} />
      <Route exact path="/" element={<Home />} />
    </Routes>

  );
}

export default App;
