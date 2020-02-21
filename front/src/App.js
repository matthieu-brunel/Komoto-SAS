import React from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from './Components/Admin/Admin';


function App() {
  return (
    <div className="App">
      <Accueil/>
      <Solution/>
      <Reference/>
      <Contact/>
      <Demonstration/>
      <Admin/>
    </div>
  );
}

export default App;
