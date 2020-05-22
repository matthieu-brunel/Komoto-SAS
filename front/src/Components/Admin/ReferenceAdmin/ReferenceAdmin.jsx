import React, { Component } from 'react';
import getRessources from './../../../utils/getRessources';
import "./ReferenceAdmin.css";
import AjoutReference from './AjoutReference';
import DeleteReference from './DeleteReference';
import $ from "jquery";
import NavBarAdmin from '../NavBarAdmin/NavBar';
import ModificationReference from "./ModificationReference";



const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ReferenceAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reference: [],
      titreSection: "",
      specSelected: [],

      /*scpecialisation*/
      titreSpec: "",
      description: "",
      arrayDescription: [],
      urlImage: "",
      altImage: "",
      nameImage: "",
      refIdImage: null,
      document: null,

      addDescription: "",
      refToDelete: null,
      isTooHeavy: false,
      message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
      isActive: true,

      idToEdit: null,
      refToEdit: [],
      arrayLang: [],
      langSelected: "fr",
      idLang:null,
      referenceAdmin: [],
      openEditReference:false

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
    this.getStartedreferenceAdmin();
    this.getAllLang();
  }

  getAllLang = async () => {
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    let data = await (await (fetch(url))).json();
    let language = null;

    for (let i = 0; i < data.length; i++) {
      for (let [key, value] of Object.entries(data[i])) {
        if (this.state.langSelected === value) {
          language = data[i].id;
        }
      }
    }

    this.setState({ 
      arrayLang: data,
      idLang:language
     });
  }


  componentDidMount = () => {
    this.getAllLang();
    this.getStartedreferenceAdmin();
  }

  getStartedreferenceAdmin = async () => {

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/reference?section=reference&locale=' + this.state.langSelected;
    const data = await (await (fetch(url))).json();
    this.setState({ referenceAdmin: data });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.langSelected !== this.state.langSelected) {
      this.setState({ reference: "", specSelected: "", titreSection: "" });
      this.getStartedreferenceAdmin();
      this.closeModalModificationReference();
    }
  }


  closeModal = () => {
    this.setState({ addDescription: "" })
    this.getStartedreferenceAdmin();
  }

  handleCloseModal = () => {
    this.setState({ isActive: false, isTooHeavy: false });
  };

  addDescription = () => {

    let reference = this.state.referenceAdmin;
    let description = this.state.referenceAdmin[0].description;
    description.push(this.state.addDescription);
    reference[0].description = description;
    this.setState({ arrayDescription: reference[0].description, addDescription: "" });
  }

  deleteDescription = (index, event) => {

    let reference = this.state.refToDelete;
    let description = this.state.refToDelete[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: reference[0].description });
  }

  getIdSpecToDelete = (index, event) => {
    let arrayIdRef = [];
    arrayIdRef.push(this.state.referenceAdmin[index].id);
    arrayIdRef.push(this.state.referenceAdmin[index].image_id);

    this.setState({ refToDelete: arrayIdRef });
  }

  getIdReferenceToEdit = (index, event) => {

    let arrayIdReference = [];
    arrayIdReference.push(this.state.referenceAdmin[index].id);
    arrayIdReference.push(this.state.referenceAdmin[index].image_id);
    this.setState({ refToEdit: arrayIdReference, idToEdit: index, openEditReference:true });
  }

  editDescription = (index, event) => {

    let reference = this.state.referenceAdmin;
    let description = this.state.referenceAdmin[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: reference[0].description });
  }

  editreference = () => {

    function init(data) {
      const options = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body: JSON.stringify(data)
      }
      return options;
    }

    const { arrayLang, locale } = this.props;
    let language = null;

    for (let i = 0; i < arrayLang.length; i++) {
      for (let [key, value] of Object.entries(arrayLang[i])) {
        if (locale === value) {
          language = arrayLang[i].id;
        }
      }
    }

    let data = {
      "title": this.state.titreSection,
      "subtitle": this.state.titreSpec,
      "description": this.state.arrayDescription.join("/"),
      "section": "reference",
      "language": language,
      "image_id": this.state.refToEdit[1]
    };

    let dataImage = {
      "name": this.state.nameImage,
      "url": this.state.urlImage,
      "alt": this.state.altImage,
      "section": "reference",
      "homepage_id": 0
    };


    const documentImage = new FormData();
    documentImage.append("file", this.state.document);


    const options = {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      redirect: "follow",
      referrer: "no-referrer",
      body: documentImage
    }



    if (this.state.specSelected.length > 0) {

      // fetch pour envoi d el'image dans le dossier back/public/images
      let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
      fetch(url, options).then(res => res.json()).then(res => console.log(res));

      // fetch pour modification des champs de la table image
      url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.refToEdit[1]}`;
      fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

      // fetch pour modification des champs de la table reference
      url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/reference/${this.state.refToEdit[0]}`;
      fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


      //on réactualise les references
      this.getStartedreferenceAdmin();
      $("#uploadFileEditreferenceAdmin")[0].value = "";
    }

  }

  closeModalModificationReference = (event) => {
    this.setState({openEditReference:false});
  }


  render() {
    let options = [];
    for (let i in this.state.arrayLang) {

      options.push(<option key={i} id={this.state.arrayLang[i].locale}>{this.state.arrayLang[i].locale}</option>)
    }

    return (
      <div>
        <div>
          <NavBarAdmin />
        </div>
        <div>
          <h1>reference</h1>
        </div>

        <div >
          <div className="pt-3 pb-3">
            <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#new-reference-admin">Ajout reference</button>
            <select className="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
              {options}
            </select>
          </div>

          <div className="position-tab pt-3">
            <table className="table table-striped" style={{ width: "75%" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">nom de la reference</th>
                  <th scope="col">titre de la section</th>
                  <th scope="col">modification</th>
                  <th scope="col">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                 {this.state.referenceAdmin.length > 0 &&
                  this.state.referenceAdmin.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.subtitle}</td>
                      <td>{element.title}</td>
                      <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editSpecAmdin" onClick={this.getIdReferenceToEdit.bind(this, index)}>Modifier</button>}</td>
                      <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-reference-admin" onClick={this.getIdSpecToDelete.bind(this, index)}>Supprimer</button>}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>



        {/* <!-- Nouvelle reference --> */}

        <div class="modal fade" id="new-reference-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvelle reference</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AjoutReference locale={this.state.langSelected} arrayLang={this.state.arrayLang} reference={this.state.reference} getStartedreferenceAdmin={this.getStartedreferenceAdmin} />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- suppression d'une reference --> */}
        <div class="modal fade" id="delete-reference-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une reference</h5>
              </div>
              <div class="modal-body">
                <DeleteReference reference={this.state.reference} refToDelete={this.state.refToDelete} getStartedreferenceAdmin={this.getStartedreferenceAdmin} />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modification d'une reference --> */}

        { this.state.openEditReference && <div>
          <ModificationReference 
            referenceAdmin={this.state.referenceAdmin}
            idToEdit={this.state.idToEdit} 
            refToEdit={this.state.refToEdit}
            closeModalModificationReference={this.closeModalModificationReference}
            idLang={this.state.idLang}
            getStartedreferenceAdmin={this.getStartedreferenceAdmin}
            />
        </div>}

        {/* [début:popup error] si le format est pas pris en charge ou si le fichier est trop lourd */}
        {this.state.isTooHeavy && (
          <div className={`${this.state.isActive ? "div-active-error" : "div-desactive-error"}`}>
            <span className="text-alert-error">
              {this.state.message_too_heavy}
            </span> {" "}<button type="button" className="btn btn-danger btn-sm" onClick={this.handleCloseModal}>ok</button>
          </div>
        )}
      </div>
    )
  }
}

export default ReferenceAdmin;