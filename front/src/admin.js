/* import React, { Component } from 'react';
import './App.css';
import User from './Components/Admin/users/User';
import { Switch, Route } from 'react-router-dom';
import NavBarAdmin from './Components/Admin/NavBarAdmin/NavBar';
import SolutionAdmin from './Components/Admin/SolutionAdmin/SolutionAdmin';
import ReferenceAdmin from './Components/Admin/ReferenceAdmin/ReferenceAdmin';
import HomeShowroom from './Components/Admin/DemonstrationAdmin/HomeShowroom';
import ContactAdmin from "./Components/Admin/ContactAdmin/ContactAdmin"
import Mail from './Components/Admin/Historique/Mail';
import Seo from './Components/Admin/SEO/Seo';

class Admin extends Component {

    render() {

        return (
            <div className="">
                <div className="">
                    <NavBarAdmin />
                </div>
                <Switch>
                    <Route path="/user" component={User} />
                    <Route path="/SolutionAdmin" component={SolutionAdmin} />
                    <Route path="/ContactAdmin" component={ContactAdmin} />
                    <Route path="/ReferenceAdmin" component={ReferenceAdmin} />
                    <Route path="/Showroom" component={HomeShowroom} />
                    <Route path="/Mail" component={Mail} />
                    <Route path="/Seo" component={Seo} />
                </Switch>

            </div>
        );
    }

}


export default Admin; */