import React, { Component } from 'react';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteMail extends Component{
    constructor(props){
        super(props);
        this.state = {
            Mail: 0,
            checkBox:false
        }
    }

    handleChangeCheckBox = (event) => {
        this.setState({checkBox:event.target.checked});
    }



    deleteMail = () => {

        if(this.props.mailToDelete.length > 0){
            
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                })
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/mail/${this.props.mailToDelete[0]}`;
    
            fetch(url, options)
            .then(res => res.json())
            .then(res => {
                if(res === "delete ok"){
                    this.setState({checkBox:false});
                    this.props.getMail();
                }
            })
            .catch(err => console.log("ERROR : ",err));
        }
    }

    cancelDeleteMail = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        
     
        return(
            <div>
                <div className="form-group" >
                    <label htmlFor="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer ce mail ?</label>
                </div>
                <form className="was-validated">
                    <div className="custom-control custom-checkbox mb-3">
                        <input type="checkbox" className="custom-control-input" id="customControlValidation1" checked={this.state.checkBox} required onChange={this.handleChangeCheckBox} />
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>


              {/*   <form className="was-validated">
                    <div className="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" className="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" className="custom-control-input" id="customControlValidation1" required checked={this.state.checkBox} onChange={this.handleChangeCheckBox} /> }
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form> */}



               







                <div className="modal-footer">
                    {this.state.checkBox && this.props.mailToDelete.length > 0
                        ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteMail}>Oui</button>
                        :
                        <button type="button" className="btn btn-secondary">Oui</button>
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteMail}>Annuler</button>
                </div>

            </div>
        )
    }
}


export default DeleteMail;