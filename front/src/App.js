import React, { Component } from 'react';
import './App.css';
import Accueil from './Components/Accueil/Accueil'
import Solution from './Components/Solution/Solution';
import Reference from './Components/Reference/Reference';
import Contact from './Components/Contact/Contact';
import Demonstration from './Components/Demonstration/Demonstration';
import Admin from './Components/Admin/Admin';
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import Mention from "./Components/Mention/Mention";
import Partenaire from './Components/partenaires/Partenaire';
import NavBar from './../src/Components/NavBar/NavBar';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      idLang:'fr'
    }
  }


  handleChangeLang = async (event) => {
    
    let lang_selected = event.target.options[event.target.selectedIndex].id;
    localStorage.setItem('data_lang', JSON.stringify(lang_selected));
     this.setState({
      idLang:lang_selected
    });
  }

  componentWillMount = async() => {
    let get_data_lang = await JSON.parse((await localStorage.getItem('data_lang')));

    if(get_data_lang !== null){
      this.setState({idLang:get_data_lang});
    } 
  }


  render(){
    
    let { data } = this.props;
    const { idLang} = this.state;
    console.log(idLang);
    return (
      <div className="App">
        <div className="">
          <NavBar locale={idLang} handleChangeLang={this.handleChangeLang}/>
        </div>
        <Switch>
          <Route exact path="/" component={ () => <Accueil  locale={idLang} handleChangeLang={this.handleChangeLang} />}/>
          <Route exact path="/Reference" component={ () => <Reference locale={idLang} />} />
          <Route exact path="/Contact" component={Contact} />
          <Route exact path="/Demonstration" component={Demonstration} />
          <Route exact path="/Admin" component={Admin} />
          <Route exact path="/Mention" component={Mention} />
          <Route exact path="/Partenaire" component={Partenaire} />
          <Route exact path={data.linkSolution} component={ () => <Solution locale={idLang} handleChangeLang={this.handleChangeLang}/>}/>
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  data: state
});

export default connect(mapStateToProps)(App);
