import React, { Component } from 'react';
import putRessources from "./../../../utils/putRessources.js";
import $ from "jquery";
import postImages from "./../../../utils/postImages";
const path = require('path');

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class ModificationSolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionAdmin: [],
            titrePage: "",
            nameSolution: "",
            descriptionSolution: [],
            imagesSolution: [],

            currentModificationTitle: "",
            currentModificationDescription: "",
            currentModificationIndex: null,
            currentModificationClick: false,
            currentModificationSectionTitle: "",
            currentModificationSectionDescription: [],
            currentModificationSectionDescriptionList: "",
            solutionAdminSave: [],


            altImageLogoSolution: "",
            altImage: "",
            nameImage: "",
            arrayImage: [],

            objetImageCaroussel: [],

            objetImageLogoSolution: [],

            fileImageCaroussel: [],

            fileImageLogoSolution: [],

            document: [],

            documentLogoSolution: [],

            inputValisationAddSection: false,

            toggleCollapse: ["hide", "hide", "hide"]
        }
    }

    toggleCollapse = (event) => {
        switch (event.target.id) {
            case "section1":
                this.setState({
                    toggleCollapse: ["show", "hide", "hide"]
                })
                break;

            case "section2":
                this.setState({
                    toggleCollapse: ["hide", "show", "hide"]
                })
                break;

            case "section3":
                this.setState({
                    toggleCollapse: ["hide", "hide", "show"]
                })
                break;

            default:
                break;
        }
    }

    getIdImageSolutionToDelete = (index, event) => {

        switch (event.target.id) {
            case "logoSolution":
                this.setState({ objetImageLogoSolution: [], fileImageLogoSolution: [] });
                break;

            case "imageCaroussel":
                let arrayImageCaroussel = this.state.objetImageCaroussel;
                arrayImageCaroussel.splice(index, 1);

                let arrayFileImageCaroussel = this.state.fileImageCaroussel;
                arrayFileImageCaroussel.slice(index, 1);

                this.setState({ objetImageCaroussel: arrayImageCaroussel, fileImageCaroussel: arrayFileImageCaroussel });
                break;

            default:
                break;
        }


    }


    handleChangeInput = (event) => {

        switch (event.target.id) {
            case "titre-section":
                this.setState({ titrePage: event.target.value });
                break;

            case "name-solution-admin":
                this.setState({ nameSolution: event.target.value });
                break;

            case "title-description-modification-solution-admin":
                this.setState({ currentModificationSectionTitle: event.target.value });
                break;

            case "description-text-modification-solution-admin":
                this.setState({ currentModificationDescription: event.target.value });
                break;

            case "list-description-text-modification-solution-admin":
                this.setState({ currentModificationSectionDescriptionList: event.target.value });
                break;


            case "alt-imageLogoSolution-solution-admin":
                this.setState({ altImageLogoSolution: event.target.value });
                break;

            case "alt-image-solution-admin":
                this.setState({ altImage: event.target.value });
                break;

            default:
                break;
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
                fileImageCaroussel: [...this.state.fileImageCaroussel, this.state.document[0]],
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

            this.setState({
                objetImageLogoSolution: arrayObjetImage,
                altImageLogoSolution: "",
                documentLogoSolution: [],
                fileImageLogoSolution: this.state.documentLogoSolution[0]
            });
            $("#uploadAddImageLogoSolution")[0].value = "";
        }

    }

    handlerClickDescriptionSection = (index, event) => {
        this.setState({
            currentModification: event.target.id,
            currentModificationIndex: index,
            currentModificationSectionTitle: this.state.descriptionSolution[index].title,
            currentModificationSectionDescription: this.state.descriptionSolution[index].description
        });
    }

    getStartedsolution = () => {
        $('.registered-image-ok').hide();
        $('.registered-section-ok').hide();
        $('.registered-title-ok').hide();
        let description = JSON.parse(this.props.solutionAdmin[this.props.idToEdit].description);
        let images = JSON.parse(this.props.solutionAdmin[this.props.idToEdit].url);

        let arraySolution = [];
        let imageSolution = {};
        imageSolution.name = images.logoSolution.length > 0 ? images.logoSolution[0].name : [];
        imageSolution.alt = images.logoSolution.length > 0 ? images.logoSolution[0].alt : [];
        arraySolution.push(imageSolution);

        this.setState({
            titrePage: this.props.solutionAdmin[this.props.idToEdit].title,
            nameSolution: this.props.solutionAdmin[this.props.idToEdit].subtitle,
            descriptionSolution: description,
            objetImageLogoSolution: arraySolution,
            objetImageCaroussel: images.imageCaroussel,


            imagesSolution: images

        });
    }


    componentDidMount() {
        this.getStartedsolution();
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.solutionAdmin !== this.props.solutionAdmin) {
            this.setState({
                solutionAdmin: this.props.solutionAdmin
            });

        } else if (prevProps.idToEdit !== this.props.idToEdit) {
            let description = JSON.parse(this.props.solutionAdmin[this.props.idToEdit].description);
            this.setState({
                titrePage: this.props.solutionAdmin[this.props.idToEdit].title,
                nameSolution: this.props.solutionAdmin[this.props.idToEdit].subtitle,
            });

            this.getStartedsolution();
        }

    }

    handleClickAddDescription = () => {

        this.setState({
            currentModificationSectionDescription: [...this.state.currentModificationSectionDescription, this.state.currentModificationSectionDescriptionList],
            currentModificationSectionDescriptionList: "",
        });
    }

    handleClickDeleteDescription = (index, event) => {
        let description = this.state.currentModificationSectionDescription;
        description.splice(index, 1);

        this.setState({ currentModificationSectionDescription: description });
    }

    closeModalModificationCancel = () => {

        const { solutionAdmin, idToEdit } = this.props;

        // concerne le tableau des descriptions - section 2
        let arrayDescription = [];

        let arraySolutionSelected = solutionAdmin[idToEdit];
        let arrayDescriptionParsed = JSON.parse(arraySolutionSelected.description);

        for (let i of arrayDescriptionParsed) {
            arrayDescription.push(i);
        }
        //********************************************

        //concerne les titres - section 1
        let titrePageAdmin = arraySolutionSelected.title;
        let nameSolutionAdmin = arraySolutionSelected.subtitle;


        this.setState({
            descriptionSolution: arrayDescription,
            titrePage: titrePageAdmin,
            nameSolution: nameSolutionAdmin
        })

    }

    handleClickValidation = async () => {
        const {
            descriptionSolution,
            currentModificationIndex,
            currentModificationSectionDescription,
            currentModificationSectionTitle,
            objetImageLogoSolution,
            objetImageCaroussel } = this.state;

        let array = [];
        let objet = {};
        objet.title = currentModificationSectionTitle;
        objet.description = currentModificationSectionDescription;

        for (let i = 0; i < descriptionSolution.length; i++) {
            if (i === currentModificationIndex) {
                array.push(objet);
            } else {
                array.push(descriptionSolution[i])
            }
        }

        this.setState({
            descriptionSolution: array,
            inputValisationAddSection: false
        });

        console.log("descriptionSolution :", descriptionSolution);

        let image_id = this.props.solToEdit[1];

        let dataSolution = {
            'title': this.state.titrePage,
            "subtitle": this.state.nameSolution,
            'description': this.state.currentModificationSectionDescription.length > 0 ? JSON.stringify(array) : JSON.stringify(this.state.descriptionSolution),
            'language': this.props.idLang,
            'image_id': image_id,
            "section": "solution"
        }

        // pour la modification du nom de la référence dans la table image,
        // nous sommes obligés de faire un fetch pour mettre a jours l'entiereté
        // de la ligne d'enregistrement
        objet = {};
        objet.logoSolution = objetImageLogoSolution;
        objet.imageCaroussel = objetImageCaroussel;

        let dataImage = {
            'name': this.state.nameSolution,
            "url": JSON.stringify(objet),
            'alt': "",
            'homepage_id': 0,
            "section": "solution"
        }


        // fetch pour la table solution
        let id = this.props.solToEdit[0];
        await putRessources("solution", id, [dataSolution, dataImage]);

        // fetch pour la table image
        let id_image = this.props.solToEdit[1];
        await putRessources("image", id_image, dataImage);


        $('.registered-section-ok').show();
        $('.registered-title-ok').show();
        setTimeout(() => {
            $('.registered-section-ok').hide();
            $('.registered-title-ok').hide();
        }, 2000);

        await putRessources("image", id, dataImage);

        $('.registered-image-ok').show();
        setTimeout(() => {
            $('.registered-image-ok').hide();
        }, 2000);

        //fetch upload image(s)
        if (this.state.fileImageCaroussel.length > 0 || this.state.fileImageLogoSolution.name) {
          
            let documentSendToBack = [];
            for (let array of this.state.fileImageCaroussel) {
                documentSendToBack.push(array);
            }

            if(this.state.fileImageLogoSolution.name){
                documentSendToBack.push(this.state.fileImageLogoSolution);
            }

            console.log(documentSendToBack);
            // new FormData => les nouvelles images a envoyer au back
            const uploadImage = new FormData()
            for (var x = 0; x < documentSendToBack.length; x++) {
                uploadImage.append('file', documentSendToBack[x]);
            }
            await postImages(uploadImage);
        }

        this.setState({ 
            fileImageCaroussel: [],
            fileImageLogoSolution: [],
            currentModificationSectionDescription: [],
            currentModificationSectionTitle: "",
            currentModificationSectionDescriptionList: "" 
        });
        
        this.props.getStartedSolutionAdmin();
    }


    closeWindowAddSolution = () => {
        this.props.closeModalModificationSolution(false);
    }

    handlerAddSection = () => {
        let objet = {};
        objet.title = this.state.currentModificationSectionTitle;
        objet.description = this.state.currentModificationSectionDescription;
        this.setState({
            descriptionSolution: [...this.state.descriptionSolution, objet],
            currentModificationSectionDescription: [],
            currentModificationSectionTitle: "",
            inputValisationAddSection: true
        });
    }


    render() {
        return (
            <div>
                <div id="accordion" className="position-tab pt-3">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" id="section1" onClick={this.toggleCollapse}>
                                    Section 1
                                </button>
                            </h5>
                        </div>

                        <div id="collapseOne" className={`collapse ${this.state.toggleCollapse[0]}`} aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="titre-section">Titre de la page</label>
                                    <input className="form-control form-control-sm" value={this.state.titrePage} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                </div>
                                <div className="form-group">
                                    <label>Saisir le titre de la solution</label>
                                    <input type="text" className="form-control form-control-sm" value={this.state.nameSolution} id="name-solution-admin" onChange={this.handleChangeInput} />
                                </div>
                                <div className="alert alert-success registered-title-ok" role="alert">
                                    <p>Enregistrement des modifications réussi.</p>
                                </div>
                                <button type="button" className="btn btn-secondary" onClick={this.closeModalModificationCancel}>Annuler</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button>

                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" id="section2" onClick={this.toggleCollapse}>
                                    Section 2
                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className={`collapse ${this.state.toggleCollapse[1]}`} aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                <div className="div-ajout-section-modification-solution-admin text-right">
                                    <button type="button" className="btn btn-primary btn-sm" data-toggle="modal" data-target="#AddSectionCurrentSolution">ajouter une section</button>
                                </div>


                                <div className="description-solution-admin-modal pt-5">
                                    {this.state.descriptionSolution.length > 0 && this.state.descriptionSolution.map((description, index) => (
                                        <div key={index} className="-div-title-description-solution-modification">
                                            <p className="title-description-solution-modification">{description.title}</p>
                                            <ul>
                                                {description.description.map((list, index) => (
                                                    <div key={index}>
                                                        <li key={index - list}>{list}</li>
                                                    </div>
                                                ))}
                                            </ul>
                                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#currentSolution" onClick={this.handlerClickDescriptionSection.bind(this, index)}>modifier</button>
                                        </div>
                                    ))}

                                </div>
                                <div className="alert alert-success registered-section-ok" role="alert">
                                    <p>Enregistrement des modifications réussi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingThree">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" id="section3" onClick={this.toggleCollapse}>
                                    Section 3
                </button>
                            </h5>
                        </div>
                        <div id="collapseThree" className={`collapse ${this.state.toggleCollapse[2]}`} aria-labelledby="headingThree" data-parent="#accordion">
                            <div className="card-body">

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
                                                                <td>{element.name}</td>
                                                                <td>{element.alt}</td>
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
                                <div className="alert alert-success registered-image-ok" role="alert">
                                    <p>Enregistrement des modifications réussi.</p>
                                </div>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalModificationCancel}>Annuler</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/*     Modal modification section 2 */}
                <div className="modal fade" id="currentSolution" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier la section</h5>

                            </div>
                            <div className="modal-body row">
                                <div className="form-group col-12">
                                    <input type="text" className="form-control" value={this.state.currentModificationSectionTitle} id="title-description-modification-solution-admin" onChange={this.handleChangeInput} />
                                </div>

                                <div className="form-group col-10">
                                    <input type="text" className="form-control" value={this.state.currentModificationSectionDescriptionList} id="list-description-text-modification-solution-admin" onChange={this.handleChangeInput} />
                                </div>
                                <div className="div-btn-ajout-description-solution-admin col-2">
                                    {
                                        this.state.currentModificationSectionDescriptionList !== ""
                                            ?
                                            <button className="btn btn-primary" onClick={this.handleClickAddDescription}>+</button>
                                            :
                                            <button className="btn btn-secondary">+</button>
                                    }
                                </div>
                                <div className="div-list-description-solution-admin col-12">
                                    <ul>
                                        {
                                            this.state.currentModificationSectionDescription.map((description, index) => (
                                                <div key={index}>
                                                    <li key={index}>{description}</li>
                                                    <button className="btn btn-danger btn-sm" onClick={this.handleClickDeleteDescription.bind(this, index)}>X</button>
                                                </div>

                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalModificationCancel}>Annuler</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal ajout section 2 */}
                <div className="modal fade" id="AddSectionCurrentSolution" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ajout Section</h5>

                            </div>
                            <div className="modal-body row">
                                <div className="form-group col-12">
                                    <input type="text" className="form-control" value={this.state.currentModificationSectionTitle} id="title-description-modification-solution-admin" onChange={this.handleChangeInput} />
                                </div>

                                <div className="form-group col-10">
                                    <input type="text" className="form-control" value={this.state.currentModificationSectionDescriptionList} id="list-description-text-modification-solution-admin" onChange={this.handleChangeInput} />
                                </div>
                                <div className="div-btn-ajout-description-solution-admin col-2">
                                    {
                                        this.state.currentModificationSectionDescriptionList !== ""
                                            ?
                                            <button className="btn btn-primary" onClick={this.handleClickAddDescription}>+</button>
                                            :
                                            <button className="btn btn-secondary">+</button>
                                    }
                                </div>
                                <div className="div-list-description-solution-admin col-12">
                                    <ul>
                                        {
                                            this.state.currentModificationSectionDescription.map((description, index) => (
                                                <div key={index}>
                                                    <li key={index}>{description}</li>
                                                    <button className="btn btn-danger btn-sm" onClick={this.handleClickDeleteDescription.bind(this, index)}>X</button>
                                                </div>

                                            ))
                                        }
                                    </ul>
                                </div>
                                <div className="div-btn-validation-saisie col-12">
                                    <button type="button" className="btn btn-primary" onClick={this.handlerAddSection}>valider votre saisie</button>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalModificationCancel}>Annuler</button>

                                {this.state.inputValisationAddSection ?
                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button> :
                                    <button type="button" className="btn btn-secondary">Appliquer</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-secondary" onClick={this.closeWindowAddSolution}>Fermer le panneau des modifications</button>
            </div>
        )
    }
}

export default ModificationSolution;

