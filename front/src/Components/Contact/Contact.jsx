import React from "react";
import "./Contact.css";
import NavBar from "./../NavBar/NavBar";
import ContactPage from "./ContactPage/ContactPage";
import Footer from "./../Footer/Footer";

function Contact() {
  return (
    <div className="">
      <div className="sticky-wrap">
        <NavBar />
      </div>
      <ContactPage />

      <Footer />
    </div>
  );
}

export default Contact;
