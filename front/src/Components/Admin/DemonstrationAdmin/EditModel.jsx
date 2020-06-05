import React, { Component } from 'react';

import postImages from './../../../utils/postImages';
import $ from "jquery";
import postModel from '../../../utils/postModel';
const path = require('path');


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class EditModel extends Component {
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

    componentDidMount(){
        console.log("cocou");
    }

    
    addNewShowroom = async () => {

        let dataHomepage = {
            'title': "showroom",
            'subtitle': "subtitle",
            'section': "demonstration_model",
            'description': "",
            'model_url': this.state.nameModel,
            "model_alt": this.state.altShowroom,
            "model_id": 0,
            'language': 0
        }

        let dataImage = {
            'name': this.state.nameImage,
            'url': this.state.urlImage,
            'alt': this.state.altImage,
            'homepage_id': 0,
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
                    dataHomepage.model_id = res.id;
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
            <div id="accordion">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h6 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Modification du model 3d
                        </button>
                        </h6>
                    </div>

                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="card-body">
                            <div className="div-upload-3d-model-admin-modification">
                                <h5>model 3d</h5>
                                <div className="custom-file ">
                                    <input type="file" className="custom-file-input" id="uploadFile3dShowroomAdmin" onChange={this.handlerUpload3dFile} />
                                    <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload un model 3D</label>
                                </div>
                            </div>
                            <div className="div-name-3d-model-admin-modification">
                                <div className="div-alt-model-3d">
                                    <h5 htmlFor="alt-3d-showroom-admin">Saisir le nom du model 3D</h5>
                                    <input type="text" value={this.state.altShowroom} className="form-control" id="alt-3d-showroom-admin" onChange={this.props.handleChangeInput} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.editShowroomSelected.name !== null && <div class="card">
                    <div class="card-header" id="headingTwo">
                        <h6 class="mb-0">
                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                modifier l'image associée au model 3d
                        </button>
                        </h6>
                    </div>
                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div class="card-body">
                            <div className="container-image">
                                <h5>image</h5>
                                <div className="custom-file">
                                    <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    <input type="file" className="custom-file-input" id="uploadFileImageShowroomAdmin" onChange={this.handlerUploadImage} />
                                </div>

                                <div className="div-alt-model-image">
                                    <label htmlFor="alt-image-showroom-admin" className="col-form-label">description de l'image</label>
                                    <input type="text" value={this.state.altImage} className="form-control" id="alt-image-showroom-admin" onChange={this.handleChangeInput} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}


export default EditModel;