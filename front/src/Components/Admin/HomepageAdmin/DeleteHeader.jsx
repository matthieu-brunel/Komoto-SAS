import React, { Component } from 'react';
import './AjoutSpecialisation.css';
import getRessources from './../../../utils/postRessources';
import deleteRessources from '../../../utils/deleteRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteHeader extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: [],
            checkBox:false
        }
    }

    handleChangeCheckBox = (event) => {

        this.setState({checkBox:event.target.checked});
    }

    deleteHeader = () => {

        if(this.props.headerToDelete.length > 0){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.headerToDelete[1]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.props.headerToDelete[0]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.props.getStartedHeader();
            this.setState({checkBox:false});
        }

    }

    cancelDeleteHeader = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        const { headerToDelete } = this.props;

        return(
            <div>
                <div className="form-group" >
                    <label forHtml="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer cet entête ?</label>
                </div>
                <form class="was-validated">
                    <div class="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" class="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" class="custom-control-input" id="customControlValidation1" required checked={this.state.checkBox} onChange={this.handleChangeCheckBox} /> }
                        <label class="custom-control-label" for="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.headerToDelete.length > 0
                        ?
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.deleteHeader}>Oui</button>
                        :
                        <button type="button" class="btn btn-secondary">Oui</button>
                        }
                        <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteHeader}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeleteHeader;