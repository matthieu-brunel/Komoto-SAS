import React from "react";
import "./Contact.css";
import ContactPage from "./ContactPage/ContactPage";
import Footer from "./../Footer/Footer";

function Contact(props) {
  const { locale, language_id } = props;
  console.log(props);
 
  return (
    <div className="sticky-wrap">
      <div>
        <ContactPage locale={locale} language_id={language_id}/>
      </div>
      <div className="sticky-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
