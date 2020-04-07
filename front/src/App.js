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
import getRessources from './utils/getRessources';
import {IntlProvider} from 'react-intl'; 
import NavBar from './../src/Components/NavBar/NavBar';

const cors = require("cors");
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

var fs = require('fs');

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      lang:"french",
      idLang:'fr',
      indexLang:0,
      fr:{},
      en:{}
    }
    console.log("1");
  }

  componentDidMount = () => {
   
/*     console.log("2");
    let data2 = await getRessources('homepage','header');

    let array_fr = [];
    let array_en = [];
    for(let i=0; i < data2.length; i++){
      if(data2[i].language === 'fr'){
        array_fr.push({"homepage.header.url":data2[i].url, "homepage.header.description":data2[i].description});
      }else if (data2[i].language === 'en'){
        array_en.push({"homepage.header.url":data2[i].url, "homepage.header.description":data2[i].description});
      }
    }

    this.setState({
      fr:array_fr,
      en:array_en
    }) */

  }


  getLanguage = async(lang_selected) => {
     let data = await getRessources("language", lang_selected);
     return data;
  }

  handleChangeLang = async (event) => {
    
    let lang_selected = event.target.options[event.target.selectedIndex].id;
    let data = await this.getLanguage(lang_selected);
     this.setState({
      lang:data,
      idLang:lang_selected
     /*  idLang:event.target.options[event.target.selectedIndex].id,
      indexLang:Number(event.target.value), */
    });
    //console.log("value :",array_lang[Number(event.target.value)]);
    //console.log("value :",Number(event.target.value));
    //console.log("id : ",event.target.options[event.target.selectedIndex].id);
  }


  render(){

    console.log("3");
    let { data } = this.props;
    const { lang, header, idLang, indexLang, fr, en} = this.state;
    //console.log("lang render : ",lang);
    //console.log("lang : ", idLang === 'fr' ? fr : en, " | id lang : ",idLang, fr, en );

    return (
      <div className="App">

        <IntlProvider locale={idLang}  messages={lang}>
          <div className="">
            <NavBar handleChangeLang={this.handleChangeLang}/>
          </div>
          <Switch>
            <Route exact path="/" component={ () => <Accueil handleChangeLang={this.handleChangeLang} />}/>
  {/*           <Route exact path="/Reference" component={Reference} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/Demonstration" component={Demonstration} />
            <Route exact path="/Admin" component={Admin} />
            <Route exact path="/Mention" component={Mention} />
            <Route exact path="/Partenaire" component={Partenaire} />
            <Route exact path={data.linkSolution} component={Solution}/> */}
          </Switch>
        </IntlProvider>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  data: state
});

export default connect(mapStateToProps)(App);
