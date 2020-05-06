import React, { Component } from 'react';
import NavBarAdmin from './../NavBarAdmin/NavBar';
import HeaderAdmin from './HeaderAdmin';
import SpecialisationAdmin from './SpecialisationAdmin';
import SavoirFaireAdmin from './SavoirFaireAdmin';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class HomepageAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            displayHeader:false,
            displaySpec:false,
            displaySavoirFaire:false,
            arrayLang:[],
            langSelected:"fr"
        }
    }



    handleClickPart = (event) => {
        console.log(event.target.id);
         switch (event.target.id) {

            case "header":
                this.setState({displayHeader:true, displaySpec:false, displaySavoirFaire:false});
                break;

            case "specialisation":
                this.setState({displaySpec:true, displayHeader:false, displaySavoirFaire:false});
                break;

            case "savoirFaire":
                this.setState({displaySpec:false, displayHeader:false, displaySavoirFaire:true});
                break;
        
            default:
                break;
        }
    }

    getAllLang = async() => {
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
        let data = await(await(fetch(url))).json();
        this.setState({arrayLang:data});
    }

    componentDidMount = () => {
        this.getAllLang();
    }

    handleChangeLang = (event) => {
        let seletedLang = event.target.options[event.target.options.selectedIndex].id;
        this.setState({langSelected:seletedLang});
    }


    render(){

        let options = [];
        for(let i in this.state.arrayLang){
                                        
            options.push(<option key={i} id={this.state.arrayLang[i].locale}>{this.state.arrayLang[i].locale}</option>)
        }

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
                    <button type="button" class="btn btn-primary" id="savoirFaire" onClick={this.handleClickPart}>savoir-faire</button>
                    <button type="button" class="btn btn-primary" id="specialisation" onClick={this.handleClickPart}>specialisation</button>
                    <button type="button" class="btn btn-primary">showroom</button>
                    <select class="form-control" id="exampleFormControlSelect1" style={{width:"6%", display:'inline-block'}} onChange={this.handleChangeLang}>
                        {options}
                    </select>
                </div>

                <div>
                   {this.state.displayHeader && <HeaderAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang}/>}
                   {this.state.displaySpec && <SpecialisationAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang}/>}
                   {this.state.displaySavoirFaire && <SavoirFaireAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang}/>}
                </div>

            </div>
        )
    }
}

export default HomepageAdmin;