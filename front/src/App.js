import React, { Component } from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from './Components/Admin/Admin';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";

class App extends Component{

  render(){
    const { data } = this.props;
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Accueil}/>
          <Route exact path={data.linkSolution} component={ () => <Solution nameSolution={data.solutionSelected} />}/>
          <Route exact path="/Reference" component={Reference} />
          <Route exact path="/Contact" component={Contact} />
          <Route exact path="/Demonstration" component={Demonstration} />
          <Route exact path="/Admin" component={Admin} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  data: state
});

export default connect(mapStateToProps)(App);
