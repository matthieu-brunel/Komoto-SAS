import React, { Component } from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import { Switch, Route } from 'react-router-dom';
import Mention from "./Components/Mention/Mention";
import Partenaire from './Components/partenaires/Partenaire';
import NavBar from './Components/NavBar/NavBar.jsx';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


let prefix = "http://localhost:3000";
let urlAdmin = [prefix + "/SolutionAdmin",
prefix + "/ContactAdmin",
prefix + "/ReferenceAdmin",
prefix + "/HomeShowroom",
prefix + "/Mail",
prefix + "/Login",
prefix + "/user",
prefix + "/HomepageAdmin",
prefix + "/Seo",
prefix + "/Langues"];


let monUrl = window.location.href;


class Client extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idLang: 'FR',
            array_name_solution: [],
        }
    }


    handleChangeLang = async (event) => {

        let idLang = event.target.options[event.target.selectedIndex].id;

        this.setState({
            idLang: idLang
        });
    }


    getStarted = async () => {

        const { idLang } = this.state;

        const options = {
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }

        //Chargement des données de la table language 
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
        await (await (fetch(url, options))).json();

        //Chargement de toutes les solutions
        url = REACT_APP_SERVER_ADDRESS_FULL + "/api/solution?section=solution&language_id=" + idLang;
        let solutionsAll = await (await (fetch(url, options))).json();
        console.log("test", solutionsAll);
        let arraySolution = [];

        for (let obj of solutionsAll) {
            let url = JSON.parse(obj.url);
            let description = JSON.parse(obj.description);
            obj.url = url;
            obj.description = description;
            arraySolution.push(obj);
        }


        //récupération des section uniques ex :[ketra, kroco, kheops]
        let sectionSolution = solutionsAll.map(element => element.section);
        let section_filtered = sectionSolution.filter((section, index) => sectionSolution.lastIndexOf(section) === index);


        this.setState({ array_name_solution: section_filtered, solution: arraySolution });

    }


    componentDidMount = () => {
        this.getStarted();
    }


    render() {


        //console.log("FROM REDUCER : ",this.props.data_store.num_lang);
        const { idLang, num_lang, navbar } = this.state;

        return (
            <div className="">
                {!urlAdmin.includes(monUrl) ?
                    <div className="">
                         <NavBar navbar_data={navbar} locale={idLang} handleChangeLang={this.handleChangeLang} />
                     </div>
                    : null}
                <Switch>
                    <Route exact path="/" component={() => <Accueil locale={idLang} handleClickSolution={this.handleClickSolution} />} />
                    <Route path="/Reference" component={() => <Reference num_lang={num_lang} locale={idLang} />} />
                    <Route path="/Contact" component={() => <Contact locale={idLang} />} />
                    <Route path="/Demonstration" component={() => <Demonstration locale={idLang} />} />
                    <Route path="/Mention" component={Mention} />
                    <Route path="/Partenaire" component={Partenaire} />
                    <Route path={`/solution/:id`} component={(props) => <Solution {...props} {...this.state} />} />
                </Switch>


            </div>
        );
    }

}


export default Client;

