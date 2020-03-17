import React, { Component } from 'react';
import './SolutionKetra.css';
import HeaderSolutionKetra from './Header/HeaderSolutionKetra';
import SolutionTextKetra from './SolutionText/SolutionTextKetra';
import SolutionImageKetra from './SolutionImage/SolutionImageKetra';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';


class SolutionKetra extends Component{
    render(){
        return (
            <div className="">
              <NavBar />
              <HeaderSolutionKetra/>
              <SolutionTextKetra/>
              <SolutionImageKetra/>
              <Footer />
            </div>
          );
    }

}

export default SolutionKetra;