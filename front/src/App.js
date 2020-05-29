import React, { Component } from 'react';
import './App.css';
import Clients from './clients';
import User from './Components/Admin/users/User';
import Login from './Components/Admin/Login/Login';
import { Switch, Route } from 'react-router-dom';
import SolutionAdmin from './Components/Admin/SolutionAdmin/SolutionAdmin';
import ReferenceAdmin from './Components/Admin/ReferenceAdmin/ReferenceAdmin';
import HomeShowroom from './Components/Admin/DemonstrationAdmin/HomeShowroom';
import ContactAdmin from "./Components/Admin/ContactAdmin/ContactAdmin"
import Mail from './Components/Admin/Historique/Mail';
import HomepageAdmin from './Components/Admin/HomepageAdmin/Homepage';
import Langues from './Components/Admin/Langues/Langues';
import Seo from './Components/Admin/SEO/Seo';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;
const REACT_APP_SERVER_ADDRESS_FULL_CLIENT = process.env.REACT_APP_SERVER_ADDRESS_FULL_CLIENT;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        arrayLang: [],
        langSelected: "fr"
    }
}

render() {
    return (
      <div className="App">

        <div>
          <Clients />
        </div>

        <Switch>
           <Route path="/Login" component={Login} />
          <Route path="/user" component={User} /> 
          <Route path="/HomepageAdmin" component={HomepageAdmin} />
          <Route path="/SolutionAdmin" component={SolutionAdmin} />
          <Route path="/ContactAdmin" component={ContactAdmin} />
          <Route path="/ReferenceAdmin" component={ReferenceAdmin} />
          <Route path="/HomeShowroom" component={HomeShowroom} />
          <Route path="/Langues" component={Langues} />
          <Route path="/Mail" component={Mail} />
          <Route path="/Seo" component={Seo} />
        </Switch>

      </div>
    );
  }

}



export default App;

