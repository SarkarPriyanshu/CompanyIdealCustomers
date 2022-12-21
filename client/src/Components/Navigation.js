import React from 'react';
import Logo from '../logo.svg';
import { Link } from "react-router-dom";


function Navigation() {
  return (
    <nav className="App-nav">
      <a className='App-menu-logo' href='/'>
        <img src={Logo} alt="SVG logo"/>
      </a>
      <ul className='App-nav-menu'>
        <li><Link to='/logistic'>Logistic Regressor</Link></li>
        <li><Link to='/binary'>Binary Tree Classifier</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
