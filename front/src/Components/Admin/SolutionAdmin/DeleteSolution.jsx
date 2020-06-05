import React, { Component } from 'react';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteSolution extends Component {
    constructor(props) {
        super(props);
        this.state = {
            solution: [],
            titreSection: "",
            checkBox: false
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({ checkBox: event.target.checked });
    }

    deletesolution = () => {

        if (this.props.solToDelete.length > 0) {
            const options = {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }


            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/solution/${this.props.solToDelete[0]}`;
            console.log(url);
            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.solToDelete[1]}`;
            console.log(url);

            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            this.setState({ checkBox: false });
            this.props.getStartedSolutionAdmin();
        }
    }


    cancelDeleteSolution = () => {
        this.setState({ checkBox: false });
    }


    render() {

        return (
            <div>
                <div className="form-group" >
                    <label htmlFor="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer cette solution ?</label>
                </div>
                <form className="was-validated">
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" checked={this.state.checkBox} required onChange={this.handleChangeCheckBox} />
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.solToDelete.length > 0
                        ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deletesolution}>Enregistrer</button>
                        :
                        <button type="button" className="btn btn-secondary">Enregistrer</button>
                    }
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteSolution}>Fermer</button>
                </div>

            </div>
        )
    }
}


export default DeleteSolution;