import React, { useState, useEffect } from 'react';
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




const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({navbar:[]});

  const toggle = () => setIsOpen(!isOpen); // navbar
  const { handleChangeLang, locale, num_lang } = props;

  
 
 //chargement des données de concernant navbar
 //useEffet est l'équivalent du componentDidMount
  useEffect(() => {  
    const fetchData = async () => {
      const result = await getRessources("navbar", null, locale);
      let data = result[0].name.split(",");
      setData(data);
    }
    
    fetchData();
  }, [locale]);




  //console.log(locale);
  return (
    <div className="test3">
      
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" href="/"><img className="" src="" alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="all pr-5" >
          <Nav className="  " navbar>
            <NavItem >
              <NavLink to="/" className="p-3">{data[0]}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#SolutionAccueil" className="p-3">{data[1]}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#ReferenceAccueil" className="p-3">{data[2]}</NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/Contact" className="p-3">{data[3]}</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Demonstration" className="p-3">{data[4]}</NavLink>
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
