import React, { Component } from 'react';

import getRessources from './../../../utils/postRessources';
import deleteRessources from '../../../utils/deleteRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteSavoirFaire extends Component{
    constructor(props){
        super(props);
        this.state = {
            SavoirFaire: [],
            checkBox:false
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({checkBox:event.target.checked});
    }

    deleteSavoirFaire = () => {

        if(this.props.SavoirFaireToDelete.length > 0){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.SavoirFaireToDelete[1]}`;
            console.log("URL : ",url)
            fetch(url, options).then(res => res.json()).then(res => console.log(res)).catch(err => console.log("ERROR : ",err));
            
    
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.props.SavoirFaireToDelete[0]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.props.getStartedSavoirFaire();
            this.setState({checkBox:false});
        }

    }

    cancelDeleteSavoirFaire = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        const { SavoirFaireToDelete } = this.props;

        return(
            <div>
                <div className="form-group" >
                    <label forHtml="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer ce savoir-faire ?</label>
                </div>
                <form class="was-validated">
                    <div class="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" class="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" class="custom-control-input" id="customControlValidation1" required checked={this.state.checkBox} onChange={this.handleChangeCheckBox} /> }
                        <label class="custom-control-label" for="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.SavoirFaireToDelete.length > 0
                        ?
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.deleteSavoirFaire}>Oui</button>
                        :
                        <button type="button" class="btn btn-secondary">Oui</button>
                        }
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteSavoirFaire}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeleteSavoirFaire;