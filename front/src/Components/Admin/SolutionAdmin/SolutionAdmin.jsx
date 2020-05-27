import React, { Component } from 'react';
import getRessources from './../../../utils/getRessources';
import AjoutSolution from './AjoutSolution';
import DeleteSolution from './DeleteSolution';
import $ from "jquery";
import NavBarAdmin from '../NavBarAdmin/NavBar';
import ModificationSolution from "./ModificationSolution";



const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SolutionAdmin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      solution: [],
      titreSection: "",
      specSelected: [],
      titreAccueil: "",

      /*solution*/
      titreSpec: "",
      description: "",
      arrayDescription: [],
      urlImage: "",
      altImage: "",
      nameImage: "",
      solIdImage: null,
      document: null,

      addDescription: "",
      solToDelete: null,
      isTooHeavy: false,
      message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
      isActive: true,

      idToEdit: null,
      solToEdit: [],
      arrayLang: [],
      langSelected: "fr",
      idLang: null,
      solutionAdmin: [],
      openEditSolution: false,
      openAddSolution: false

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

      case "titre-Accueil":
        this.setState({ titreAccueil: event.target.value });
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

      case "solId-image-spec-admin":
        this.setState({ solIdImage: event.target.value });
        break;

      default:
        break;
    }
  }


  handleChangeLang = (event) => {
    let seletedLang = event.target.options[event.target.options.selectedIndex].id;
    this.setState({ langSelected: seletedLang });
    this.getStartedSolutionAdmin();
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
      idLang: language
    });
  }


  componentDidMount = () => {
    this.getAllLang();
    this.getStartedSolutionAdmin();
  }

  getStartedSolutionAdmin = async () => {


    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/solution?section=solution&locale=' + this.state.langSelected;
    const data = await (await (fetch(url))).json();
    console.log("DATA : ", data);
    this.setState({ solutionAdmin: data });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.langSelected !== this.state.langSelected) {
      this.setState({ solution: "", specSelected: "", titreSection: "" });
      this.getStartedSolutionAdmin();
      this.closeModalModificationSolution();
    }
  }


  closeModal = () => {
    this.setState({ addDescription: "" })
    this.getStartedSolutionAdmin();
  }

  handleCloseModal = () => {
    this.setState({ isActive: false, isTooHeavy: false });
  };

  addDescription = () => {

    let solution = this.state.solutionAdmin;
    let description = this.state.solutionAdmin[0].description;
    description.push(this.state.addDescription);
    solution[0].description = description;
    this.setState({ arrayDescription: solution[0].description, addDescription: "" });
  }

  deleteDescription = (index, event) => {

    let solution = this.state.solToDelete;
    let description = this.state.solToDelete[0].description;

    description.splice(index, 1);

    this.setState({ arrayDescription: solution[0].description });
  }

  getIdSpecToDelete = (index, event) => {
    let arrayIdRef = [];
    arrayIdRef.push(this.state.solutionAdmin[index].id);
    arrayIdRef.push(this.state.solutionAdmin[index].image_id);

    this.setState({ solToDelete: arrayIdRef, openAddSolution: false, openEditSolution: false });
  }

  getIdSolutionToEdit = (index, event) => {

    let arrayIdSolution = [];
    arrayIdSolution.push(this.state.solutionAdmin[index].id);
    arrayIdSolution.push(this.state.solutionAdmin[index].image_id);
    this.setState({
      solToEdit: arrayIdSolution,
      idToEdit: index,
      openEditSolution: true,
      openAddSolution: false
    });
  }


  closeModalModificationSolution = (bool) => {
    console.log("bool :", bool)
    this.setState({ openEditSolution: bool, openAddSolution: bool });
  }

  handleClickOpenAddSolution = () => {
    this.setState({ openAddSolution: true, openEditSolution: false });
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
          <h1>solution</h1>
        </div>

        <div >
          <div className="pt-3 pb-3">
            <button type="button" className="btn btn-outline-primary" onClick={this.handleClickOpenAddSolution}>Ajout solution</button>
            <select className="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
              {options}
            </select>
          </div>

          <div className="position-tab pt-3">
            <table className="table table-striped" style={{ width: "75%" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">nom de la solution</th>
                  <th scope="col">titre de la section</th>
                  <th scope="col">modification</th>
                  <th scope="col">Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.solutionAdmin.length > 0 &&
                  this.state.solutionAdmin.map((element, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{element.subtitle}</td>
                      <td>{element.title}</td>
                      <td> {<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editSpecAmdin" onClick={this.getIdSolutionToEdit.bind(this, index)}>Modifier</button>}</td>
                      <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-solution-admin" onClick={this.getIdSpecToDelete.bind(this, index)}>Supprimer</button>}</td>
                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>



        {/* <!-- Nouvelle solution --> */}
        {this.state.openAddSolution && <div>
          <AjoutSolution
            locale={this.state.langSelected}
            arrayLang={this.state.arrayLang}
            solution={this.state.solution}
            getStartedSolutionAdmin={this.getStartedSolutionAdmin}
            closeModalModificationSolution={this.closeModalModificationSolution} />
        </div>
        }

        {/* <!-- suppression d'une solution --> */}
        <div className="modal fade" id="delete-solution-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression d'une solution</h5>
              </div>
              <div className="modal-body">
                <DeleteSolution
                  solution={this.state.solution}
                  solToDelete={this.state.solToDelete}
                  getStartedSolutionAdmin={this.getStartedSolutionAdmin}
                  closeModalModificationSolution={this.closeModalModificationSolution} />
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Modification d'une solution --> */}

        {this.state.openEditSolution && <div>
          <ModificationSolution
            solutionAdmin={this.state.solutionAdmin}
            idToEdit={this.state.idToEdit}
            solToEdit={this.state.solToEdit}
            closeModalModificationSolution={this.closeModalModificationSolution}
            idLang={this.state.idLang}
            getStartedSolutionAdmin={this.getStartedSolutionAdmin}
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

export default SolutionAdmin;