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
          <div class="border-secondary rounded-0">
            <div class="card-header p-0">
              <div class="bg-secondary text-white text-center py-2">
                <h3>
                  <p>Nous contacter</p>
                </h3>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactPage;
