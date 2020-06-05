import React, { Component } from 'react';
import AjoutModel from './AjoutModel';
import EditModel from './EditModel';
import DeleteModel from './DeleteModel';
import getRessources from './../../../utils/getRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ShowroomModel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataModel: [],
            title: "",
            description: "",
            labelMenuDrop: "",
            ShowroomToEdit: null,
            ShowroomToDelete: null,

            idToEdit: null,
            editShowroomSelected: []
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
        this.getStartedModel();
    }

    getStartedModel = async () => {
        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let data = await getRessources('demonstration', 'demonstration_model', this.props.locale);
        console.log(data);

        this.setState({ dataModel: data });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setState({ dataModel: [] });
            this.getStartedModel();
        }
    }


    closeModal = () => {
        this.setState({ dataModel: [] });
        this.getStartedModel();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false });
    };

    getIdShowroomToEdit = (index, event) => {
        console.log(index);
        this.setState({
            ShowroomToEdit: this.state.dataModel[index].id,
            editShowroomSelected: this.state.dataModel[index]
        });
    }

    getIdShowroomToDelete = (index, event) => {

        let arrayId = [];
        arrayId.push(this.state.dataModel[index].id);
        arrayId.push(this.state.dataModel[index].model_id);
        this.setState({ ShowroomToDelete: arrayId });
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
            for (let [key, value] of Object.entries(arrayLang[i])) {
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
        this.getStartedModel();
    }



    render() {


        return (
            <div>
                <div>
                    <h1>Model showroom</h1>
                </div>

                <div className="pt-3 pb-3">
                    <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#new-model-showroom-admin">Ajouter un model 3D</button>
                </div>

                <div className="position-tab pt-3 ">

                    <table className="table table-striped" style={{ width: "75%" }}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nom du model</th>
                                <th scope="col">Nom de l'image associé</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.dataModel.length > 0 &&
                                this.state.dataModel.map((element, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{element.model_url}</td>
                                        <td>{element.name === null ? "pas d'image" : element.name}</td>
                                        <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-Showroom-admin" onClick={this.getIdShowroomToDelete.bind(this, index)}>Supprimer</button>}</td>

                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>


                {/* <!-- Nouveau model --> */}

                <div className="modal fade" id="new-model-showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="new-model-showroom-admin" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="new-model-showroom-admin">Ajout d'un model 3d</h6>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AjoutModel {...this.props} dataModel={this.state.dataModel} getStartedModel={this.getStartedModel} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- suppression d'un model 3d --> */}
                <div className="modal fade" id="delete-Showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="exampleModalScrollableTitle">Suppression d'un model 3d</h6>
                            </div>
                            <div className="modal-body">
                                <DeleteModel showroom={this.state.dataModel} ShowroomToDelete={this.state.ShowroomToDelete} getStartedModel={this.getStartedModel} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowroomModel;