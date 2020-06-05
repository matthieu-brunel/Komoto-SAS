import React, { Component } from 'react';
import NavBarAdmin from './../NavBarAdmin/NavBar';
import ShowroomText from './ShowroomText';
import ShowroomModel from './ShowroomModel';



const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class HomeShowroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayText: false,
            displayModel: false,
            arrayLang: [],
            langSelected: "fr"
        }
    }

    handleClickPart = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {

            case "text":
                this.setState({ displayText: true, displayModel: false });
                break;

            case "model":
                this.setState({ displayModel: true, displayText: false });
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
        const { arrayLang, handleChangeLang } = this.state;

        let options = [];
        for (let i in arrayLang) {
            options.push(<option key={i} id={arrayLang[i].locale}>{arrayLang[i].locale}</option>)
        }
        return (
            <div>
                <div>
                    <NavBarAdmin />
                </div>
                <div className="pb-3 pt-1">
                    <h1>Showroom</h1>
                </div>
                <div className="pt-3 pb-3">
                    <button type="button" className="btn btn-primary mr-2" id="text" onClick={this.handleClickPart}>Texte</button>
                    <button type="button" className="btn btn-primary mr-2" id="model" onClick={this.handleClickPart}>Model</button>
                    <select className="form-control " id="select-lang" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
                        {options}
                    </select>
                </div>
 
                <div>
                    {this.state.displayText && <ShowroomText locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}
                    {this.state.displayModel && <ShowroomModel locale={this.state.langSelected} arrayLang={this.state.arrayLang} />}
               </div>


            </div>
        )
    }
}

export default HomeShowroom;