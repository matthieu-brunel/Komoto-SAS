import NavBarAdmin from '../NavBarAdmin/NavBar';
import React, { Component } from 'react';
import getRessources from './../../../utils/getRessources';
import SolutionAdmin from './SolutionAdmin';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




class SolutionHomeAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {

            arrayLang: [],
            langSelected: "fr"

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
        this.setState({ langSelected: seletedLang });
    }


    render() {

        let options = [];
        for (let i in this.state.arrayLang) {

            options.push(<option key={i} id={this.state.arrayLang[i].locale}>{this.state.arrayLang[i].locale}</option>)
        }
console.log(options)
        return (
            <div>
                <select class="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
                    {options}
                </select>
                <SolutionAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} />

            </div>
        );
    }
}

export default SolutionHomeAdmin;