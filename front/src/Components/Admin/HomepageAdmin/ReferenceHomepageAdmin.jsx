import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';
//import "./ReferenceHomepageAdmin.css";
import AjoutReferenceHomepage from './AjoutReferenceHomepage';
import DeleteReferenceHomepage from './DeleteReferenceHomepage';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ReferenceHomepageAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ReferenceHomepage: [],
            titreSection: "",

            /*reference*/
            titreReferenceHomepage: "",
            descriptionReferenceHomepage: "",
            urlImage: "",
            altImage: "",
            nameImage: "",
            document: null,
            ReferenceHomepageToDelete: null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,
            idToEdit: null,
            ReferenceHomepageToEdit: []

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

            case "titre-ReferenceHomepage-admin":
                this.setState({ titreReferenceHomepage: event.target.value });
                break;

            case "description-ReferenceHomepage-admin":
                this.setState({ descriptionReferenceHomepage: event.target.value });
                break;

            case "url-image-ReferenceHomepage-admin":
                this.setState({ urlImage: event.target.value });
                break;

            case "alt-image-ReferenceHomepage-admin":
                this.setState({ altImage: event.target.value });
                break;

            case "name-image-ReferenceHomepage-admin":
                this.setState({ nameImage: event.target.value });
                break;

            case "refId-image-ReferenceHomepage-admin":
                this.setState({ refIdImage: event.target.value });
                break;

            default:
                break;
        }
    }

    getReferenceHomepage = (id) => {
        let index = id;

        let ReferenceHomepageSelected = [];
        ReferenceHomepageSelected.push(this.state.ReferenceHomepage[index]);
        this.setState({
            ReferenceHomepageSelected: ReferenceHomepageSelected,
            titreReferenceHomepage: this.state.ReferenceHomepage[index].subtitle,
            descriptionReferenceHomepage: this.state.ReferenceHomepage[index].description,
            altImage: this.state.ReferenceHomepage[index].alt,
            urlImage: this.state.ReferenceHomepage[index].url,
            nameImage: this.state.ReferenceHomepage[index].name,
            refIdImage: this.state.ReferenceHomepage[index].homepage_id,
            titreSection: this.state.ReferenceHomepage[index].title,
            titreSection: this.state.ReferenceHomepage[index].title
        })
    }





    componentDidMount = () => {
        this.getStartedReferenceHomepage();
    }

    getStartedReferenceHomepage = async () => {
        const { locale } = this.props;

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let ReferenceHomepage = await getRessources("homepage", "reference", locale);

        this.setState({ ReferenceHomepage: ReferenceHomepage });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ ReferenceHomepage: "", ReferenceHomepageSelected: "", titreSection: "" });
            this.getStartedReferenceHomepage();
        }
    }


    closeModal = () => {
        this.setState({ descriptionReferenceHomepage: "" })
        this.getStartedReferenceHomepage();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    descriptionReferenceHomepage = () => {

        let ReferenceHomepage = this.state.ReferenceHomepageSelected;
        let description = this.state.ReferenceHomepageSelected[0].description;
        description.push(this.state.descriptionReferenceHomepage);
        ReferenceHomepage[0].description = description;
        this.setState({ descriptionReferenceHomepage: ReferenceHomepage[0].description, descriptionReferenceHomepage: "" });
    }

    deleteDescription = (index, event) => {

        let ReferenceHomepage = this.state.ReferenceHomepageSelected;
        let description = this.state.ReferenceHomepageSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionReferenceHomepage: ReferenceHomepage[0].description });
    }

    getIdReferenceHomepageToDelete = (index, event) => {
        let arrayIdReferenceHomepage = [];
        arrayIdReferenceHomepage.push(this.state.ReferenceHomepage[index].id);
        arrayIdReferenceHomepage.push(this.state.ReferenceHomepage[index].id_image);

        this.setState({ ReferenceHomepageToDelete: arrayIdReferenceHomepage });
    }

    getIdReferenceHomepageToEdit = (index, event) => {
        let arrayIdReferenceHomepage = [];
        arrayIdReferenceHomepage.push(this.state.ReferenceHomepage[index].id);
        arrayIdReferenceHomepage.push(this.state.ReferenceHomepage[index].id_image);
        this.getReferenceHomepage(index);
        this.setState({ ReferenceHomepageToEdit: arrayIdReferenceHomepage, idToEdit: index });
    }

    editDescription = (index, event) => {

        let ReferenceHomepage = this.state.ReferenceHomepageSelected;
        let description = this.state.ReferenceHomepageSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionReferenceHomepage: ReferenceHomepage[0].description });
    }

    editReferenceHomepage = () => {

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
            "subtitle": this.state.titreReferenceHomepage,
            "description": this.state.descriptionReferenceHomepage,
            "section": "reference",
            "language": language,
            "image_id": this.state.ReferenceHomepageToEdit[1]
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



        if (this.state.ReferenceHomepageSelected.length > 0) {

            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.ReferenceHomepageToEdit[1]}`;
            fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.ReferenceHomepageToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


            //on réactualise les spécialisations
            this.getStartedReferenceHomepage();
        }

    }


    render() {


        return (
            <div>
                <div>
                    <h1>Reference</h1>
                </div>

                <div>
                    <div className="pb-3 pt-3 ">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#new-ReferenceHomepage-admin">Ajout une reference</button>
                    </div>
                    <div className="position-tab pt-3">
                        <table className="table table-striped" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">titre de la section</th>
                                    <th scope="col">modification</th>
                                    <th scope="col">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.ReferenceHomepage.length > 0 &&
                                    this.state.ReferenceHomepage.map((element, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.title}</td>
                                            <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editReferenceHomepageAmdin" onClick={this.getIdReferenceHomepageToEdit.bind(this, index)}>Modifier</button>}</td>
                                            <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-ReferenceHomepage-admin" onClick={this.getIdReferenceHomepageToDelete.bind(this, index)}>Supprimer</button>}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



                {/* <!-- Nouvelle spécialisation --> */}

                <div class="modal fade" id="new-ReferenceHomepage-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvelle reference</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AjoutReferenceHomepage {...this.props} ReferenceHomepage={this.state.ReferenceHomepage} getStartedReferenceHomepage={this.getStartedReferenceHomepage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'une spécialisation --> */}
                <div class="modal fade" id="delete-ReferenceHomepage-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une reference</h5>
                            </div>
                            <div class="modal-body">
                                <DeleteReferenceHomepage ReferenceHomepage={this.state.ReferenceHomepage} ReferenceHomepageToDelete={this.state.ReferenceHomepageToDelete} getStartedReferenceHomepage={this.getStartedReferenceHomepage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'un savoir faire --> */}
                <div class="modal fade" id="editReferenceHomepageAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier une reference</h5>
                            </div>
                            <div class="modal-body">
                                {this.state.ReferenceHomepage.length > 0 && <div className="form-group">
                                    {!this.state.ReferenceHomepage.length > 0 &&                                   <div class="form-group">
                                        <label for="titre-section">Titre de la reference</label>
                                        <input class="form-control" value={this.state.titreReferenceHomepage} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                    </div>}
       

                                    <label htmlFor="alt-image-ReferenceHomepage-admin" className="col-form-label col-form-label-sm">description de l'image</label>
                                    <div className="">
                                        <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-ReferenceHomepage-admin" onChange={this.handleChangeInput} />
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" className="custom-file-input" onChange={this.handlerUploadFile} />
                                        <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    </div>
                                </div>}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="titre-ReferenceHomepage-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                { this.state.titreSection !== "" && this.state.altImage !== "" && this.state.document !== null 
                                ? <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.editReferenceHomepage}>Appliquer</button>
                                : <button type="button" class="btn btn-secondary">Appliquer</button>
}                            </div>
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

export default ReferenceHomepageAdmin;