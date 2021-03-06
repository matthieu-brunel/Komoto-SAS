import React, { Component } from 'react';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class DeleteShowroom extends Component{
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

        if(this.props.ShowroomToDelete.length > 0){
            const options = {
                method:'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
            }
        
    
            let url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.props.ShowroomToDelete[1]}`;
            console.log("URL : ",url)
            fetch(url, options).then(res => res.json()).then(res => console.log(res)).catch(err => console.log("ERROR : ",err));
            
    
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.props.ShowroomToDelete[0]}`;
    
            fetch(url, options).then(res => res.json()).then(res => console.log(res));
    
            this.props.getStartedShowroom();
            this.setState({checkBox:false});
        }

    }

    cancelDeleteShowroom = () => {
        this.setState({checkBox:false});

    }

    


    render(){
        

        return(
            <div>
                <div className="form-group" >
                    <label htmlFor="exampleFormControlSelect1">Etes-vous certain de vouloir supprimer ce Showroom ?</label>
                </div>
                <form className="was-validated">
                    <div className="custom-control custom-checkbox mb-3">
                        { this.state.checkBox ? <input type="checkbox" className="custom-control-input" id="customControlValidation1"  onChange={this.handleChangeCheckBox}/> 
                        : <input type="checkbox" className="custom-control-input" id="customControlValidation1" required checked={this.state.checkBox} onChange={this.handleChangeCheckBox} /> }
                        <label className="custom-control-label" htmlFor="customControlValidation1">confirmation de la suppression</label>
                    </div>
                </form>
                <div className="modal-footer">
                    {this.state.checkBox && this.props.ShowroomToDelete.length > 0
                        ?
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteShowroom}>Enregistrer</button>
                        :
                        <button type="button" className="btn btn-secondary">Enregistrer</button>
                        }
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={this.cancelDeleteShowroom}>Fermer</button>
                </div>

            </div>
        )
    }
}


export default DeleteShowroom;