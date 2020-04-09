import React, { Component } from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from './Components/Admin/Admin';
import { Switch, Route } from 'react-router-dom';
import Mention from "./Components/Mention/Mention";
import Partenaire from './Components/partenaires/Partenaire';
import NavBar from './Components/NavBar/NavBar.jsx';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class App extends Component{
  _isMounted = false;
  constructor(props){
    super(props);
    this.state = {
      idLang:'fr',
      num_lang:[],
      navbar: [],
      link_solution:"",
      name_solution:""
    }
  }


  handleChangeLang = async (event) => {
  

    let lang_selected = event.target.options[event.target.selectedIndex].id;
    localStorage.setItem('data_lang', JSON.stringify(lang_selected));


     this.setState({
      idLang:lang_selected
    });
  }

  handleClickSolution = (event) => {
    //const { data_store, locale } = this.props;
    let name_solution = event.target.id.toLowerCase();
    let link_solution = `/solution-${name_solution.toLowerCase()}`;
    let data = {
      "name_solution":name_solution,
      "link_solution":link_solution
    }
    //this.props.dispatch({type: GET_NAME_SOLUTION_SELECTED.type, name_solution,link_solution});
    localStorage.setItem('data_store', JSON.stringify(data));
    this.setState({
      link_solution:link_solution,
      name_solution:name_solution
    });
  }

  componentDidMount = async() => {
    //console.log("componentDidMount App.js");
    this._isMounted = true;
    //Chargement de la langue : locale => fr ou en
    let get_data_lang = await JSON.parse((await localStorage.getItem('data_lang')));

    const options = {
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
    }

    //Chargement des données de la table language 
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    let data_lang = await(await(fetch(url, options))).json();
    //console.log(data_lang);


    
    let num_lang = data_lang.map(lang => lang.locale);



    if(get_data_lang !== null){
      this.setState({
        idLang:get_data_lang,
        num_lang:num_lang
      });
    }else{
      this.setState({
        num_lang:num_lang
      });
    }
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }


  render(){
    
    const { idLang, num_lang, navbar, link_solution, name_solution} = this.state;

    return (
      <div className="App">
        <div className="">
          <NavBar  navbar_data={navbar} num_lang={num_lang} locale={idLang} handleChangeLang={this.handleChangeLang}/>
        </div>
        <Switch>
          <Route exact path="/" component={ () => <Accueil  locale={idLang} handleClickSolution={this.handleClickSolution}/>}/>
          <Route exact path="/Reference" component={ () => <Reference num_lang={num_lang} locale={idLang}/>} />
          <Route exact path="/Contact" component={ () => <Contact locale={idLang}/>} />
          <Route exact path="/Demonstration" component={ () => <Demonstration locale={idLang}/>} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/Mention" component={Mention} />
          <Route exact path="/Partenaire" component={Partenaire} />
          <Route exact path={link_solution} component={ () => <Solution name_solution={name_solution} num_lang={num_lang} locale={idLang} />}/>
        </Switch>
      </div>
    );
  }

}


export default App;
