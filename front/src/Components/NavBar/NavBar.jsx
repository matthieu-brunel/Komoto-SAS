import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";
import "./NavBar.css";
import { HashLink as NavLink } from "react-router-hash-link";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen); // navbar
  const { handleChangeLang, datanavbar } = props;
  console.log("Fonction :", datanavbar);

  return (
    <div className="test3">
      <Navbar color="white" light expand="xl">
        <NavbarBrand className="pl-3" href="/">
          <img className="" src="" alt="logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="all pr-5">
          <Nav className="  " navbar>
            <NavItem>
              <NavLink to="/" className="">
                <li className="link-nav pr-5">{datanavbar[0]}</li>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#SolutionAccueil" className="">
                <li className="link-nav pr-5">{datanavbar[1]}</li>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/#ReferenceAccueil" className="">
                <li className="link-nav pr-5">{datanavbar[2]}</li>
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink to="/Contact" className="">
                <li className="link-nav pr-5">{datanavbar[3]}</li>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/Demonstration" className="">
                <li className="link-nav pr-5">{datanavbar[4]}</li>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <div class="form-group" onChange={handleChangeLang}>
          <select class="form-control" id="exampleFormControlSelect1">
            <option id="fr" value="0">
              fr
            </option>
            <option id="en" value="1">
              en
            </option>
          </select>
        </div>
      </Navbar>
    </div>
  );
};

export default NavBar;
