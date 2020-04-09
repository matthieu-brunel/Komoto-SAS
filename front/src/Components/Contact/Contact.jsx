import React from "react";
import "./Contact.css";
import NavBar from "./../NavBar/NavBar";
import ContactPage from "./ContactPage/ContactPage";
import Footer from "./../Footer/Footer";

function Contact(props) {
  const { locale } = props;
 
  return (
    <div className="sticky-wrap">
      <div>
        <ContactPage locale={locale}/>
      </div>
      <div className="sticky-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
