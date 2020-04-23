import React, { Component } from 'react';
import './App.css';
import Clients from './clients';
import User from './Components/Admin/users/User';
import { Switch, Route } from 'react-router-dom';
import SolutionAdmin from './Components/Admin/SolutionAdmin/SolutionAdmin';
import ReferenceAdmin from './Components/Admin/ReferenceAdmin/ReferenceAdmin';
import DemonstrationAdmin from './Components/Admin/DemonstrationAdmin/DemonstrationAdmin';
import ContactAdmin from "./Components/Admin/ContactAdmin/ContactAdmin"
import Mail from './Components/Admin/Historique/Mail';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
const REACT_APP_SERVER_ADDRESS_FULL_CLIENT = process.env.REACT_APP_SERVER_ADDRESS_FULL_CLIENT;
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    return (
      <div className="App">

        <div>
          <Clients />
        </div>
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/SolutionAdmin" component={SolutionAdmin} />
          <Route path="/ContactAdmin" component={ContactAdmin} />
          <Route path="/ReferenceAdmin" component={ReferenceAdmin} />
          <Route path="/DemonstrationAdmin" component={DemonstrationAdmin} />
          <Route path="/Mail" component={Mail} />
        </Switch>

      </div>
    );
  }

}



export default App;

