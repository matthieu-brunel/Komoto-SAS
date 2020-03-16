import React from 'react';
import './Accueil.css';
import NavBar from './../NavBar/NavBar'
import SpecialisationAccueil from './Specialisation/Specialisation';
import HeaderAccueil from './Header/Header';
import SavoirFaireAccueil from './Savoir-faire/Savoir-faire';
import SolutionAccueil from './SolutionsAccueil/SolutionAccueil';
import DemonstrationAccueil from './DemonstrationAccueil/Demonstration';
import ReferenceAccueil from './ReferencesAccueil/Reference'
import Footer from "./../Footer/Footer"



function Accueil() {
  return (
    <div className="">
      <NavBar />
    {/*<HeaderAccueil />*/}
      <SavoirFaireAccueil />
      <SpecialisationAccueil />
      <SolutionAccueil />
      <DemonstrationAccueil />
      <ReferenceAccueil />
      <Footer />
    </div>
  );
}

export default Accueil;
