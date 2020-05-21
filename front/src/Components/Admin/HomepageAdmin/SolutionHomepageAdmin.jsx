import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';
//import "./SolutionHomepageAdmin.css";
 import AjoutSolutionHomepage from './AjoutSolutionHomepage';
import DeleteSolutionHomepage from './DeleteSolutionHomepage';
 
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SolutionHomepageAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            SolutionHomepage: [],
            titreSection: "",

            /*savoir-faire*/
            titreSolutionHomepage: "",
            descriptionSolutionHomepage: "",
            urlImage: "",
            altImage: "",
            nameImage: "",
            document: null,
            SolutionHomepageToDelete: null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,
            idToEdit: null,
            SolutionHomepageToEdit: []

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

            case "titre-SolutionHomepage-admin":
                this.setState({ titreSolutionHomepage: event.target.value });
                break;

            case "description-SolutionHomepage-admin":
                this.setState({ descriptionSolutionHomepage: event.target.value });
                break;

            case "url-image-SolutionHomepage-admin":
                this.setState({ urlImage: event.target.value });
                break;

            case "alt-image-SolutionHomepage-admin":
                this.setState({ altImage: event.target.value });
                break;

            case "name-image-SolutionHomepage-admin":
                this.setState({ nameImage: event.target.value });
                break;

            case "refId-image-SolutionHomepage-admin":
                this.setState({ refIdImage: event.target.value });
                break;

            default:
                break;
        }
    }

    getSolutionHomepage = (id) => {
        let index = id;

        let SolutionHomepageSelected = [];
        SolutionHomepageSelected.push(this.state.SolutionHomepage[index]);
        this.setState({
            SolutionHomepageSelected: SolutionHomepageSelected,
            titreSolutionHomepage: this.state.SolutionHomepage[index].subtitle,
            descriptionSolutionHomepage: this.state.SolutionHomepage[index].description,
            altImage: this.state.SolutionHomepage[index].alt,
            urlImage: this.state.SolutionHomepage[index].url,
            nameImage: this.state.SolutionHomepage[index].name,
            refIdImage: this.state.SolutionHomepage[index].homepage_id,
            titreSection: this.state.SolutionHomepage[index].title,
            titreSection: this.state.SolutionHomepage[index].title
        })
    }





    componentDidMount = () => {
        this.getStartedSolutionHomepage();
    }

    getStartedSolutionHomepage = async () => {
        const { locale } = this.props;

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let SolutionHomepage = await getRessources("homepage", "solution", locale);
        this.setState({ SolutionHomepage: SolutionHomepage });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ SolutionHomepage: "", SolutionHomepageSelected: "", titreSection: "" });
            this.getStartedSolutionHomepage();
        }
    }


    closeModal = () => {
        this.setState({ descriptionSolutionHomepage: "" })
        this.getStartedSolutionHomepage();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    descriptionSolutionHomepage = () => {

        let SolutionHomepage = this.state.SolutionHomepageSelected;
        let description = this.state.SolutionHomepageSelected[0].description;
        description.push(this.state.descriptionSolutionHomepage);
        SolutionHomepage[0].description = description;
        this.setState({ descriptionSolutionHomepage: SolutionHomepage[0].description, descriptionSolutionHomepage: "" });
    }

    deleteDescription = (index, event) => {

        let SolutionHomepage = this.state.SolutionHomepageSelected;
        let description = this.state.SolutionHomepageSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionSolutionHomepage: SolutionHomepage[0].description });
    }

    getIdSolutionHomepageToDelete = (index, event) => {
        let arrayIdSolutionHomepage = [];
        arrayIdSolutionHomepage.push(this.state.SolutionHomepage[index].id);
        arrayIdSolutionHomepage.push(this.state.SolutionHomepage[index].id_image);

        this.setState({ SolutionHomepageToDelete: arrayIdSolutionHomepage });
    }

    getIdSolutionHomepageToEdit = (index, event) => {
        let arrayIdSolutionHomepage = [];
        arrayIdSolutionHomepage.push(this.state.SolutionHomepage[index].id);
        arrayIdSolutionHomepage.push(this.state.SolutionHomepage[index].id_image);
        this.getSolutionHomepage(index);
        this.setState({ SolutionHomepageToEdit: arrayIdSolutionHomepage, idToEdit: index });
    }

    editDescription = (index, event) => {

        let SolutionHomepage = this.state.SolutionHomepageSelected;
        let description = this.state.SolutionHomepageSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionSolutionHomepage: SolutionHomepage[0].description });
    }

    editSolutionHomepage = () => {

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
            "subtitle": this.state.titreSolutionHomepage,
            "description": this.state.descriptionSolutionHomepage,
            "section": "solution",
            "language": language,
            "image_id": this.state.SolutionHomepageToEdit[1]
        };

        let dataImage = {
            "name": this.state.nameImage,
            "url": this.state.urlImage,
            "alt": this.state.altImage,
            "section": "solution",
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



        if (this.state.SolutionHomepageSelected.length > 0) {

            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.SolutionHomepageToEdit[1]}`;
            fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.SolutionHomepageToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


            //on réactualise les spécialisations
            this.getStartedSolutionHomepage();
        }

    }


    render() {


        return (
            <div>
                <div>
                    <h1>Solution</h1>
                </div>

                <div>
                    <div className="pb-3 pt-3 ">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#new-SolutionHomepage-admin">Ajout une solution</button>
                    </div>
                    <div className="position-tab pt-3">
                        <table className="table table-striped" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">titre de la section</th>
                                    <th scope="col">nom de la Solution</th>
                                    <th scope="col">modification</th>
                                    <th scope="col">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.SolutionHomepage.length > 0 &&
                                    this.state.SolutionHomepage.map((element, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.title}</td>
                                            <td>{element.subtitle}</td>
                                            <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editSolutionHomepageAmdin" onClick={this.getIdSolutionHomepageToEdit.bind(this, index)}>Modifier</button>}</td>
                                            <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-SolutionHomepage-admin" onClick={this.getIdSolutionHomepageToDelete.bind(this, index)}>Supprimer</button>}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



                {/* <!-- Nouvelle spécialisation --> */}

                <div class="modal fade" id="new-SolutionHomepage-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvelle solution</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AjoutSolutionHomepage {...this.props} SolutionHomepage={this.state.SolutionHomepage} getStartedSolutionHomepage={this.getStartedSolutionHomepage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'une spécialisation --> */}
                <div class="modal fade" id="delete-SolutionHomepage-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une solution</h5>
                            </div>
                            <div class="modal-body">
                                <DeleteSolutionHomepage SolutionHomepage={this.state.SolutionHomepage} SolutionHomepageToDelete={this.state.SolutionHomepageToDelete} getStartedSolutionHomepage={this.getStartedSolutionHomepage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'un savoir faire --> */}
                <div class="modal fade" id="editSolutionHomepageAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier une solution</h5>
                            </div>
                            <div class="modal-body">
                                {this.state.SolutionHomepage.length > 0 && <div className="form-group">
                                    <div class="form-group">
                                        <label for="titre-section">Titre de la solution</label>
                                        <input class="form-control" value={this.state.titreSection} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                    </div>
                                    <label>Saisir le titre de la solution</label>
                                    <input type="text" className="form-control" value={this.state.titreSolutionHomepage} id="titre-SolutionHomepage-admin" onChange={this.handleChangeInput} />

                                    <label>Saisir une description</label>
                                    <textarea type="text" value={this.state.descriptionSolutionHomepage} className="form-control" id="description-SolutionHomepage-admin" onChange={this.handleChangeInput} />


                                    <label htmlFor="alt-image-SolutionHomepage-admin" className="col-form-label col-form-label-sm">description de l'image</label>
                                    <div className="">
                                        <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-SolutionHomepage-admin" onChange={this.handleChangeInput} />
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" className="custom-file-input" onChange={this.handlerUploadFile} />
                                        <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    </div>
                                </div>}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="titre-SolutionHomepage-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.editSolutionHomepage}>Appliquer</button>
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

export default SolutionHomepageAdmin;