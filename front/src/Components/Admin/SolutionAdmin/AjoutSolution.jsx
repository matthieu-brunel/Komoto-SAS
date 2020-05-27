import React, { Component } from 'react';
import postRessources from './../../../utils/postRessources';
import $ from "jquery";
const path = require('path');

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class AjoutSolutionAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionAdmin: [],
            titrePage: "",
            titreSection: "",
            arraySections: [],
            titreAccueil: "",


            /*solution*/
            nameSolution: "",
            description: "",
            arrayDescription: [],
            urlImage: "",

            altImageLogoSolution: "",
            altImage: "",
            nameImage: "",
            arrayImage: [],

            addDescription: "",
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,
            document: [],

            documentLogoSolution: [],
            documentTosendBack: [],
            indexEdit: null,
            documentsFiles: [],


            objetImageCaroussel: [],
            objetImageLogoSolution: []

        }

        this.objetImage = {};
    }



    handleChangeInput = (event) => {
        switch (event.target.id) {
            case "titrePage-solution":
                this.setState({ titrePage: event.target.value });
                break;

            case "titre-solution-name":
                this.setState({ nameSolution: event.target.value });
                break;

            case "titre-solution-section":
                this.setState({ titreSection: event.target.value });
                break;

            case "titrePage-Accueil":
                this.setState({ titreAccueil: event.target.value });
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


            case "alt-imageLogoSolution-solution-admin":
                this.setState({ altImageLogoSolution: event.target.value });
                break;

            default:
                break;
        }
    }

    addDescription = () => {


        let description = [];
        description.push(this.state.addDescription);

        this.setState({ arrayDescription: [...this.state.arrayDescription, this.state.addDescription], addDescription: "" });
    }

    addAltImage = () => {
        //

        if (this.state.document.length > 0) {

            // constitution de l'objet image caroussel pour affichage
            let arrayObjetImage = [];
            let objetImageDisplay = {};
            objetImageDisplay.name = this.state.document[0].name;
            objetImageDisplay.alt = this.state.altImage;
            arrayObjetImage.push(objetImageDisplay);

            this.setState({
                objetImageCaroussel: [...this.state.objetImageCaroussel, objetImageDisplay],
                documentsFiles: [...this.state.documentsFiles, this.state.document],
                altImage: "",
                document: []
            });
            $("#uploadAddImageSolutionCaroussel")[0].value = "";

        } else if (this.state.documentLogoSolution.length > 0) {

            // constitution de l'objet logo solution pour affichage
            let arrayObjetImage = [];
            let objetImageDisplay = {};
            objetImageDisplay.name = this.state.documentLogoSolution[0].name;
            objetImageDisplay.alt = this.state.altImageLogoSolution;
            arrayObjetImage.push(objetImageDisplay);

            this.setState({ objetImageLogoSolution: [...this.state.objetImageLogoSolution, arrayObjetImage, this.state.documentLogoSolution], altImageLogoSolution: "", documentLogoSolution: [] });
            $("#uploadAddImageLogoSolution")[0].value = "";
        }

    }


    addSection = () => {


        let sectionArray = [];
        let sectionObj = {};

        sectionObj.title = this.state.titreSection;
        sectionObj.description = this.state.arrayDescription;

        sectionArray.push(sectionObj);

        this.setState({ arraySections: [...this.state.arraySections, sectionObj], arrayDescription: "", titreSection: "" });
    }

    deleteDescription = (index, event) => {

        switch (event.target.id) {
            case "deleteDescription":
                let description = this.state.arrayDescription;
                description.splice(index, 1);

                this.setState({ arrayDescription: description });
                break;

            case "deleteDescriptionSection":
                let descriptionSection = this.state.arraySections;
                descriptionSection.splice(index, 1);

                this.setState({ arraySections: descriptionSection });
                break;
            default:
                break;
        }


    }


    editDescription = (index, event) => {

        let solutionAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: solutionAdmin[0].description });
    }


    addNewsolutionAdmin = async () => {
        const { arrayLang, locale } = this.props;

        let idLang;

        for (let i in arrayLang) {
            if (Object.values(arrayLang[i]).includes(locale)) {
                idLang = Object.values(arrayLang[i])[2];
            }
        }

        const options = {
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('token')
            })
        }


        let objetImageFinal = {};

        for (let i of this.state.objetImageLogoSolution[0]) {
            let array = [];
            let obj = { "name": i.name, "alt": i.alt };
            array.push(obj);

            objetImageFinal.logoSolution = array;
        }

        objetImageFinal.imageCaroussel = this.state.objetImageCaroussel;

        console.log(objetImageFinal)
        let dataImage = {
            'name': this.state.nameSolution,
            'url': JSON.stringify(objetImageFinal),
            'alt': "",
            'homepage_id': 0,
            'section': "solution"
        }

        let sectionDescription = [];
        for (let i of this.state.arraySections) {
            sectionDescription.push(i);
        }

        let dataSolution = {
            'title': this.state.titrePage,
            'title_section': this.state.titreAccueil,
            "subtitle": this.state.nameSolution,
            'description': JSON.stringify(sectionDescription),
            'language': idLang,
            'image_id': 0,
            "section": "solution"
        }


        // on ajoute toutes les images dans documentToSendBack
        let documentTosendBack = [];

        documentTosendBack.push(this.state.objetImageLogoSolution[1]);

        for (let objetImage of this.state.documentsFiles) {
            documentTosendBack.push(objetImage);
        }

        console.log(documentTosendBack);

        const data = new FormData()
        for (var x = 0; x < documentTosendBack.length; x++) {
            data.append('file', documentTosendBack[x][0])
        }

        console.log(data);


        await postRessources("solution", dataImage, dataSolution, data);

        this.setState({
            nameSolution: "",
            altImage: "",
            arrayDescription: [],
            nameImage: "",
            titrePage: "",
            urlImage: "",
            documentTosendBack: [],
            arrayImage: [],
            arraySections: [],
            nameSolution: "",
            titreAccueil: "",
            document: [],
            documentLogoSolution: [],
            objetImageCaroussel: [],
            objetImageLogoSolution: []
        });

        this.props.closeModalModificationSolution(false);
        this.props.getStartedSolutionAdmin();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

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

        //let file = event.target.files[0] ? event.target.files[0] : "";
        let file = [];
        let nameWithoutExtension = event.target.files[0].name.replace(path.extname(event.target.files[0].name), '');
        let nameDocument = nameWithoutExtension + "-" + Date.now() + path.extname(event.target.files[0].name);
        let newFile = new File([event.target.files[0]], nameDocument, { type: event.target.files[0].type, lastModified: event.target.files[0].lastModified })
        file.push(newFile);
        switch (event.target.id) {
            case "uploadAddImageLogoSolution":
                this.setState({ documentLogoSolution: file });
                break;

            case "uploadAddImageSolutionCaroussel":
                this.setState({ document: file });
                break;

            default:
                break;
        }


        /*         if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
            
                  this.setState({ document: file,urlImage:file.name, nameImage:file.name});
                } else {
                  this.setState({ isTooHeavy: true });
                  event.target.value = "";
                  this.setState({isActive:true});
                } */
    };


    getIdImageSolutionToDelete = (index, event) => {

        switch (event.target.id) {

            case "logoSolution":
                this.setState({ objetImageLogoSolution: [] });
                break;

            case "imageCaroussel":
                let arrayImageCaroussel = this.state.objetImageCaroussel;
                let documentsFiles = this.state.documentsFiles;

                arrayImageCaroussel.splice(index, 1);
                documentsFiles.splice(index, 1);

                this.setState({ objetCaroussel: arrayImageCaroussel, documentsFiles: documentsFiles });
                break;

            default:
                break;
        }
    }

    closeWindowAddSolution = () => {
        this.props.closeModalModificationSolution(false);
    }



    render() {
        return (
            <div>
                <div id="accordion" className="position-tab pt-3">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#partie1" aria-expanded="true" aria-controls="partie1">
                                    partie 1
                            </button>
                            </h5>
                        </div>

                        <form id="partie1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="form-group">
                                <label htmlFor="titrePage-Accueil">Titre de la section (page d'accueil) <span style={{ color: "red" }}>*</span></label>
                                <input className="form-control " value={this.state.titreAccueil} id="titrePage-Accueil" type="text" placeholder="titre de la page" onChange={this.handleChangeInput} />
                            </div>


                            <div className="form-group">
                                <label htmlFor="titrePage-solution">Titre de la Solution <span style={{ color: "red" }}>*</span></label>
                                <input className="form-control " value={this.state.titrePage} id="titrePage-solution" type="text" placeholder="titre de la page" onChange={this.handleChangeInput} />
                            </div>


                            <div className="form-group">
                                <label htmlFor="titre-solution-name">Nom de la solution <span style={{ color: "red" }}>*</span></label>
                                <input className="form-control" value={this.state.nameSolution} id="titre-solution-name" type="text" placeholder="nom de la solution" onChange={this.handleChangeInput} />
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="titre-solution-section">Titre du texte</label>
                                    <input className="form-control " value={this.state.titreSection} id="titre-solution-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                </div>

                                <label>Saisir une description</label>

                                <div className="form-group">
                                    <textarea className="form-control" type="text" value={this.state.addDescription} id="addDescription-solution-admin" onChange={this.handleChangeInput} />
                                </div>

                                <button type="button" className="btn btn-primary mr-2" onClick={this.addDescription}>Ajouter une description</button>
                                <button type="button" className="btn btn-primary" onClick={this.addSection}>Valider la section</button>


                                <div className="description-solution-admin-modal">
                                    <ul>
                                        {this.state.arrayDescription.length > 0 && this.state.arrayDescription.map((description, index) => (
                                            <div key={index} className="p-1">
                                                <li key={index}>{description} {"  "}<button type="button" className="btn btn-primary btn-sm" id="deleteDescription" onClick={this.deleteDescription.bind(this, index)}>X</button></li>
                                            </div>
                                        ))}
                                    </ul>

                                </div>

                                <div className="description-section-solution-admin-modal pt-3">
                                    <ul>
                                        {this.state.arraySections.length > 0 && this.state.arraySections.map((section, index) => (

                                            <div key={index} className="div-section-container p-1">
                                                <div className="div-title-section">
                                                    <h6 className="title-section">{section.title}</h6>
                                                </div>

                                                <div className="div-section-description">
                                                    <ul>
                                                        {section.description.map((element, index_list) => (
                                                            <li key={index_list}>{element}</li>
                                                        ))}
                                                    </ul>

                                                </div>
                                                <button type="button" className="btn btn-primary btn-sm" id="deleteDescriptionSection" onClick={this.deleteDescription.bind(this, index)}>X</button>
                                            </div>


                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <div className="p-2">
                                    <button className="btn btn-link" data-toggle="collapse" data-target="#partie2" aria-expanded="true" aria-controls="partie2">
                                        partie 2
                                    </button>
                                </div>
                            </h5>
                        </div>



                        <div id="partie2" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">

                            <div className="form-group mt-5">
                                <div className="row" style={{ marginLeft: "0" }}>

                                    <div className="form-group mt-5">
                                        <div className="row" style={{ marginLeft: "0" }}>

                                            {/*  upload logo de la solution utilisée */}
                                            <div className="custom-file col-5">
                                                <input type="file" className="custom-file-input" id="uploadAddImageLogoSolution" onChange={this.handlerUploadFile} />
                                                <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >logo de la solution utilisée<span style={{ color: "red" }}>*</span></label>
                                            </div>
                                            <div className="div-description-image-solution-admin col-5">
                                                <input className="form-control form-control-sm" value={this.state.altImageLogoSolution} id="alt-imageLogoSolution-solution-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput} />
                                            </div>

                                            <div className="btn-ajouter-image-solution-admin col-2">
                                                {
                                                    this.state.altImageLogoSolution !== "" && this.state.documentLogoSolution.length > 0
                                                        ?
                                                        <button type="button" className="btn btn-primary" onClick={this.addAltImage}>ajouter</button>
                                                        :
                                                        <button type="button" className="btn btn-secondary">ajouter</button>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">nom de l'image</th>
                                                    <th scope="col">description de l'image</th>
                                                    <th scope="col">supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.objetImageLogoSolution.map((element, index) => {
                                                        if (index < 1) {
                                                            return (
                                                                <tr key={index}>
                                                                    <th scope="row">{index + 1}</th>
                                                                    <td>{element[0].name ? element[0].name : element[0]}</td>
                                                                    <td>{element[0].alt}</td>
                                                                    <td> {<button type="button" className="btn btn-danger" id="logoSolution" onClick={this.getIdImageSolutionToDelete.bind(this, index)}>X</button>}</td>
                                                                </tr>
                                                            )
                                                        }
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>



                                    <div className="form-group mt-5">
                                        <div className="row" style={{ marginLeft: "0" }}>
                                            {/*  upload des images du caroussel */}
                                            <div className="custom-file col-5">
                                                <input type="file" className="custom-file-input" id="uploadAddImageSolutionCaroussel" onChange={this.handlerUploadFile} />
                                                <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >images du caroussel<span style={{ color: "red" }}>*</span></label>
                                            </div>
                                            <div className="div-description-image-solution-admin col-5">
                                                <input className="form-control form-control-sm" value={this.state.altImage} id="alt-image-solution-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput} />
                                            </div>

                                            <div className="btn-ajouter-image-solution-admin col-2">
                                                {
                                                    this.state.altImage !== "" && this.state.document.length
                                                        ?
                                                        <button type="button" className="btn btn-primary" onClick={this.addAltImage}>ajouter</button>
                                                        :
                                                        <button type="button" className="btn btn-secondary">ajouter</button>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-3">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">nom de l'image</th>
                                                    <th scope="col">description de l'image</th>
                                                    <th scope="col">supprimer</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.objetImageCaroussel.map((element, index) => (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{element.name ? element.name : element}</td>
                                                            <td>{element.alt}</td>
                                                            <td> {<button type="button" className="btn btn-danger" id="imageCaroussel" onClick={this.getIdImageSolutionToDelete.bind(this, index)}>X</button>}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>



                            <div className="modal-footer pt-1">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeWindowAddSolution}>Fermer</button>

                                {
                                    this.state.objetImageCaroussel.length > 0 && this.state.objetImageLogoSolution.length > 0 && this.state.titrePage !== "" && this.state.nameSolution !== "" && this.state.titreAccueil !== "" ?
                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewsolutionAdmin}>Enregistrer</button>
                                        :
                                        <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="merci de saisir les champs obligatoires">Enregistrer</button>}
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


export default AjoutSolutionAdmin;