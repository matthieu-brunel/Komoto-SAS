import React, { Component } from 'react';
import './Langues.css'
import NavBarAdmin from './../NavBarAdmin/NavBar';
import { Redirect } from 'react-router-dom';
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class Langues extends Component{
    constructor(props){
        super(props);
        this.state = {
          token:localStorage.getItem('token'),
          langues:[],
          name:"",
          locale:"",
          idEditLangue:0,
        }
    }

    newHeader(){
        const options = {
          headers: new Headers({
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + this.state.token
          }),
        }
    
        return options;
      }
    
      getLanguages(){
        fetch(REACT_APP_SERVER_ADDRESS_FULL +'/api/language', this.newHeader(), {
          method: 'GET'})
          .then(res => res.json())
          .then(res => {console.log(res);
            this.setState({langues:res})
          });
      }
    
      resetInput(){
        this.setState({name:"",locale:""});
      }
    
    
      handlerChangeInput = (event) => {
        switch (event.target.id) {
          case "name":
              this.setState({name:event.target.value});
            break;
          case "locale":
              this.setState({locale:event.target.value});
            break; 
    
          default:
            break;
        }
      }
    
      getIdEditLangue = (index, event) => {
        this.setState({idEditLangue:index});
      }
    
      editAdminLangue = (event) => {
        event.preventDefault();
        let data = {
          "name":this.state.name,
          "locale":this.state.locale
        }
        
        let url = REACT_APP_SERVER_ADDRESS_FULL +'/api/Language/'+ this.state.langues[this.state.idEditLangue].id;
        
        fetch(url,{
          headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.state.token
        }),
          method:'PUT',
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => this.setState({name:"", locale:"", getIdEditLangue:"",idEditLangue:""}))
          this.getLanguages();
      }

    
      deleteAdminLangue = () => {
    
        let url = REACT_APP_SERVER_ADDRESS_FULL +'/api/Language/'+ this.state.langues[this.state.idEditLangue].id;
  
         fetch(url,{
          headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.state.token
        }),
          method:'DELETE'
        })
          .then(res => res.json())
          .then(res => this.setState({getIdEditLangue:"",idEditLangue:"",langues:[]}))
          this.getLanguages();
      }
    
    
      resetInput(){
        this.setState({name:"",locale:""});
      }
    
      componentDidMount(){
        this.getLanguages();
      }
    
    
      addAdminLangue = () => {
    
         let data = {
          "name":this.state.name,
          "locale":this.state.locale
        }
        console.log(data);
        let url = REACT_APP_SERVER_ADDRESS_FULL +'/api/language';
    
        fetch(url,{
          headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.state.token
        }),
          method:'POST',
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => 
            {
              console.log("ma réponse : ",res)
            this.setState({name:"", locale:"", idEditLangue:""})
            this.getLanguages();
            
            })
      }

    render(){

        return (
            <div className="">
            <div>
              <NavBarAdmin />
            </div>
    
           {localStorage.getItem('token') ?  <Redirect to="/Langues" /> : <Redirect to="/Login" />}
    
    
            <h1 className="bg-admin">Langue</h1>
         
    
            <div className="addLangueAdmin">
              { /* <!-- Button trigger modal --> */}
              <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#addLangueAdmin">ajouter une langue</button>
            </div>
    
            <div>
              <table className="table table-striped" style={{width:"75%"}}>
                <thead>
                  <tr>
                        <th scope="col">#</th>
                        <th scope="col">Langue</th>
                        <th scope="col">Locale</th>
                        <th scope="col">Modifier la langue</th>
                        <th scope="col">Supprimer la langue</th>
                  </tr>
                </thead>
                <tbody>
                {
                    this.state.langues.map((element, index) => (
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{element.name}</td>
                        <td>{element.locale}</td>
                        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editLangueAmdin" onClick={this.getIdEditLangue.bind(this, index)}>Modifier</button></td>
                        <td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteLangueAdmin" onClick={this.getIdEditLangue.bind(this, index)}>Supprimer</button></td>
                      </tr>
                    ))
                  }
    
                </tbody>
              </table>
            </div>
          
            {/*début modal nouvelle langue*/}
            {/* <!-- Modal --> */}
            <div class="modal fade" id="addLangueAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="titleAddLangueAdmin">nouvelle langue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className='inputAddLangueAdmin'>
                    <form >
                      <div class="form-group">
                        <label for="name">langue</label>
                        <input type="email" class="form-control" id="name" value={this.state.name} aria-describedby="emailHelp" placeholder="Entrer la langue" onChange={this.handlerChangeInput}/>
                        
                      </div>
                      <div class="form-group">
                        <label for="locale">locale</label>
                        <input type="locale" class="form-control" id="locale" value={this.state.locale} placeholder="Exemple : fr" onChange={this.handlerChangeInput}/>
                      </div>
                    </form>
    
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addAdminLangue}>Valider</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" /* onClick={() => {this.resetInput()}} */>Fermer</button>
    
                  </div>
                </div>
              </div>
            </div>
            {/*fin modal nouvelle langue*/}
    
            {/*début modal modification langue*/}
            {/* <!-- Modal --> */}
            <div class="modal fade" id="editLangueAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="titleEditLangueAmdin">Modification de la Langue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div className='inputEditAdmin'>
                    <form >
                      <div class="form-group">
                        <label for="name">langue</label>
                        <input type="text" class="form-control" id="name" value={this.state.name} aria-describedby="emailHelp" placeholder="entrer la langue" onChange={this.handlerChangeInput}/>
                        
                      </div>
                      <div class="form-group">
                        <label for="locale">locale</label>
                        <input type="text" class="form-control" id="locale" value={this.state.locale} placeholder="exemple" onChange={this.handlerChangeInput}/>
                      </div>
                    </form>
    
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.editAdminLangue}>Valider</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" /* onClick={() => {this.resetInput()}} */>Fermer</button>
    
                  </div>
                </div>
              </div>
            </div>
            {/*fin modal nouvelle langue*/}
    
            {/*début modal suppression langue*/}
            {/* <!-- Modal --> */}
            <div class="modal fade" id="deleteLangueAdmin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="titleDeleteLangueAmdin">Suppression de la langue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    Souhaitez-vous supprimer cette langue ?
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.deleteAdminLangue}>Valider</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" /* onClick={() => {this.resetInput()}} */>Annuler</button>
    
                  </div>
                </div>
              </div>
            </div>
            {/*fin modal nouvelle langue*/}
    
          </div>
        );
    }

}

export default Langues;