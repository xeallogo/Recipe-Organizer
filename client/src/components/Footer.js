import React from "react";
import "./footer-styles.css";
const today = new Date();

const Footer = () => (
  <div className="footer">
  <p>Copyright © {today.getFullYear()} Alex Gool</p>
  <p><a href="https://www.flaticon.com/free-icons/cooking" title="cooking icons">Icons created by justicon, Freepik - Flaticon</a></p>
  </div>
);

export default Footer;
