import React, { Component } from 'react';
import getRessources from './../../../utils/getRessources';
import "./ReferenceAdmin.css";
import AjoutReference from './AjoutReference';
import DeleteReference from './DeleteReference';
import $ from "jquery";
import NavBarAdmin from '../NavBarAdmin/NavBar';



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
      specToDelete: null,
      isTooHeavy: false,
      message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
      isActive: true,

      idToEdit: null,
      specToEdit: [],
      arrayLang: [],
      langSelected: "fr",
      referenceAdmin: [],

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
  }

  getAllLang = async () => {
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
    let data = await (await (fetch(url))).json();
    this.setState({ arrayLang: data });
  }

  getreference = (id) => {
    let index = id;

    let specSelected = [];
    specSelected.push(this.state.reference[index]);
    this.setState({
      specSelected: specSelected,
      titreSpec: this.state.reference[index].subtitle,
      arrayDescription: this.state.reference[index].description,
      altImage: this.state.reference[index].alt,
      urlImage: this.state.reference[index].url,
      nameImage: this.state.reference[index].name,
      refIdImage: this.state.reference[index].homepage_id,
      titreSection: this.state.reference[index].title,
      titreSection: this.state.reference[index].title
    })
  }



  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = data.description.split('/');
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    //on met a jour le state avec la nouvelle valeur [reference=state:[...this.state.reference=state actuel,objet=variable objet qui contient les nouvelles données]]
    this.setState({ referenceAdmin: [...this.state.referenceAdmin, objet] });
  }

  componentDidMount = () => {
    this.getAllLang();
    this.getStartedreferenceAdmin();
  }

  getStartedreferenceAdmin = async () => {

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/reference?section=reference&locale=' + this.state.langSelected;
    const data = await (await (fetch(url))).json();
    console.log("url", url)
    console.log(data)
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }
    /*  this.setState({ referenceAdmin: data }); */
  }


  componentDidUpdate(prevProps) {
    if (prevProps.locale !== this.props.locale) {
      this.setState({ reference: "", specSelected: "", titreSection: "" });
      this.getStartedreferenceAdmin();
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

    let reference = this.state.specToDelete;
    let description = this.state.specToDelete[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: reference[0].description });
  }

  getIdSpecToDelete = (index, event) => {
    console.log("index", index)
    console.log("this.state.ref", this.state.reference)
    let arrayIdSpec = [];
    arrayIdSpec.push(this.state.referenceAdmin[index].id);
    arrayIdSpec.push(this.state.referenceAdmin[index].image_id);

    this.setState({ specToDelete: arrayIdSpec });
  }

  getIdReferenceToEdit = (index, event) => {
    let arrayIdReference = [];
    arrayIdReference.push(this.state.referenceAdmin[index].id);
    arrayIdReference.push(this.state.referenceAdmin[index].image_id);
    /* this.getStartedreferenceAdmin(index); */
    this.setState({ specToEdit: arrayIdReference, idToEdit: index });
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
      "image_id": this.state.specToEdit[1]
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
      url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.specToEdit[1]}`;
      fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

      // fetch pour modification des champs de la table reference
      url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/reference/${this.state.specToEdit[0]}`;
      fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


      //on réactualise les references
      this.getStartedreferenceAdmin();
      $("#uploadFileEditreferenceAdmin")[0].value = "";
    }

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
                  <th scope="col">titre de la section</th>
                  <th scope="col">nom de la reference</th>
                  <th scope="col">modification</th>
                  <th scope="col">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.referenceAdmin.length > 0 &&
                  this.state.referenceAdmin.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.title}</td>
                      <td>{element.subtitle}</td>
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
          <div class="modal-dialog modal-dialog-scrollable" role="document">
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
                <DeleteReference reference={this.state.reference} specToDelete={this.state.specToDelete} getStartedreferenceAdmin={this.getStartedreferenceAdmin} />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modification d'une reference --> */}
        <div class="modal fade" id="editSpecAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modifier une reference</h5>
              </div>
              <div class="modal-body">
                {this.state.referenceAdmin.length > 0 && <div className="form-group">
                  <div class="form-group">
                    <label for="titre-section">Titre section</label>
                    <input class="form-control form-control-sm" value={this.state.titreSection} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                  </div>
                  <label>Saisir le titre de la reference</label>
                  <input type="text" className="form-control form-control-sm" value={this.state.titreSpec} id="titre-spec-admin" onChange={this.handleChangeInput} />

                  <label>Saisir une description</label>
                  <textarea type="text" value={this.state.addDescription} className="form-control form-control-sm" id="addDescription-spec-admin" onChange={this.handleChangeInput} />
                  <button type="button" class="btn btn-primary" onClick={this.addDescription}>Ajouter une description</button>
                  <div className="description-spec-admin-modal">
                    <ul>
                      {this.state.referenceAdmin.length > 0 && this.state.referenceAdmin[0].description.map((description, index) => (
                        <div>
                          <li key={index}>{description} {"  "}<button type="button" class="btn btn-primary" onClick={this.deleteDescription.bind(this, index)}>X</button></li>

                        </div>


                      ))}
                    </ul>

                  </div>

                  <label htmlFor="alt-image-spec-admin" className="col-form-label col-form-label-sm">description de l'image</label>
                  <div className="">
                    <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-spec-admin" onChange={this.handleChangeInput} />
                  </div>

                  <div class="custom-file">
                    <input type="file" className="custom-file-input" id="uploadFileEditreferenceAdmin" onChange={this.handlerUploadFile} />
                    <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                  </div>
                </div>}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" id="titre-spec-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.editreference}>Appliquer</button>
              </div>
              {/* [début:popup error] si le format est pas pris en charge ou si le fichier est trop lourd */}
              {this.state.isTooHeavy && (
                <div className={`${this.state.isActive ? "div-active-error" : "div-desactive-error"}`}>
                  <span className="text-alert-error">
                    {this.state.message_too_heavy}
                  </span> {" "}<button type="button" className="btn btn-danger btn-sm" onClick={this.handleCloseModal}>ok</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ReferenceAdmin;