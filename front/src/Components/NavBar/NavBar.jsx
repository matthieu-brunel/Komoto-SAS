import React, { useState, useEffect } from 'react';
import $ from "jquery";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import './NavBar.css';
import { HashLink as Link } from "react-router-hash-link";
import { connect } from "react-redux";
import getRessources from './../../utils/getRessources';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ navbar: [] });
  const [num_lang, setNum_lang] = useState({ navbar: [] });
  const [check, setCheck] = useState({ isHome:true });

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
      let data_lang = await (await (fetch(url, options))).json();
      let num_lang = data_lang.map(lang => lang.locale);

      setData(data);
      setNum_lang(num_lang);

    }

    fetchData();
  }, [locale]);

  $(document).ready(function () {
    $(document).click(function (event) {
      var clickover = $(event.target);
      var _opened = $(".navbar-collapse").hasClass("show");
      if (_opened === true && !clickover.hasClass("navbar-toggler")) {
        $(".navbar-toggler").click();
      }
    });
  });

  const padding_nav_item = 1;
  const margin_right = 5;
  return (
    <div className="div-container-navbar">
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" ></NavbarBrand>
        <Link to="/#container-header" className="p-3"><img className="" src="/images/logo.png" alt="logo komoto sas" /></Link>
        <NavbarToggler onClick={toggle} />

        <Collapse isOpen={isOpen} navbar className="all" >
          <Nav className="navbar" navbar>
            <NavItem className={`p-${padding_nav_item} pl-${margin_right}`}>
              <Link to="/#container-header" >{data[0]}</Link>
            </NavItem >
            <NavItem className={`p-${padding_nav_item} pl-${margin_right}`}>
              <Link to="/#SolutionAccueil" >{data[1]}</Link>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pl-${margin_right}`}>
              <Link to="/#ReferenceAccueil" >{data[2]}</Link>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pl-${margin_right}`}>
              <Link to="/Contact" >{data[3]}</Link>
            </NavItem>
            <NavItem className={`p-${padding_nav_item} pl-${margin_right}`}>
              <Link to="/Demonstration" >{data[4]}</Link>
            </NavItem>
          </Nav>
          <div className="div-select pl-5">
            <select className="form-control" id="selectLang" onChange={handleChangeLang}>
              <option id={locale} style={{ display: "none" }}>{locale}</option>
              {num_lang.length > 0 && num_lang.map((element, index) => <option key={index} id={element} value={index}>{element}</option>)}
            </select>
          </div>

        </Collapse>
      </Navbar>

    </div>
  );
}

export default NavBar;
