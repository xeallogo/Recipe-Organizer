import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Home-styles.css";

function Home() {
  return (
    <div className="jumbotron">
    <main role="main">

   <div className="jumbotron">
     <div className="container">
       <h1 className="display-3">Recipe Organizer</h1>
       <h4>Welcome to the app that keeps all your favorite recipes in one place.</h4>
       <p><a className="btn btn-secondary btn-lg" href="/recipes" role="button">Get started</a></p>
     </div>
   </div>

   <Carousel interval={2000} variant="dark" className="carouselContainer" >
  <Carousel.Item>
    <img
      className="rounded d-block carouselImage"
      src={process.env.PUBLIC_URL + '/carousel1.jpg'}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="rounded d-block carouselImage"
      src={process.env.PUBLIC_URL + '/carousel2.jpg'}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="rounded d-block carouselImage"
      src={process.env.PUBLIC_URL + '/carousel3.jpg'}
      alt="Third slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block carouselImage"
      src={process.env.PUBLIC_URL + '/carousel4.jpg'}
      alt="Third slide"
    />
  </Carousel.Item>
</Carousel>


 </main>
    </div>
  );
}

export default Home;
