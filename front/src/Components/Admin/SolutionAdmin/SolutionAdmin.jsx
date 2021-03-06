import React, { Component } from 'react';
import AjoutSolution from './AjoutSolution';
import DeleteSolution from './DeleteSolution';
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
      arrayDescription: [],
      urlImage: "",
      altImage: "",
      nameImage: "",
      solIdImage: null,
      document: null,

      addDescription: "",
      solToDelete: null,

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
      for (let  [,value] of Object.entries(data[i])) {
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
    this.setState({ solutionAdmin: data});
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.langSelected !== this.state.langSelected) {
      this.setState({ solution: "", specSelected: "", titreSection: "" });
      this.getStartedSolutionAdmin();
      this.closeModalModificationSolution();
    }else if(prevState.solution !== this.state.solution){
      console.log("je suis !=");
      this.getStartedSolutionAdmin();
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
                  solutionAdmin={this.state.solutionAdmin}
                  solToDelete={this.state.solToDelete}
                  resetIdToDelete={this.resetIdToDelete}
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
      </div>
    )
  }
}

export default SolutionAdmin;