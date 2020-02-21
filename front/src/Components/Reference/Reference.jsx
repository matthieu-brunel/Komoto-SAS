import React from 'react';
import './Reference.css';
import ReferenceComponents from './ReferenceComponents/ReferenceComponents';

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