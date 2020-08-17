import React, { Component } from 'react';
/* import "./ContactAdmin.css"; */
import AjoutContact from './AjoutContact';
import DeleteContact from './DeleteContact';

import NavBarAdmin from '../NavBarAdmin/NavBar';
import ModifierContact from "./ModifierContact";



const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ContactAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: [],
      titreSection: "",
      specSelected: [],
      titreAccueil: "",


      titreSpec: "",
      description: "",
      arrayDescription: [],
      urlImage: "",
      altImage: "",
      nameImage: "",
      refIdImage: null,
      document: null,

      addDescription: "",
      formToDelete: null,
      isTooHeavy: false,
      message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
      isActive: true,

      idToEdit: null,
      formToEdit: [],
      arrayLang: [],
      langSelected: "FR",
      idLang: null,
      ContactAdmin: [],
      openEditReference: false,
      openAddContact: false,
      arrayName: []

    }

  }

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

      this.setState({ document: file, urlImage: REACT_APP_SERVER_ADDRESS_FULL + "/images/" + file.name, nameImage: file.name });
    } else {
      this.setState({ isTooHeavy: true });
      event.target.value = "";
      this.setState({ isActive: true });
    }
  };


  handleChangeInput = (event) => {
    console.log(event.target.id);
    switch (event.target.id) {
      case "titre-section":
        this.setState({ titreSection: event.target.value });
        break;

      case "titre-spec-admin":
        this.setState({ titreSpec: event.target.value });
        break;

      case "titre-Accueil":
        this.setState({ titreAccueil: event.target.value });
        break;

      case "addDescription-spec-admin":
        this.setState({ addDescription: event.target.value });
        break;

      case "url-image-spec-admin":
        this.setState({ urlImage: event.target.value });
        break;

      case "alt-image-spec-admin":
        this.setState({ altImage: event.target.value });
        break;

      case "name-image-spec-admin":
        this.setState({ nameImage: event.target.value });
        break;

      case "refId-image-spec-admin":
        this.setState({ refIdImage: event.target.value });
        break;

      default:
        break;
    }
  }


  handleChangeLang = (event) => {
    let seletedLang = event.target.options[event.target.options.selectedIndex].id;
    this.setState({ langSelected: seletedLang });
    this.getStartedContactAdmin();
    this.getAllLang();
  }

  getAllLang = async () => {
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    let data = await (await (fetch(url))).json();
    console.log(data);
    let language_id = null;

    for (let i = 0; i < data.length; i++) {
      for (let [, value] of Object.entries(data[i])) {
        if (this.state.langSelected === value) {
          language_id = data[i].id;
        }
      }
    }

    this.setState({
      arrayLang: data,
      idLang: language_id
    });
  }


  componentDidMount = () => {
    this.getAllLang();
    this.getStartedContactAdmin();
  }

  getStartedContactAdmin = async () => {
    let arrayName;
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/formulaire?section=contact&language_id=' + this.state.idLang;
    const data = await (await (fetch(url))).json();
    console.log(data);
    arrayName = data.length > 0 && data[0].name.split(",");
    this.setState({ ContactAdmin: data, arrayName: arrayName });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.langSelected !== this.state.langSelected) {
      this.setState({ contact: "", specSelected: "", titreSection: "" });
      this.getStartedContactAdmin();
      this.closeModalModificationContact();
    } else if (prevState.idLang !== this.state.idLang) {
      this.getStartedContactAdmin();
    }
  }


  closeModal = () => {
    this.setState({ addDescription: "" })
    this.getStartedContactAdmin();
  }

  handleCloseModal = () => {
    this.setState({ isActive: false, isTooHeavy: false });
  };

  addDescription = () => {

    let contact = this.state.ContactAdmin;
    let description = this.state.ContactAdmin[0].description;
    description.push(this.state.addDescription);
    contact[0].description = description;
    this.setState({ arrayDescription: contact[0].description, addDescription: "" });
  }

  deleteDescription = (index, event) => {

    let contact = this.state.formToDelete;
    let description = this.state.formToDelete[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: contact[0].description });
  }

  getIdFormToDelete = (index, event) => {
    console.log("idToDelete : ", index);
    let arrayIdForm = [];
    arrayIdForm.push(this.state.ContactAdmin[index].id);

    this.setState({ formToDelete: arrayIdForm, openAddContact: false, openEditReference: false });
  }

  getIdFormToEdit = (index, event) => {

    let arrayIdForm = [];
    arrayIdForm.push(this.state.ContactAdmin[index].id);

    this.setState({
      formToEdit: arrayIdForm,
      idToEdit: index,
      openEditReference: true,
      openAddContact: false
    });

  }

  editDescription = (index, event) => {

    let contact = this.state.ContactAdmin;
    let description = this.state.ContactAdmin[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: contact[0].description });
  }


  closeModalModificationContact = (bool) => {
    console.log("bool :", bool)
    this.setState({ openEditReference: bool, openAddContact: bool });
  }

  handleClickOpenAddReference = () => {
    this.setState({ openAddContact: true, openEditReference: false });
  }


  render() {
    let options = [];
    for (let i in this.state.arrayLang) {
      options.push(<option key={i} id={this.state.arrayLang[i].locale}>{this.state.arrayLang[i].locale}</option>)
    }

    console.log(this.state.idLang);
    return (
      <div className="text-center">
        <div>
          <NavBarAdmin />
        </div>
        <div>
          <h1>contact</h1>
        </div>

        <div >
          <div className="pt-3 pb-3">
            {!this.state.ContactAdmin.length > 0 && <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addFormulaire" onClick={this.handleClickOpenAddReference}>Ajouter un formulaire</button>
            }            <select className="form-control" id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
              {options}
            </select>
          </div>

          <div className="position-tab pt-3">
            <table className="table table-striped" style={{ width: "75%" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">description</th>
                  <th scope="col">modification</th>
                  <th scope="col">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ContactAdmin.length > 0 &&
                  this.state.ContactAdmin.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.name}</td>

                      <td> {<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editContactAdmin" onClick={this.getIdFormToEdit.bind(this, index)}>Modifier</button>}</td>
                      <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-contact-admin" onClick={this.getIdFormToDelete.bind(this, index)}>Supprimer</button>}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>



        {/* <!-- Nouveau contact formulaire  --> */}
        <div className="modal fade" id="addFormulaire" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">Ajout des noms de champs du formulaire</h5>
              </div>
              <div className="modal-body">
                <AjoutContact
                  locale={this.state.langSelected}
                  arrayLang={this.state.arrayLang}
                  contact={this.state.contact}
                  getStartedContactAdmin={this.getStartedContactAdmin}
                  closeModalModificationContact={this.closeModalModificationContact}
                  language_id={this.state.idLang}
                />
              </div>
            </div>
          </div>
        </div>



        {/* <!-- suppression d'une contact --> */}
        <div className="modal fade" id="delete-contact-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression des libellés des champs forumlaire</h5>
              </div>
              <div className="modal-body">
                <DeleteContact
                  contact={this.state.contact}
                  formToDelete={this.state.formToDelete}
                  getStartedContactAdmin={this.getStartedContactAdmin}
                  closeModalModificationContact={this.closeModalModificationContact} />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modification d'une contact --> */}
        <div className="modal fade" id="editContactAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">Modifier des noms de champs du formulaire</h5>
              </div>
              <div className="modal-body">
                <ModifierContact
                  locale={this.state.langSelected}
                  arrayLang={this.state.arrayLang}
                  contact={this.state.ContactAdmin}
                  getStartedContactAdmin={this.getStartedContactAdmin}
                  closeModalModificationContact={this.closeModalModificationContact}
                  language_id={this.state.idLang}
                  arrayName={this.state.arrayName}
                  id={this.state.formToEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ContactAdmin;