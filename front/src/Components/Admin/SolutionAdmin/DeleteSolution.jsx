import React, { Component } from 'react';

import getRessources from './../../../utils/postRessources';
import deleteRessources from '../../../utils/deleteRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeletesolutionAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            solutionAdmin: [],
            titreSection:"",
            checkBox:false
        }
    }

    handleChangeCheckBox = (event) => {

        this.setState({checkBox:event.target.checked});
    }

    deletesolutionAdmin = () => {

        if(this.props.specToDelete.length > 0){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.specToDelete[1]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.props.specToDelete[0]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.props.getStartedsolutionAdmin();
            this.setState({checkBox:false});
        }

    }

    cancelDeleteSpec = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        const {getsolutionAdminToDelete, specToDelete} = this.props;

        console.log(specToDelete);
        return(
            <div>
                <div className="form-group" >
                    <label forHtml="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer cette solutionAdmin ?</label>
                </div>
                <form class="was-validated">
                    <div class="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" class="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" class="custom-control-input" id="customControlValidation1" required checked={this.state.checkBox} onChange={this.handleChangeCheckBox} /> }
                        <label class="custom-control-label" for="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.specToDelete.length > 0
                        ?
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.deletesolutionAdmin}>Oui</button>
                        :
                        <button type="button" class="btn btn-secondary">Oui</button>
                        }
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteSpec}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeletesolutionAdmin;