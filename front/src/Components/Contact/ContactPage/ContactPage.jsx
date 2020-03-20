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
          <div className="row">
            <div className="col-lg-8 col-lg-offset-2">
              <form id="contact-form" method="post" action="" role="form">
                <div className="message"></div>
                <div className="controls"></div>
              </form>
              <div className="col-md-6">
                <div className="form-group">
                  <label for="form-société">Votre société *</label>
                  <input
                    id="form-société"
                    type="text"
                    name="société"
                    class="form-control"
                    placeholder="rentrer le nom de votre société *"
                    requiered="requiered"
                    data-errorr="société is required"
                  ></input>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="form-name">Nom *</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder="rentrer votre nom *"
                  requiered="requiered"
                  data-errorr="nom is required"
                ></input>
              </div>
            </div>
            <div class="dropdown">
              <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Genre
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                  Mr
                </a>
                <a class="dropdown-item" href="#">
                  Mme
                </a>
                <a class="dropdown-item" href="#">
                  Mlle
                </a>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="form-prenom">Prénom</label>
                <input
                  id="form-prenom"
                  type="text"
                  name="prenom"
                  class="form-control"
                  placeholder="rentrer votre prénom"
                  requiered="requiered"
                  data-errorr="prénom is required"
                ></input>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="form-name">Fonction</label>
                <input
                  id="form-name"
                  type="text"
                  name="name"
                  class="form-control"
                  placeholder=""
                  requiered="requiered"
                  data-errorr="société is required"
                ></input>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="form-tel">Téléphone *</label>
                <input
                  id="form-tel"
                  type="text"
                  name="tel"
                  class="form-control"
                  placeholder="rentrer votre numéro de téléphone"
                  requiered="requiered"
                  data-errorr="téléphone is required"
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="form-adresse">Adresse</label>
                <input
                  id="form-adresse"
                  type="text"
                  name="adresse"
                  class="form-control"
                  placeholder="rentrer votre adresse "
                  requiered="requiered"
                  data-errorr="adresse is required"
                ></input>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="form-code-postal">Code postal</label>
                <input
                  id="form-code-postal"
                  type="text"
                  name="code-postal"
                  class="form-control"
                  placeholder="rentrer votre code postal"
                  requiered="requiered"
                  data-errorr="code postal is required"
                ></input>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="form-ville">Ville</label>
                <input
                  id="form-ville"
                  type="text"
                  name="ville"
                  class="form-control"
                  placeholder="rentrer votre ville"
                  requiered="requiered"
                  data-errorr="ville is required"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPage;
