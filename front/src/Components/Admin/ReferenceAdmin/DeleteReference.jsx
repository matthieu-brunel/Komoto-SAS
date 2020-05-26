import React, { Component } from 'react';
import getRessources from './../../../utils/postRessources';
import deleteRessources from '../../../utils/deleteRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteReference extends Component{
    constructor(props){
        super(props);
        this.state = {
            reference: [],
            titreSection:"",
            checkBox:""
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({checkBox:event.target.checked});
    }

    deletereference = () => {

        if(this.props.refToDelete.length > 0){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/reference/${this.props.refToDelete[0]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.refToDelete[1]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.setState({checkBox:false});
            this.props.getStartedreferenceAdmin();
        }

    }

    cancelDeleteSpec = () => {
        this.setState({checkBox:false});

    }

    


    render(){
     
        return(
            <div>
                <div className="form-group" >
                    <label htmlFor="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer cette reference ?</label>
                </div>
                <form className="was-validated">
                    <div className="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" className="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" className="custom-control-input" id="customControlValidation1" required onChange={this.handleChangeCheckBox} /> }
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.refToDelete.length > 0
                        ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deletereference}>Oui</button>
                        :
                        <button type="button" className="btn btn-secondary">Oui</button>
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteSpec}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeleteReference;