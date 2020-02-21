import React from 'react';
import './Solution.css';
import HeaderSolution from './Header/HeaderSolution';
import SolutionText from './SolutionText/SolutionText';
import SolutionImage from './SolutionImage/SolutionImage';



function Solution() {
  return (
    <div className="">
      <NavBar />
      <HeaderSolution/>
      <SolutionText/>
      <SolutionImage/>
      <Footer />
    </div>
  );
}

export default Solution;