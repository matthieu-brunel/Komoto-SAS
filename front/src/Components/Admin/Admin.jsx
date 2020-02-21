import React from 'react';
import NavBarAdmin from './NavBarAdmin/NavBar';
import SolutionAdmin from './SolutionAdmin/SolutionAdmin';
import ReferenceAdmin from './ReferenceAdmin/ReferenceAdmin';
import DemonstrationAdmin from './DemonstrationAdmin/DemonstrationAdmin';
import ContactAdmin from './ContactAdmin/ContactAdmin';





function Admin() {
  return (
    <div className="">
      <NavBarAdmin/>
      <SolutionAdmin/>
      <ReferenceAdmin/>
      <DemonstrationAdmin/>
      <ContactAdmin/>
    </div>
  );
}

export default Admin;