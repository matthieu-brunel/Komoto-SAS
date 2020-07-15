import React, { Component } from 'react';
import NavBarAdmin from './../NavBarAdmin/NavBar';
import HeaderAdmin from './HeaderAdmin';
import SpecialisationAdmin from './SpecialisationAdmin';
import SavoirFaireAdmin from './SavoirFaireAdmin';
import ShowroomAdmin from "./ShowroomAdmin";

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class HomepageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayHeader: false,
            displaySpec: false,
            displaySavoirFaire: false,
            displayShowroom: false,
            arrayLang: [],
            langSelected: "fr"
        }
    }





    handleClickPart = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {

            case "header":
                this.setState({ displayHeader: true, displaySpec: false,displayReference: false, displaySolution: false, displaySavoirFaire: false, displayShowroom: false });
                break;

            case "specialisation":
                this.setState({ displaySpec: true, displayHeader: false,displayReference: false, displaySolution: false, displaySavoirFaire: false, displayShowroom: false });
                break;

            case "savoirFaire":
                this.setState({ displaySpec: false, displayHeader: false,displayReference: false, displaySolution: false, displaySavoirFaire: true, displayShowroom: false });
                break;

            case "showroom":
                this.setState({ displaySpec: false, displayShowroom: true,displayReference: false, displaySolution: false, displayHeader: false, displaySavoirFaire: false });
                break;

            default:
                break;
        }
    }


    getAllLang = async () => {
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
        let data = await (await (fetch(url))).json();
        this.setState({ arrayLang: data });
      }
    
      componentDidMount = () => {
          this.getAllLang();
      }
    
      handleChangeLang = (event) => {
    
          let seletedLang = event.target.options[event.target.options.selectedIndex].id;
          console.log(event.target.options[event.target.options.selectedIndex]);
          this.setState({ langSelected: seletedLang });
      }

    render() {
        const { arrayLang } = this.state;

        let options = [];
        for (let i in arrayLang) {
            options.push(<option key={i} id={arrayLang[i].locale}>{arrayLang[i].locale}</option>)
        }
        return (
            <div className="text-center">
                <div>
                    <NavBarAdmin />
                </div>
                <div className="pb-3 pt-1">
                    <h1>Homepage</h1>
                </div>
                <div className="pt-3 pb-3">
                    <button type="button" className="btn btn-primary mr-2" id="header" onClick={this.handleClickPart}>Header</button>
                    <button type="button" className="btn btn-primary mr-2" id="savoirFaire" onClick={this.handleClickPart}>savoir-faire</button>
                    <button type="button" className="btn btn-primary mr-2" id="specialisation" onClick={this.handleClickPart}>specialisation</button>
                    <button type="button" className="btn btn-primary mr-2" id="showroom" onClick={this.handleClickPart}>showroom</button>
                    <select className="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
                        {options}
                    </select>
                </div>
 
                <div>
                    {this.state.displayHeader && <HeaderAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}
                    {this.state.displaySpec && <SpecialisationAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}
                    {this.state.displaySavoirFaire && <SavoirFaireAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}
                    {this.state.displayShowroom && <ShowroomAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}   
                </div>


            </div>
        )
    }
}

export default HomepageAdmin;