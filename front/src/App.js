import React, { Component } from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from "./admin"
import { Switch, Route } from 'react-router-dom';
import Mention from "./Components/Mention/Mention";
import Partenaire from './Components/partenaires/Partenaire';
import NavBar from './Components/NavBar/NavBar.jsx';
import { connect } from "react-redux";
import { GET_ARRAY_NAME_SOLUTION, GET_ID_LANG } from "./../src/Components/actionTypes";


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class App extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      idLang:'fr',
      array_name_solution:[]
    }
  }


  handleChangeLang = async (event) => {

    let idLang = event.target.options[event.target.selectedIndex].id;
    this.props.dispatch({ type: GET_ID_LANG.type, idLang })

     this.setState({
      idLang:idLang
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
    let data_lang = await(await(fetch(url, options))).json();

    //Chargement de toutes les solutions
    url = "http://localhost:5000/api/solution/all";
    let solutionsAll = await(await(fetch(url, options))).json();
    
    //récupération des section uniques ex :[ketra, kroco, kheops]
    let sectionSolution = solutionsAll.map(element => element.section);
    let section_filtered = sectionSolution.filter((section, index) => sectionSolution.lastIndexOf(section) === index);

    //array qui va recueillir toutes les solutions
    let array_solution = [];
  

    for(let i in section_filtered){
      let url = `http://localhost:5000/api/solution?section=${section_filtered[i]}&locale=${data_lang[0].locale}`;
      
      array_solution.push(await(await(fetch(url, options))).json()) 
    }
  
    this.props.dispatch({ type: GET_ARRAY_NAME_SOLUTION.type, section_filtered});
    this.props.dispatch({ type: GET_ID_LANG.type, idLang });

    this.setState({array_name_solution:section_filtered});
        
  }


  componentDidMount = () => {
    //localStorage.setItem('lang', this.state.idLang);
    this.getStarted();
  } 


  render(){


    //console.log("FROM REDUCER : ",this.props.data_store.num_lang);
    const { idLang, num_lang, navbar } = this.state;

    return (
      <div className="App">
        {/* <div className="">
          <NavBar  navbar_data={navbar} locale={idLang} handleChangeLang={this.handleChangeLang}/>
        </div> */}

        <Switch>
          <Route exact path="/" component={ () => <Accueil  locale={idLang} handleClickSolution={this.handleClickSolution}/>}/>
          <Route path="/Reference" component={ () => <Reference num_lang={num_lang} locale={idLang}/>} />
          <Route path="/Contact" component={ () => <Contact locale={idLang}/>} />
          <Route path="/Demonstration" component={ () => <Demonstration locale={idLang}/>} />
          <Route path="/Mention" component={Mention} />
          <Route path="/Partenaire" component={Partenaire} />
          <Route path={`/solution/:id`} component={ (props) => <Solution {...props} {...this.state}/>} />
   
        </Switch>

        <div>
          <Admin/>
        </div>
      </div>
    );
  }

}



const mapStateToProps = state => ({
  data_store: state
});

export default connect(mapStateToProps)(App);

