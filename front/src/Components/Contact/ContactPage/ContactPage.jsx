import React, { Component } from "react";
import "./ContactPage.css";
import getRessources from "../../../utils/getRessources";
import { Link } from "react-router-dom";

class ContactPage extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <form action="mail" method="post">
          <div className="border-secondary rounded-0">
            <div className="card-header p-0">
              <div className="bg-secondary text-white text-center py-2">
                <h3>
                  <p>Nous contacter</p>
                </h3>
              </div>
            </div>
          </div>
        </form>
        <div className="container">
          <label className="col-md-3 control-label" for="name">
            Société *
          </label>
          <div className="">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=""
              className="form-control"
            ></input>
          </div>
          <div className="form-group">
            <label className="col-6 col-md-3 control-label" for="name">
              Nom *
            </label>
            <div className="">
              <input
                id="email"
                name="name"
                type="text"
                placeholder=""
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label" for="prénom">
              Prénom
            </label>
            <div className="">
              <input
                id="email"
                name="prénom"
                type="text"
                placeholder=""
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label" for="adresse">
              Adresse
            </label>
            <div className="">
              <input
                id="email"
                name="adresse"
                type="text"
                placeholder=""
                className="form-control"
              ></input>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-3 control-label" for="telephone">
              Téléphone *
            </label>
            <div className="">
              <input
                id="email"
                name="tel"
                type="text"
                placeholder=""
                className="form-control"
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
                id="message"
                name="message"
                placeholder=""
                rows="5"
              ></textarea>
            </div>
          </div>
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
          id="input_18"
          name="q18_pieceJointe"
          className="form-upload validate[upload]"
          data-file-accept="pdf, doc, docx, xls, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif"
          data-file-maxsize="1024"
          data-file-minsize="0"
          data-file-limit="0"
          data-component="fileupload"
        ></input>

        <div className="form-group">
          <div className="col-md-12 text-right">
            <button type="submit" classNamen="btn btn-secondary btn-lg">
              Soumettre
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPage;
