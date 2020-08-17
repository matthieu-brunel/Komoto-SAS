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

class ModifierContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*contact*/
            arrayDescription: [],
            addDescription: "",
            fieldAddName: "",
            arrayTest: []
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
        this.setState({ arrayDescription: [...nextState], arrayTest: [...nextState] });
    }

    deleteDescription = (index, event) => {



        let description = this.state.arrayDescription;
        description.splice(index, 1);
        console.log(description);

        this.setState({ arrayDescription: description });
    }

    componentDidMount = () => {
        this.setState({ arrayDescription: this.props.arrayName });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.arrayName != this.props.arrayName) {
            this.setState({ arrayDescription: this.props.arrayName });
        }

    }


    sendData = () => {

        let dataFormulaire = this.state.arrayDescription;

        let objetData = {
            "name": dataFormulaire.join(","),
            "language_id": this.props.language_id
        }

        const url = REACT_APP_SERVER_ADDRESS_FULL + "/api/formulaire/" + this.props.id;
        console.log(url);
        console.log(objetData);
        console.log(this.state);
        fetch(url, {
            method: "PUT",
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
                        <DragNDrop list={this.state.arrayDescription.length > 0 ? this.state.arrayDescription : []} onChange={this.onChange} deleteDescription={this.deleteDescription} />
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <div className="div-recorded-add-contact">
                        {
                            this.state.arrayDescription.length > 0
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


export default ModifierContact;