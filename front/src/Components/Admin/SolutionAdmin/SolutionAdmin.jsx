import NavBarAdmin from '../NavBarAdmin/NavBar';
import React, { Component } from 'react';
import AjoutsolutionAdmin from './AjoutSolution';
import DeletesolutionAdmin from './DeleteSolution';
import getRessources from './../../../utils/getRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




class SolutionAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            solutionAdmin: [],
            titreSection: "",
            specSelected: [],

            /*scpecialisation*/
            titreSpec: "",
            description: "",
            arrayDescription: [],
            urlImage: "",
            altImage: "",
            nameImage: "",
            refIdImage: null,
            document: null,

            addDescription: "",
            specToDelete: null,
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive: true,

            idToEdit: null,
            specToEdit: [],
            

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

            case "refId-image-spec-admin":
                this.setState({ refIdImage: event.target.value });
                break;

            default:
                break;
        }
    }

    getsolutionAdmin = (id) => {
        let index = id;

        let specSelected = [];
        specSelected.push(this.state.solutionAdmin[index]);
        this.setState({
            specSelected: specSelected,
            titreSpec: this.state.solutionAdmin[index].subtitle,
            arrayDescription: this.state.solutionAdmin[index].description,
            altImage: this.state.solutionAdmin[index].alt,
            urlImage: this.state.solutionAdmin[index].url,
            nameImage: this.state.solutionAdmin[index].name,
            refIdImage: this.state.solutionAdmin[index].homepage_id,
            titreSection: this.state.solutionAdmin[index].title,
            titreSection: this.state.solutionAdmin[index].title
        })
    }



    getTextToList(data) {
        //variable objet qui servira à accueillir les données
        let objet = data;
        //variable array_description qui servira a convertir le contenu description en tableau grace au slash
        let array_description = data.description.split('/');
        //on remplace le contenu description de l'objet.description par la nouvelle description
        objet.description = array_description;
        //on met a jour le state avec la nouvelle valeur [solutionAdmin=state:[...this.state.solutionAdmin=state actuel,objet=variable objet qui contient les nouvelles données]]
        this.setState({ solutionAdmin: [...this.state.solutionAdmin, objet] });
    }

    componentDidMount = () => {
        
        this.getStartedsolutionAdmin();
    }
    



 

    getStartedsolutionAdmin = async () => {


        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }),
        }

        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/solution/all';

        const data = await (await (fetch(url, options))).json();
        /* this.setState({ solutionAdmin: [] }); */
        console.log(data)
        let idLang;
        let dataSolution = [];

        for (let i in this.props.arrayLang) {
            if (Object.values(this.props.arrayLang[i]).includes(this.props.locale)) {
                idLang = Object.values(this.props.arrayLang[i])[2];
            }
        }
        





        for (let i = 0; i < data.length; i++) {
            if (data[i].language === idLang) {
                dataSolution.push(data[i])
            }
        };
        console.log(dataSolution)
        //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
        /*  for (let i = 0; i < data.length; i++) {
             this.getTextToList(data[i]);
         } */
    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ solutionAdmin: "", specSelected: "", titreSection: "" });
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

        let solutionAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;
        description.push(this.state.addDescription);
        solutionAdmin[0].description = description;
        this.setState({ arrayDescription: solutionAdmin[0].description, addDescription: "" });
    }

    deleteDescription = (index, event) => {

        let solutionAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: solutionAdmin[0].description });
    }

    getIdSpecToDelete = (index, event) => {
        let arrayIdSpec = [];
        arrayIdSpec.push(this.state.solutionAdmin[index].id);
        arrayIdSpec.push(this.state.solutionAdmin[index].id_image);

        this.setState({ specToDelete: arrayIdSpec });
    }

    getIdSpecToEdit = (index, event) => {
        let arrayIdSpec = [];
        arrayIdSpec.push(this.state.solutionAdmin[index].id);
        arrayIdSpec.push(this.state.solutionAdmin[index].id_image);
        this.getsolutionAdmin(index);
        this.setState({ specToEdit: arrayIdSpec, idToEdit: index });
    }

    editDescription = (index, event) => {

        let solutionAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: solutionAdmin[0].description });
    }

    editsolutionAdmin = () => {

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
            "subtitle": this.state.titreSpec,
            "description": this.state.arrayDescription.join("/"),
            "section": "solutionAdmin",
            "language": language,
            "image_id": this.state.specToEdit[1]
        };

        let dataImage = {
            "name": this.state.nameImage,
            "url": this.state.urlImage,
            "alt": this.state.altImage,
            "section": "solutionAdmin",
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



        if (this.state.specSelected.length > 0) {

            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.specToEdit[1]}`;
            fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.specToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


            //on réactualise les spécialisations
            this.getStartedsolutionAdmin();
        }


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

                <div >
                    <div className="pt-3 pb-3">
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#new-solutionAdmin-admin">Ajout spécialisation</button>
                    </div>
                    <div>
                        <select class="form-control " id="exampleFormControlSelect1" style={{ width: "4%", display: 'inline-block' }} onChange={this.handleChangeLang}>
                            {options}
                        </select>
                    </div>
                    <div className="position-tab pt-3">
                        <table className="table table-striped" style={{ width: "75%" }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">titre de la section</th>
                                    <th scope="col">nom de la spécialisation</th>
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
                                            <td>{element.subtitle}</td>
                                            <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editSpecAmdin" onClick={this.getIdSpecToEdit.bind(this, index)}>Modifier</button>}</td>
                                            <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-solutionAdmin-admin" onClick={this.getIdSpecToDelete.bind(this, index)}>Supprimer</button>}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



                {/* <!-- Nouvelle spécialisation --> */}

                <div class="modal fade" id="new-solutionAdmin-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvelle spécialisation</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AjoutsolutionAdmin {...this.props} solutionAdmin={this.state.solutionAdmin} getStartedsolutionAdmin={this.getStartedsolutionAdmin} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'une spécialisation --> */}
                <div class="modal fade" id="delete-solutionAdmin-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une spécialisation</h5>
                            </div>
                            <div class="modal-body">
                                <DeletesolutionAdmin solutionAdmin={this.state.solutionAdmin} specToDelete={this.state.specToDelete} getStartedsolutionAdmin={this.getStartedsolutionAdmin} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'une spécialité --> */}
                <div class="modal fade" id="editSpecAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier une spécialité</h5>
                            </div>
                            <div class="modal-body">
                                {this.state.specSelected.length > 0 && <div className="form-group">
                                    <div class="form-group">
                                        <label for="titre-section">Titre section</label>
                                        <input class="form-control form-control-sm" value={this.state.titreSection} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                                    </div>
                                    <label>Saisir le titre de la spécialité</label>
                                    <input type="text" className="form-control form-control-sm" value={this.state.titreSpec} id="titre-spec-admin" onChange={this.handleChangeInput} />

                                    <label>Saisir une description</label>
                                    <textarea type="text" value={this.state.addDescription} className="form-control form-control-sm" id="addDescription-spec-admin" onChange={this.handleChangeInput} />
                                    <button type="button" class="btn btn-primary" onClick={this.addDescription}>Ajouter une description</button>
                                    <div className="description-spec-admin-modal">
                                        <ul>
                                            {this.state.specSelected.length > 0 && this.state.specSelected[0].description.map((description, index) => (
                                                <div>
                                                    <li key={index}>{description} {"  "}<button type="button" class="btn btn-primary" onClick={this.deleteDescription.bind(this, index)}>X</button></li>

                                                </div>


                                            ))}
                                        </ul>

                                    </div>

                                    <label htmlFor="alt-image-spec-admin" className="col-form-label col-form-label-sm">description de l'image</label>
                                    <div className="">
                                        <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-spec-admin" onChange={this.handleChangeInput} />
                                    </div>

                                    <div class="custom-file">
                                        <input type="file" className="custom-file-input" onChange={this.handlerUploadFile} />
                                        <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                    </div>
                                </div>}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="titre-spec-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.editsolutionAdmin}>Appliquer</button>
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
        );
    }
}

export default SolutionAdmin;