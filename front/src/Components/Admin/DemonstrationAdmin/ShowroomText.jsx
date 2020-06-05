import React, { Component } from 'react';
import AjoutText from './AjoutText';
import DeleteText from './DeleteText';
import getRessources from './../../../utils/getRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ShowroomText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataText: [],
            title: "",
            description: "",
            labelMenuDrop: "",
            ShowroomToEdit: null,
            ShowroomToDelete: null,

            idToEdit: null
        }
    }



    handleChangeInput = (event) => {
        switch (event.target.id) {

            case "title-showroom-admin-2":
                this.setState({ title: event.target.value });
                break;

            case "description-showroom-admin-2":
                this.setState({ description: event.target.value });
                break;

            case "label-labelMenuDrop-showroom-admin-2":
                this.setState({ labelMenuDrop: event.target.value });
                break;

            default:
                break;
        }
    }



    componentDidMount = () => {
        this.getStartedText();
    }

    getStartedText = async () => {
        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let data = await getRessources('demonstration/text', 'demonstration_text', this.props.locale);
        let description = data.length > 0 ? JSON.parse(data[0].description) : "";
        let labelMenuDrop = data.length > 0 ? description.labelMenuDrop : "";

        let titre = data.length > 0 ? data[0].title : "";
        description = description.description;

        this.setState({ dataText: data, description: description, labelMenuDrop: labelMenuDrop, title: titre });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ dataText: [], title: "", description: "",labelMenuDrop:"" });
            this.getStartedText();
        }
    }


    closeModal = () => {
        this.setState({ dataText: [], title: "", description: "",labelMenuDrop:"" });
        this.getStartedText();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false });
    };

    getIdShowroomToEdit = (index, event) => {
        this.setState({ ShowroomToEdit: this.state.dataText[index].id });
    }

    getIdShowroomToDelete = (index, event) => {
        this.setState({ ShowroomToDelete: this.state.dataText[index].id });
    }


    editShowroom = () => {

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
            for (let [ ,value] of Object.entries(arrayLang[i])) {
                if (locale === value) {
                    language = arrayLang[i].id;
                }
            }
        }

        let obj = {};
        obj.description = this.state.description;
        obj.labelMenuDrop = this.state.labelMenuDrop;


        let dataShowroom = {
            'title': this.state.title,
            'subtitle': "",
            'section': "demonstration_text",
            'description': JSON.stringify(obj),
            'model_url': "",
            'model_alt': "",
            'model_id': "",
            'language': language
        }

        console.log("avant trasfert :", dataShowroom);


        // fetch pour modification des champs de la table demonstration
        let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/demonstration/${this.state.ShowroomToEdit}`;
        fetch(url, init(dataShowroom)).then(res => res.json()).then(res => console.log(res));


        //on réactualise les spécialisations
        this.getStartedText();
    }



    render() {


        return (
            <div>
                <div>
                    <h1>Text showroom</h1>
                </div>

                {!this.state.dataText.length > 0 && <div className="pt-3 pb-3">
                    <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#new-text-showroom-admin">Nouveau titre / description</button>
                </div>
                }
                <div className="position-tab pt-3 ">

                    <table className="table table-striped" style={{ width: "75%" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">titre</th>
                                <th scope="col">description</th>
                                <th scope="col">modification</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataText.length > 0 &&
                                this.state.dataText.map((element, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{element.title}</td>
                                        <td>{this.state.description}</td>
                                        <td> {<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editShowroomAmdin" onClick={this.getIdShowroomToEdit.bind(this, index)}>Modifier</button>}</td>
                                        <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-Showroom-admin" onClick={this.getIdShowroomToDelete.bind(this, index)}>Supprimer</button>}</td>

                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>


                {/* <!-- Nouveau titre / description --> */}

                <div className="modal fade" id="new-text-showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="new-text-showroom-admin" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="new-text-showroom-admin">Ajout un titre / description</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AjoutText {...this.props} dataText={this.state.dataText} getStartedText={this.getStartedText} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'un texte / description  --> */}
                <div className="modal fade" id="delete-Showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression d'une spécialisation</h5>
                            </div>
                            <div className="modal-body">
                                <DeleteText showroom={this.state.dataText} ShowroomToDelete={this.state.ShowroomToDelete} getStartedText={this.getStartedText} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Modification d'un titre /description / labelbtnDrop --> */}
                <div className="modal fade" id="editShowroomAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modifier un titre / une description</h5>
                            </div>
                            <div className="modal-body">
                                {this.state.dataText.length > 0 && <div className="form-group">
                                    <div className="form-group ">
                                        <label htmlFor="title-showroom-admin-2" className="col-form-label">titre</label>
                                        <div className="">
                                            <input type="text" value={this.state.title} className="form-control" id="title-showroom-admin-2" onChange={this.handleChangeInput} />
                                        </div>

                                        <label>texte</label>
                                        <textarea type="text" value={this.state.description} className="form-control" id="description-showroom-admin-2" onChange={this.handleChangeInput} />

                                        <label htmlFor="label-labelMenuDrop-showroom-admin-2" className="col-form-label">label du menu déroulant (model 3d)</label>
                                        <div className="">
                                            <input type="text" value={this.state.labelMenuDrop} className="form-control" id="label-labelMenuDrop-showroom-admin-2" onChange={this.handleChangeInput} />
                                        </div>
                                    </div>

                                </div>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="titre-showroom-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editShowroom}>Appliquer</button>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default ShowroomText;