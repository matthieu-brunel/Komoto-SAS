import React from 'react';
import "./user.css";
import NavBarAdmin from '../NavBarAdmin/NavBar';





function User() {
  return (
    <div className="">
      <div>
        <NavBarAdmin/>
      </div>
      <p className="bg-admin">Utilisateur</p>
    </div>
  );
}

export default User;