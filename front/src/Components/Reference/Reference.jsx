import React from 'react';
import './Reference.css';
import ReferenceComponents from './ReferenceComponents/ReferenceComponents';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function Reference() {
  return (
    <div className="sticky-wrap">
      <NavBar />
      <ReferenceComponents/>
     <div className="sticky-footer">
      <Footer />
      </div>
    </div>
  );
}

export default Reference;