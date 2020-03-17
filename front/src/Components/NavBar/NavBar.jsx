import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import './NavBar.css';



const NavBar = (props) => {
const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen); // navbar
  
  
    return (
<div className="">
      <Navbar  color="white" light expand="xl">
        <NavbarBrand className="pl-3" href="/"><img className="" src="" alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar className="all pr-5" >
         
          <Nav className="  " navbar>
            <NavItem >
              <NavLink href="/" className=""><li>Accueil</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Solution" className=""><li>Solution</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Reference" className=""><li>Reference</li></NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink href="/Contact" className=""><li>Contact</li></NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Demonstration" className=""><li>Showroom</li></NavLink>
            </NavItem>
         
          </Nav>
        
        </Collapse>

      </Navbar>

    </div>
    );
  }
  




export default NavBar;
