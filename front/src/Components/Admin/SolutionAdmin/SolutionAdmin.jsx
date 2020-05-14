import NavBarAdmin from '../NavBarAdmin/NavBar';
import React, { Component } from 'react';
import AjoutsolutionAdmin from './AjoutSolution';
import EditsolutionAdmin from './EditSolution';
import DeletesolutionAdmin from './DeleteSolution';
import getRessources from './../../../utils/getRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




class SolutionAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            solutionAdmin: [],
            titrePage: "",
            solutionSelected: [],

            /*scpecialisation*/
            nameSolution: "",
            description: "",
            arrayDescription: [],
            urlImage: "",
            altImage: "",
            nameImage: "",
            refIdImage: null,
            document: null,
            titreSection:"",

            addDescription: "",
            specToDelete: null,
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,

            idToEdit: null,
            solutionToEdit: [],
            arrayLang:[],
            langSelected:"fr",
            solutionName:[],
            getSolutionState:[],
            jsonParseDescriptionSolutionSelected:[]

            

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


    handleChangeLang = (event) => {
        let seletedLang = event.target.options[event.target.options.selectedIndex].id;
        this.setState({ langSelected: seletedLang });
        this.getStartedsolutionAdmin();
    }

    getAllLang = async () => {
        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/language';
        let data = await (await (fetch(url))).json();
        this.setState({ arrayLang: data });
      }
    


    handleChangeInput = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titre-section":
                this.setState({ titrePage: event.target.value });
                break;

            case "titre-solution-admin":
                this.setState({ nameSolution: event.target.value });
                break;

            case "addDescription-solution-admin":
                this.setState({ addDescription: event.target.value });
                break;

            case "url-image-solution-admin":
                this.setState({ urlImage: event.target.value });
                break;

            case "alt-image-solution-admin":
                this.setState({ altImage: event.target.value });
                break;

            case "name-image-solution-admin":
                this.setState({ nameImage: event.target.value });
                break;

            case "titre-solution-section":
                this.setState({ titreSection: event.target.value });
                break;

            default:
                break;
        }
    }


    componentDidMount = () => {
        this.getAllLang();
        this.getStartedsolutionAdmin();
    }
    

    getStartedsolutionAdmin = async () => {

         let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/test?locale='+ this.state.langSelected;
         const data = await (await (fetch(url))).json();
         
         console.log(data)
         this.setState({solutionAdmin:data});
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.langSelected !== this.state.langSelected) {
            //this.setState({solutionAdmin:[]});
            this.getStartedsolutionAdmin();
        }
    }


    closeModal = () => {
        this.setState({ addDescription: "" })
        this.getStartedsolutionAdmin();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    addDescription = () => {

        let solutionAdmin = this.state.solutionSelected;
        let description = this.state.solutionSelected[0].description;
        description.push(this.state.addDescription);
        solutionAdmin[0].description = description;
        this.setState({ arrayDescription: solutionAdmin[0].description, addDescription: "" });
    }

    deleteDescription = (index, event) => {

        let solutionAdmin = this.state.solutionSelected;
        let description = this.state.solutionSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: solutionAdmin[0].description });
    }

    getIdSolutionToDelete = (index, event) => {
        let arrayIdSolution = [];
        
        arrayIdSolution.push(this.state.solutionAdmin[index].id);
        arrayIdSolution.push(this.state.solutionAdmin[index].image_id);
        console.log(index);
        this.setState({ specToDelete: arrayIdSolution });
    }



    editDescription = (index, event) => {

        let solutionAdmin = this.state.solutionSelected;
        let description = this.state.solutionSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: solutionAdmin[0].description });
    }

    getIdSolutionToEdit = (index, event) => {
        let arrayIdSolution = [];
        arrayIdSolution.push(this.state.solutionAdmin[index].id);
        arrayIdSolution.push(this.state.solutionAdmin[index].image_id);
        this.getsolutionAdmin(index);
        this.setState({ solutionToEdit: arrayIdSolution, idToEdit: index });
    }

    
    getsolutionAdmin = (id) => {
        let index = id;

        let solutionSelected = [];
        solutionSelected.push(this.state.solutionAdmin[index]);

        let parseJson = JSON.parse(solutionSelected[0].description);
        this.setState({
            solutionSelected: solutionSelected,
            nameSolution: this.state.solutionAdmin[index].subtitle,
            arrayDescription: this.state.solutionAdmin[index].description,
            altImage: this.state.solutionAdmin[index].alt,
            urlImage: this.state.solutionAdmin[index].url,
            nameImage: this.state.solutionAdmin[index].name,
            refIdImage: this.state.solutionAdmin[index].homepage_id,
            titrePage: this.state.solutionAdmin[index].title,
            nameSolution: this.state.solutionAdmin[index].name,
            jsonParseDescriptionSolutionSelected:parseJson
        })
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
                    <h1>solutionAdmin</h1>
                </div>

                <div>
                    <div className="pt-3 pb-3">
                        <button type="button" className="btn btn-outline-primary mr-1" data-toggle="modal" data-target="#new-solutionAdmin-admin">Ajout solution</button>
                        <select className="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
                            {options}
                        </select>
                    </div>

                    <div className="position-tab pt-3">
                        <table className="table table-striped" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">titre de la solution</th>
                                    <th scope="col">nom de la solution</th>
                                    <th scope="col">modification</th>
                                    <th scope="col">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.solutionAdmin.length > 0 &&
                                    this.state.solutionAdmin.map((element, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.title}</td>
                                            <td>{element.name}</td>
                                            <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editSolutionAdmin" onClick={this.getIdSolutionToEdit.bind(this, index)}>Modifier</button>}</td>
                                            <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-solutionAdmin-admin" onClick={this.getIdSolutionToDelete.bind(this, index)}>Supprimer</button>}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



                {/* <!-- Nouvelle solution --> */}

                <div class="modal fade" id="new-solutionAdmin-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvelle solution</h5>
                            </div>
                            <div class="modal-body">
                                <AjoutsolutionAdmin locale={this.state.langSelected} arrayLang={this.state.arrayLang} solutionAdmin={this.state.solutionAdmin} getStartedsolutionAdmin={this.getStartedsolutionAdmin} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'une solution --> */}
                <div class="modal fade" id="delete-solutionAdmin-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une solution</h5>
                            </div>
                            <div class="modal-body">
                                <DeletesolutionAdmin solutionAdmin={this.state.solutionAdmin} specToDelete={this.state.specToDelete} getStartedsolutionAdmin={this.getStartedsolutionAdmin} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'une solution --> */}
                <div class="modal fade" id="editSolutionAdmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl"  role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier une solution</h5>
                            </div>
                            <div class="modal-body">
                                <EditsolutionAdmin 
                                    locale={this.state.langSelected}
                                    arrayLang={this.state.arrayLang}
                                    solutionAdmin={this.state.solutionAdmin}
                                    getStartedsolutionAdmin={this.getStartedsolutionAdmin}
                                    handleChangeInput={this.handleChangeInput}
                                    {...this.state}
                                />
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SolutionAdmin;