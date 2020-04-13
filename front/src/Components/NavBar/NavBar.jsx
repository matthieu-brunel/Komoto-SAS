import React, { useState, useEffect } from 'react';
import { GET_NUM_LANG } from './../actionTypes';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import './NavBar.css';
import { HashLink as NavLink } from "react-router-hash-link";
import { connect } from "react-redux";
import getRessources from './../../utils/getRessources';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({navbar:[]});
  const [num_lang, setNum_lang] = useState({navbar:[]});

  const toggle = () => setIsOpen(!isOpen); // navbar
  const { handleChangeLang, locale } = props;

  
 
 //chargement des données de concernant navbar
 //useEffet est l'équivalent du componentDidMount
   useEffect(() => {  
    const fetchData = async () => {
      const options = {
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
      }
      const result = await getRessources("navbar", null, locale);
      let data = result[0].name.split(",");
      //Chargement des données de la table language 
      let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
      let data_lang = await(await(fetch(url, options))).json();
      let num_lang = data_lang.map(lang => lang.locale);
      
      setData(data);
      setNum_lang(num_lang);

    }
    
    fetchData();
  }, [locale]);

  const padding_nav_item = 1;
  const margin_right = 4;
  return (
    <div className="test3">
      
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" ></NavbarBrand>
        <NavLink to="/" className="p-3"><img className="" src="" alt="logo" /></NavLink>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar className="all" >
          <Nav className="  " navbar>
            <NavItem className={`p-${padding_nav_item} pr-${margin_right}`}>
              <NavLink to="/" >{data[0]}</NavLink>
            </NavItem >
            <NavItem className={`p-${padding_nav_item} pr-${margin_right}`}>
              <NavLink to="/#SolutionAccueil" >{data[1]}</NavLink>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pr-${margin_right}`}>
              <NavLink to="/#ReferenceAccueil" >{data[2]}</NavLink>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pr-${margin_right}`}>
              <NavLink to="/Contact" >{data[3]}</NavLink>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pr-${margin_right} pb-3`}>
              <NavLink to="/Demonstration" >{data[4]}</NavLink>
            </NavItem>

            <select className="form-control" id="selectLang" onChange={handleChangeLang}>
              <option id={locale} style={{display:"none"}}>{locale}</option>
              {num_lang.length > 0 && num_lang.map((element, index) => <option key={index} id={element} value={index}>{element}</option>)}
            </select>
          </Nav>
        </Collapse>
      </Navbar>

    </div>
  );
}


const mapStateToProps = state => ({
  data_store: state
});



export default connect(mapStateToProps)(NavBar);
