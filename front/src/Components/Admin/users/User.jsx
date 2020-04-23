import React, { Component } from 'react';
import "./user.css";
import { Redirect } from 'react-router-dom';
import NavBarAdmin from '../NavBarAdmin/NavBar';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;





class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      token:localStorage.getItem('token')
    }
  }

  getTokenAdmin(){
    const options = {
      headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + this.state.token
      }),
  }

    fetch(REACT_APP_SERVER_ADDRESS_FULL +'/api/admin', options, {
      method: 'GET',
/* 			mode: 'cors',
			credentials: 'same-origin',
			redirect: 'follow',
			referrer: 'no-referrer', */
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    });

  }

/*   async getUserAdmin(){
    const options = {
      headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + this.state.token
      }),
  }
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/admin';
    let data = await (await(fetch(url, options))).json();
    console.log(data);
  } */

  componentDidMount(){
    this.getTokenAdmin();
    //this.getUserAdmin();
  }

  render(){
    return (
      <div className="">
        <div>
          <NavBarAdmin />
        </div>

       {localStorage.getItem('token') ?  <Redirect to="/user" /> : <Redirect to="/Login" />}


        <h1 className="bg-admin">Utilisateur</h1>
     

        <div className="addUserAdmin">
          { /* <!-- Button trigger modal --> */}
          <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#addUserAmdin">ajout utilisateur</button>
        </div>

        <div>
          <table className="table table-striped" style={{width:"75%"}}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Modification du mot de passe</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td><button>Modifier</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      
        {/*début modal nouvel utilisateur*/}
        {/* <!-- Modal --> */}
        <div class="modal fade" id="addUserAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="titleAddUserAdmin">nouvel utilisateur</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div className='inputAddAdmin'>
                <form>
                  <div class="form-group">
                    <label for="userAdmin">utilisateur</label>
                    <input type="email" class="form-control" id="userAdmin" aria-describedby="emailHelp" placeholder="Enter email"/>
                    
                  </div>
                  <div class="form-group">
                    <label for="userPassword">mot de passe</label>
                    <input type="password" class="form-control" id="userPassword" placeholder="Password"/>
                  </div>
                </form>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary">Valider</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>
        {/*fin modal nouvel utilisateur*/}

      </div>


    );
  }

}

export default User;