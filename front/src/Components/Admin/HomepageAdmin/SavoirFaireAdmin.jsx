import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';
//import "./SavoirFaireAdmin.css";
import AjoutSavoirFaire from './AjoutSavoirFaire';
import DeleteSavoirFaire from './DeleteSavoirFaire';
import $ from "jquery";


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SavoirFaireAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            savoirFaire: [],
            titreSection: "",

            /*savoir-faire*/
            titreSavoirFaire: "",
            descriptionSavoirFaire: "",
            urlImage: "",
            altImage: "",
            nameImage: "",
            document: null,
            SavoirFaireToDelete: null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,
            idToEdit: null,
            SavoirFaireToEdit: []

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
            case "titre-section-savoirFaire":
                this.setState({ titreSection: event.target.value });
                break;

            case "titre-savoirFaire-admin":
                this.setState({ titreSavoirFaire: event.target.value });
                break;

            case "description-savoirFaire-admin":
                this.setState({ descriptionSavoirFaire: event.target.value });
                break;

            case "url-image-savoirFaire-admin":
                this.setState({ urlImage: event.target.value });
                break;

            case "alt-image-savoirFaire-admin":
                this.setState({ altImage: event.target.value });
                break;

            case "name-image-savoirFaire-admin":
                this.setState({ nameImage: event.target.value });
                break;

            case "refId-image-savoirFaire-admin":
                this.setState({ refIdImage: event.target.value });
                break;

            default:
                break;
        }
    }

    getSavoirFaire = (id) => {
        let index = id;

        let SavoirFaireSelected = [];
        SavoirFaireSelected.push(this.state.savoirFaire[index]);
        this.setState({
            SavoirFaireSelected: SavoirFaireSelected,
            titreSavoirFaire: this.state.savoirFaire[index].subtitle,
            descriptionSavoirFaire: this.state.savoirFaire[index].description,
            altImage: this.state.savoirFaire[index].alt,
            urlImage: this.state.savoirFaire[index].url,
            nameImage: this.state.savoirFaire[index].name,
            refIdImage: this.state.savoirFaire[index].homepage_id,
            titreSection: this.state.savoirFaire[index].title        })
    }





    componentDidMount = () => {
        this.getStartedSavoirFaire();
    }

    getStartedSavoirFaire = async () => {
        const { locale } = this.props;

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let savoirFaire = await getRessources("homepage", "SavoirFaire", locale);

        this.setState({ savoirFaire: savoirFaire });

    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ savoirFaire: "", SavoirFaireSelected: "", titreSection: "" });
            this.getStartedSavoirFaire();
        }
    }


    closeModal = () => {
        this.setState({ descriptionSavoirFaire: "" })
        this.getStartedSavoirFaire();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    descriptionSavoirFaire = () => {

        let savoirFaire = this.state.SavoirFaireSelected;
        let description = this.state.SavoirFaireSelected[0].description;
        description.push(this.state.descriptionSavoirFaire);
        savoirFaire[0].description = description;
        this.setState({ descriptionSavoirFaire: savoirFaire[0].description});
    }

    deleteDescription = (index, event) => {

        let savoirFaire = this.state.SavoirFaireSelected;
        let description = this.state.SavoirFaireSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionSavoirFaire: savoirFaire[0].description });
    }

    getIdSavoirFaireToDelete = (index, event) => {
        let arrayIdSavoirFaire = [];
        arrayIdSavoirFaire.push(this.state.savoirFaire[index].id);
        arrayIdSavoirFaire.push(this.state.savoirFaire[index].id_image);

        this.setState({ SavoirFaireToDelete: arrayIdSavoirFaire });
    }

    getIdSavoirFaireToEdit = (index, event) => {
        let arrayIdSavoirFaire = [];
        arrayIdSavoirFaire.push(this.state.savoirFaire[index].id);
        arrayIdSavoirFaire.push(this.state.savoirFaire[index].id_image);
        this.getSavoirFaire(index);
        this.setState({ SavoirFaireToEdit: arrayIdSavoirFaire, idToEdit: index });
    }

    editDescription = (index, event) => {

        let savoirFaire = this.state.SavoirFaireSelected;
        let description = this.state.SavoirFaireSelected[0].description;

        description.splice(index, 1);

        this.setState({ descriptionSavoirFaire: savoirFaire[0].description });
    }

    editSavoirFaire = () => {

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
            for (let  [,value] of Object.entries(arrayLang[i])) {
                if (locale === value) {
                    language = arrayLang[i].id;
                }
            }
        }

        let data = {
            "title": this.state.titreSection,
            "subtitle": this.state.titreSavoirFaire,
            "description": this.state.descriptionSavoirFaire,
            "section": "savoirFaire",
            "language": language,
            "image_id": this.state.SavoirFaireToEdit[1]
        };

        let dataImage = {
            "name": this.state.nameImage,
            "url": this.state.urlImage,
            "alt": this.state.altImage,
            "section": "savoirFaire",
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





            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            
            this.state.document !== null && fetch(url, options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.SavoirFaireToEdit[1]}`;
            fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.SavoirFaireToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


            //on réactualise les spécialisations
            this.getStartedSavoirFaire();
            $("#uploadFileEditSavoirFaireAdmin")[0].value = "";
     

    }


    render() {


        return (
            <div>
                <div>
                    <h1>Savoir-Faire</h1>
                </div>

                <div>
                    <div className="pb-3 pt-3 ">
                        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#new-savoirFaire-admin">Ajouter un savoir-faire</button>
                    </div>
                    <div className="position-tab pt-3">
                        <table className="table table-striped" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">titre de la section</th>
                                    <th scope="col">nom du savoir-faire</th>
                                    <th scope="col">modification</th>
                                    <th scope="col">Supprimer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.savoirFaire.length > 0 &&
                                    this.state.savoirFaire.map((element, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{element.title}</td>
                                            <td>{element.subtitle}</td>
                                            <td> {<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editSavoirFaireAmdin" onClick={this.getIdSavoirFaireToEdit.bind(this, index)}>Modifier</button>}</td>
                                            <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-savoirFaire-admin" onClick={this.getIdSavoirFaireToDelete.bind(this, index)}>Supprimer</button>}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



                {/* <!-- Nouvelle spécialisation --> */}

                <div className="modal fade" id="new-savoirFaire-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Nouveau savoir-faire</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AjoutSavoirFaire {...this.props} savoirFaire={this.state.savoirFaire} getStartedSavoirFaire={this.getStartedSavoirFaire} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'une spécialisation --> */}
                <div className="modal fade" id="delete-savoirFaire-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression d'un savoir-faire</h5>
                            </div>
                            <div className="modal-body">
                                <DeleteSavoirFaire savoirFaire={this.state.savoirFaire} SavoirFaireToDelete={this.state.SavoirFaireToDelete} getStartedSavoirFaire={this.getStartedSavoirFaire} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'un savoir faire --> */}
                <div className="modal fade" id="editSavoirFaireAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier un savoir-faire</h5>
                            </div>
                            <div className="modal-body">
                                {this.state.savoirFaire.length > 0 && <div className="form-group">
                                    <div className="form-group">
                                        <label htmlFor="titre-section">Titre de la section savoir-faire</label>
                                        <input className="form-control" value={this.state.titreSection} id="titre-section-savoirFaire" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                    </div>
                                    <label>Saisir le titre du savoir-faire</label>
                                    <input type="text" className="form-control" value={this.state.titreSavoirFaire} id="titre-savoirFaire-admin" onChange={this.handleChangeInput} />

                                    <label>Saisir la description du savoir-faire</label>
                                    <textarea type="text" value={this.state.descriptionSavoirFaire} className="form-control" id="description-savoirFaire-admin" onChange={this.handleChangeInput} />


                                    <label htmlFor="alt-image-savoirFaire-admin" className="col-form-label col-form-label-sm">alt de l'image (SEO)</label>
                                    <div className="">
                                        <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-savoirFaire-admin" onChange={this.handleChangeInput} />
                                    </div>

                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="uploadFileEditSavoirFaireAdmin" onChange={this.handlerUploadFile} />
                                        <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    </div>
                                </div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="titre-savoirFaire-admin-Fermer" data-dismiss="modal" onClick={this.closeModal}>Fermer</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editSavoirFaire}>Enregistrer</button>
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

export default SavoirFaireAdmin;