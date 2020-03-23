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
          <label class="col-md-3 control-label" for="name">
            Société *
          </label>
          <div class="">
            <input
              id="name"
              name="name"
              type="text"
              placeholder=""
              class="form-control"
            ></input>
          </div>
          <div class="form-group">
            <label class="col-6 col-md-3 control-label" for="name">
              Nom *
            </label>
            <div class="">
              <input
                id="email"
                name="name"
                type="text"
                placeholder=""
                class="form-control"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label" for="prénom">
              Prénom
            </label>
            <div class="">
              <input
                id="email"
                name="prénom"
                type="text"
                placeholder=""
                class="form-control"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label" for="adresse">
              Adresse
            </label>
            <div class="">
              <input
                id="email"
                name="adresse"
                type="text"
                placeholder=""
                class="form-control"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label" for="telephone">
              Téléphone *
            </label>
            <div class="">
              <input
                id="email"
                name="tel"
                type="text"
                placeholder=""
                class="form-control"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label" for="email">
              Email *
            </label>
            <div class="">
              <input
                id="email"
                name="email"
                type="text"
                placeholder="ex:myname@example.fr"
                class="form-control"
              ></input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label" for="message">
              Description du besoin *
            </label>
            <div class="">
              <textarea
                class="form-control"
                id="message"
                name="message"
                placeholder=""
                rows="5"
              ></textarea>
            </div>
          </div>
          <label class="form-label form-label-top" id="label_18" for="input_18">
            {" "}
            Pièce jointe si nécessaire{" "}
          </label>
        </div>
        <input
          type="file"
          id="input_18"
          name="q18_pieceJointe"
          class="form-upload validate[upload]"
          data-file-accept="pdf, doc, docx, xls, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, jpg, jpeg, png, gif"
          data-file-maxsize="1024"
          data-file-minsize="0"
          data-file-limit="0"
          data-component="fileupload"
        ></input>

        <div class="form-group">
          <div class="col-md-12 text-right">
            <button type="submit" class="btn btn-secondary btn-lg">
              Soumettre
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPage;
