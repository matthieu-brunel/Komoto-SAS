import React, { Component } from 'react';
import postRessources from './../../../utils/postRessources';
import $ from "jquery";
import DragNDrop from './DragNDrop';
import {
    GridContextProvider,
    GridDropZone,
    GridItem,
    swap
} from "react-grid-dnd";

const path = require('path');

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class AjoutContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*contact*/
            arrayDescription: [],
            addDescription: "",
            fieldAddName: ""
        }
    }


    handleChangeInput = (event) => {
        switch (event.target.id) {
            case "fieldAddName":
                this.setState({ fieldAddName: event.target.value });
                break;

            default:
                break;
        }
    }

    addDescription = () => {

        this.setState({ arrayDescription: [...this.state.arrayDescription, this.state.fieldAddName], fieldAddName: "" });
    }

    onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        const nextState = swap(this.state.arrayDescription, sourceIndex, targetIndex);
        this.setState({ arrayDescription: [...nextState] });
    }

    deleteDescription = (index, event) => {

        let description = this.state.arrayDescription;
        description.splice(index, 1);

        this.setState({ arrayDescription: description });
    }



    sendData = () => {

        let dataFormulaire = this.state.arrayDescription;

        let objetData = {
            "name": dataFormulaire.join(","),
            "language_id": this.props.language_id
        }

        const url = REACT_APP_SERVER_ADDRESS_FULL + "/api/formulaire";

        fetch(url, {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
            }),
            body: JSON.stringify(objetData)
        })
            .then(response => response.json())
            .then(response => this.props.getStartedContactAdmin())
            .catch(err => console.log(err.message))
        this.setState({ arrayDescription: [] });


    }


    render() {

        const { arrayDescription } = this.state;
        return (
            <div>
                <div className="container-fieldName-block row align-items-end">
                    <div className="input-fieldName-formulaire col-8">
                        <label htmlFor="fieldAddName">Saisir un nom de label</label>
                        <input className="form-control" type="text" value={this.state.fieldAddName} id="fieldAddName" placeholder="exemple : Société" onChange={this.handleChangeInput} />
                    </div>

                    <div className="div-button-add-fieldName col-4">
                        <button type="button" className="btn btn-primary" onClick={this.addDescription}>Ajouter</button>
                    </div>
                </div>
                <div className="row">
                    <div className="div-display-fieldName col-12 mt-3">
                        <DragNDrop list={this.state.arrayDescription} onChange={this.onChange} deleteDescription={this.deleteDescription} />
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <div className="div-recorded-add-contact">
                        {
                            arrayDescription.length > 0
                                ?
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.sendData}>Enregistrer</button>
                                :
                                <button type="button" className="btn btn-secondary">Enregistrer</button>

                        }
                    </div>

                    <div className="div-close-add-contact ml-2">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                    </div>
                </div>


            </div>


        )
    }
}


export default AjoutContact;