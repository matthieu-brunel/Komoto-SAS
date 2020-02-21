import React from 'react';
import './Reference.css';
import ReferenceComponents from './ReferenceComponents/ReferenceComponents';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function Reference() {
  return (
    <div className="">
      <NavBar />
      <ReferenceComponents/>
      <Footer />
    </div>
  );
}

export default Reference;