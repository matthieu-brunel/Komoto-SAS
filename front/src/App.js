import React from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import SolutionKetra from './../src/Components/Solution/ketra/SolutionKetra';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from './Components/Admin/Admin';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/Solution-ketra" component={SolutionKetra} />
        <Route exact path="/Reference" component={Reference} />
        <Route exact path="/Contact" component={Contact} />
        <Route exact path="/Demonstration" component={Demonstration} />
        <Route exact path="/Admin" component={Admin} />
      </Switch>
    </div>
  );
}

export default App;
