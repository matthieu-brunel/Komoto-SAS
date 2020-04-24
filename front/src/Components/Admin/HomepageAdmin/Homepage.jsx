import React, { Component } from 'react';
import NavBarAdmin from './../NavBarAdmin/NavBar';
import HeaderAdmin from './HeaderAdmin';
import SpecialisationAdmin from './SpecialisationAdmin';


class HomepageAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayHeader:false,
            displaySpec:false,
        }
    }

    handleClickPart = (event) => {
        console.log(event.target.id);
         switch (event.target.id) {

            case "header":
                this.setState({displayHeader:true, displaySpec:false});
                break;

            case "specialisation":
                this.setState({displaySpec:true, displayHeader:false});
                break;
        
            default:
                break;
        }
    }
    render(){
        return(
            <div>
                <div>
                    <NavBarAdmin />
                </div>
                <div>
                    <h1>Homepage</h1>
                </div>
                <div>
                    <button type="button" class="btn btn-primary" id="header" onClick={this.handleClickPart}>Header</button>
                    <button type="button" class="btn btn-primary">savoir-faire</button>
                    <button type="button" class="btn btn-primary" id="specialisation" onClick={this.handleClickPart}>specialisation</button>
                    <button type="button" class="btn btn-primary">showroom</button>
                </div>

                <div>
                   {this.state.displayHeader && <HeaderAdmin />}
                   {this.state.displaySpec && <SpecialisationAdmin />}
                </div>

            </div>
        )
    }
}

export default HomepageAdmin;