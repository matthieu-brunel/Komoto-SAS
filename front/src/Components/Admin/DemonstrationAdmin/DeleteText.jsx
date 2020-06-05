import React, { Component } from 'react';

import getRessources from './../../../utils/postRessources';
import deleteRessources from '../../../utils/deleteRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteText extends Component{
    constructor(props){
        super(props);
        this.state = {
            Showroom: [],
            checkBox:false
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({checkBox:event.target.checked});
    }

    deleteShowroom = () => {

        if(this.props.ShowroomToDelete){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/demonstration/${this.props.ShowroomToDelete}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.props.getStartedText();
            this.setState({checkBox:false});
        }

    }

    cancelDeleteShowroom = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        const { ShowroomToDelete } = this.props;

        return(
            <div>
                <div className="form-group" >
                    <label htmlFor="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer ?</label>
                </div>
                <form className="was-validated">
                <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" checked={this.state.checkBox} required onChange={this.handleChangeCheckBox} />
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.ShowroomToDelete
                        ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteShowroom}>Oui</button>
                        :
                        <button type="button" className="btn btn-secondary">Oui</button>
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteShowroom}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeleteText;