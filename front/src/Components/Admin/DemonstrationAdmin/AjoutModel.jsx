import React, { Component } from 'react';

import postImages from './../../../utils/postImages';
import $ from "jquery";
import postModel from '../../../utils/postModel';
const path = require('path');


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class AjoutModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showroom: [],

            // state image
            urlImage: "",
            altImage: "",
            nameImage: "",
            showroomToDelete: null,
            documentImage: null,
            urlImage: "",
            altImage: "",
            nameImage: "",

            // state model
            altShowroom: "",
            document: null,
            urlIModel: "",
            altModel: "",
            nameModel: "",

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,
            idToEdit: null,

            checkboxImage: false
        }
    }

    handleChangeInput = (event) => {

        switch (event.target.id) {
            case "alt-3d-showroom-admin":
                this.setState({ altShowroom: event.target.value });
                break;

            case "alt-image-showroom-admin":
                this.setState({ altImage: event.target.value });
                break;

            default:
                break;
        }
    }

    handlerOnlickCheckBox = ({ target: { checked } }) => {
        this.setState({ checkboxImage: checked });
    }

    addDescription = () => {


        let description = [];
        description.push(this.state.addDescription);

        this.setState({ arrayDescription: [...this.state.arrayDescription, this.state.addDescription], addDescription: "" });
    }

    deleteDescription = (index, event) => {


        let description = this.state.arrayDescription;

        description.splice(index, 1);
        console.log(description);

        this.setState({ arrayDescription: description });
    }

    editDescription = (index, event) => {

        let specialisation = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: specialisation[0].description });
    }

    async fetch() {

    }

    addNewShowroom = async () => {

        let dataHomepage = {
            'title': "showroom",
            'subtitle': "subtitle",
            'section': "demonstration_model",
            'description': "",
            'model_url': this.state.nameModel,
            "model_alt": this.state.altShowroom,
            "image_id": null,
            'language_id': this.props.language_id
        }

        let dataImage = {
            'name': this.state.nameImage,
            'url': this.state.urlImage,
            'alt': this.state.altImage,
            'section': "showroom"
        }

        const data = new FormData()
        data.append('file', this.state.document)

        //post 3d file
        await postModel(data);

        function init(file) {
            const options = {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
                body: JSON.stringify(file)
            }
            return options;
        }

        let url;
        if (this.state.checkboxImage) {
            url = REACT_APP_SERVER_ADDRESS_FULL + '/api/image';

            fetch(url, init(dataImage))
                .then(res => res.json())
                .then(res => {
                    console.log(res.id);
                    dataHomepage.image_id = res.id;
                })

            const uploadImage = new FormData()
            uploadImage.append('file', this.state.documentImage);

            await postImages(uploadImage);

            url = REACT_APP_SERVER_ADDRESS_FULL + '/api/demonstration';
            fetch(url, init(dataHomepage))
                .then(res => res.json())
        } else {
            url = REACT_APP_SERVER_ADDRESS_FULL + '/api/demonstration';
            fetch(url, init(dataHomepage))
                .then(res => res.json())
        }

        this.setState({ altImage: "", altShowroom: "", nameImage: "", urlImage: "", titreShowroom: "", titreSection: "", document: null, documentImage: null });
        this.props.getStartedModel();
        $("#uploadFile3dShowroomAdmin")[0].value = "";
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    // fonction pour importer des fichiers de type image
    handlerUploadImage = event => {
        const format_type = [
            "image/jpg",
            "image/jpeg",
            "image/png",
            "image/gif"
        ];

        let file = event.target.files[0] ? event.target.files[0] : "";

        if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {

            this.setState({ documentImage: file, urlImage: REACT_APP_SERVER_ADDRESS_FULL + "/images/" + file.name, nameImage: file.name });
        } else {
            this.setState({ isTooHeavy: true });
            event.target.value = "";
            this.setState({ isActive: true });
        }

    };

    // fonction pour importer des fichiers de type 3d
    handlerUpload3dFile = event => {
        const format_type = [
            ".gltf",
            ".glb"
        ];

        let file = event.target.files[0] ? event.target.files[0] : "";

        if (format_type.includes(path.extname(event.target.files[0].name))) {

            this.setState({ document: file, urlModel: REACT_APP_SERVER_ADDRESS_FULL + "/model/" + file.name, nameModel: file.name });
        } else {
            this.setState({ isTooHeavy: true });
            event.target.value = "";
            this.setState({ isActive: true });
        }
    };


    resetInput = () => {
        this.setState({
            altImage: "",
            altShowroom: "",
            nameImage: "",
            urlImage: "",
            titreShowroom: "",
            titreSection: "",
            document: null,
            documentImage: ""
        });
    }

    render() {

        return (
            <div>
                <form>
                    <div className="form-group">
                        <div className="container-3d mb-4">
                            <h5>Model 3d</h5>
                            <div className="custom-file ">
                                <input type="file" className="custom-file-input" id="uploadFile3dShowroomAdmin" onChange={this.handlerUpload3dFile} />
                                <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload un model 3D</label>
                            </div>

                            <div className="div-alt-model-3d">
                                <label htmlFor="alt-3d-showroom-admin">Saisir le nom du model 3D</label>
                                <input type="text" value={this.state.altShowroom} className="form-control" id="alt-3d-showroom-admin" onChange={this.handleChangeInput} />
                            </div>
                        </div>

                        <hr></hr>

                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="haveImageWith5dModel" onClick={this.handlerOnlickCheckBox} />
                            <label className="custom-control-label" htmlFor="haveImageWith5dModel">ajouter une image associée au model 3d (facultatif) </label>
                        </div>

                        {this.state.checkboxImage &&
                            <div className="container-image">
                                <h5>Image</h5>
                                <div className="custom-file">
                                    <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    <input type="file" className="custom-file-input" id="uploadFile3dShowroomAdmin" onChange={this.handlerUploadImage} />
                                </div>

                                <div className="div-alt-model-image">
                                    <label htmlFor="alt-image-showroom-admin" className="col-form-label">alt de l'image (SEO)</label>
                                    <input type="text" value={this.state.altImage} className="form-control" id="alt-image-showroom-admin" onChange={this.handleChangeInput} />
                                </div>
                            </div>}
                    </div>

                </form>
                <div className="modal-footer pt-1">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.resetInput}>Fermer</button>
                    {this.state.document !== null && this.state.altShowroom !== "" ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewShowroom}>Enregistrer</button>
                        :
                        <button type="button" className="btn btn-secondary">Enregistrer</button>
                    }
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
        )
    }
}


export default AjoutModel;