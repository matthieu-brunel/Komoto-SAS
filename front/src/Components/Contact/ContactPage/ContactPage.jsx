import React, { Component } from "react";
//import Recaptcha from "react-recaptcha";
import "./ContactPage.css";
import getRessources from "../../../utils/getRessources";
import { Link } from "react-router-dom";
const SERVER_ADRESS = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ContactPage extends Component {
  constructor() {
    super();
    this.state = {
      societe: "",
      nom: "",
      prenom: "",
      adresse: "",
      telephone: "",
      email: "",
      message: "",
      isSent: false,
      confirmationSent: "",
      document: null,
      isLoading: false,
      isSent: false,
      isActive: true,
      messageIsSent: "",
      isTooHeavy: false,
      message_too_heavy: "Format non pris en charge ou fichier trop lourd."
    };

    //this.verifyCallback = this.verifyCallback.bind(this);
    //this.RecaptchapLoader = this.RecaptchapLoader.bind(this);
  }
  handlerChange = event => {
    
    switch (event.target.name) {
      case "societe":
        this.setState({ societe: event.target.value });
        break;
      case "nom":
        this.setState({ nom: event.target.value });
        break;
      case "prenom":
        this.setState({ prenom: event.target.value });
        break;
      case "telephone":
        this.setState({ telephone: event.target.value });
        break;
      case "adresse":
        this.setState({ adresse: event.target.value });
        break;
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "message":
        this.setState({ message: event.target.value });
        break;
      default:
        break;
    }
  };

  handlerUploadFile = event => {
    const format_type = [
      "application/pdf",
      "application/doc",
      "application/docx",
      "application/xls",
      "application/csv",
      "application/txt",
      "application/rtf",
      "application/html",
      "application/zip",
      "audio/mp3",
      "video/wma",
      "video/mpg",
      "video/flv",
      "video/avi",
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/gif"
    ];

    let file = event.target.files[0] ? event.target.files[0] : "";

    if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
     
      this.setState({ document: file });
    } else {
      this.setState({ isTooHeavy: true });
      event.target.value = "";
      this.setState({isActive:true});
    }
  };

  handleCloseModal = () => {
    this.setState({ isActive: false, isTooHeavy: false });
  };

  handleCloseModalSentContact = () => {
    window.location.reload();
  };

  handlerSubmit = event => {
    event.preventDefault();

    let file = this.state.document !== null ? this.state.document.name : "";

    const content = {
      societe: this.state.societe,
      nom: this.state.nom,
      prenom: this.state.prenom,
      telephone: this.state.telephone,
      adresse: this.state.adresse,
      email: this.state.email,
      message: this.state.message,
      document: file
    };

    this.setState({ isLoading: true });

    if (this.state.document !== null) {
      const data = new FormData();
      data.append("file", this.state.document);

      fetch(SERVER_ADRESS + "/api/uploadcontact", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        redirect: "follow",
        referrer: "no-referrer",
        body: data
      }).then(res => res.json());
    }

    fetch(SERVER_ADRESS + "/api/contact", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(content)
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          isSent: true,
          confirmationSent: res.message,
          societe: "",
          nom: "",
          prenom: "",
          telephone: "",
          adresse: "",
          email: "",
          message: "",
          messageIsSent: res.message,
          isLoading: false,
          document: null,
          isSent: true,
          isActive: true
        });


      }

        
      );
  };

  messageSentMail = () => {
    return (
      <div class="alert alert-secondary" role="alert">
        {this.state.confirmationSent}
      </div>
    );
  };

  render() {
    const {
      societe,
      nom,
      prenom,
      adresse,
      telephone,
      email,
      message,
      document
    } = this.state;
    console.log("societe : ", societe);
    console.log("nom : ", nom);
    console.log("prenom : ", prenom);
    console.log("adresse : ", adresse);
    console.log("telephone : ", telephone);
    console.log("email : ", email);
    console.log("message : ", message);
    console.log("document: ", document);

    return (
      <div>
        <form onSubmit={this.handlerSubmit}>
          <div className="border-secondary rounded-0">
            <div className="card-header p-0">
              <div className="bg-secondary text-white text-center py-2">
                <h3>
                  <p className="pt-4">Nous contacter</p>
                </h3>
              </div>
            </div>
          </div>
          <div className="container">
            <label className="col-md-3 control-label" for="societe">
              societe *
            </label>
            <div className="">
              <input
                id="societe"
                name="societe"
                type="text"
                placeholder=""
                className="form-control"
                value={this.state.societe}
                onChange={this.handlerChange}
                required="required"
                data-error="societe is required."
              ></input>
            </div>
            <div className="form-group">
              <label className="col-6 col-md-3 control-label" for="name">
                Nom *
              </label>
              <div className="">
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={this.state.nom}
                  onChange={this.handlerChange}
                  required="required"
                  data-error="nom is required."
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label" for="prenom">
                prenom
              </label>
              <div className="">
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={this.state.prenom}
                  onChange={this.handlerChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label" for="adresse">
                Adresse
              </label>
              <div className="">
                <input
                  id="adresse"
                  name="adresse"
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={this.state.adresse}
                  onChange={this.handlerChange}
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label" for="telephone">
                telephone *
              </label>
              <div className="">
                <input
                  id="telephone"
                  name="telephone"
                  type="text"
                  placeholder=""
                  className="form-control"
                  value={this.state.telephone}
                  onChange={this.handlerChange}
                  required="required"
                  data-error="telephone is required."
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label" for="email">
                Email *
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="ex:myname@example.fr"
                  className="form-control"
                  value={this.state.email}
                  onChange={this.handlerChange}
                  required="required"
                  data-error="email is required."
                ></input>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label" for="message">
                Description du besoin *
              </label>
              <div className="">
                <textarea
                  className="form-control"
                  value={this.state.message}
                  onChange={this.handlerChange}
                  id="message"
                  name="message"
                  placeholder=""
                  rows="5"
                  required="required"
                  data-error="message is required."
                ></textarea>
              </div>
            </div>

            {/* [début:popup sent contact] quand le formulaire s'est correctement envoyé */}
            {this.state.isSent && (
          <div
            className={`${
              this.state.isActive ? "div-active" : "div-desactive"
            }`}
          >
            <span className="text-alert-success">{this.state.messageIsSent}</span>{" "}
            <button type="button" className="btn btn-success btn-sm" onClick={this.handleCloseModalSentContact}>ok</button></div>
        )}
             {/* [fin:popup sent contact] */}


            {/* [début:popup error] si le format est pas pris en charge ou si le fichier est trop lourd */}
            {this.state.isTooHeavy && (
          <div
            className={`${
              this.state.isActive ? "div-active-error" : "div-desactive-error"
            }`}
          >
            <span className="text-alert-error">
              {this.state.message_too_heavy}
            </span>
            {" "}<button type="button" className="btn btn-danger btn-sm" onClick={this.handleCloseModal}>ok</button>
          </div>
        )}
          {/* [fin:popup error] */}


            <label
              className="form-label form-label-top"
              id="label_18"
              for="input_18"
            >
              {" "}
              Pièce jointe si nécessaire{" "}
            </label>
          </div>
          <input
            type="file"
            name="file"
            className="form-upload validate[upload]"
            onChange={this.handlerUploadFile}
          ></input>

          {this.state.isLoading ? (
            <button className="btn btn-secondary btn-lg" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Envoi en cours
            </button>
          ) : (
            <button type="submit" className="btn btn-secondary btn-lg">
              Soumettre
            </button>
          )}
        </form>
{/*         <div class="alert alert-success" role="alert">
          This is a danger alert—check it out!
        </div> */}
      </div>
    );
  }
}

export default ContactPage;
