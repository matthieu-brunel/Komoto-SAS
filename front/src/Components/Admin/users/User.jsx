import React, { Component } from 'react';
import "./user.css";
import { Redirect } from 'react-router-dom';
import NavBarAdmin from '../NavBarAdmin/NavBar';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;





class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      admin: [],
      user: "",
      password: "",
      idEditAdmin: 0,
    }
  }

  newHeader() {
    const options = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.state.token
      }),
    }

    return options;
  }

  getTokenAdmin() {
    fetch(REACT_APP_SERVER_ADDRESS_FULL + '/api/admin', this.newHeader(), {
      method: 'GET'
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ admin: res })
      });
  }


  handlerChangeInput = (event) => {
    switch (event.target.id) {
      case "user":
        this.setState({ user: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;

      default:
        break;
    }
  }

  getIdEditUser = (index, event) => {
    this.setState({ idEditAdmin: index });
  }

  editAdminUser = (event) => {
    event.preventDefault();
    let data = {
      "user": this.state.user,
      "password": this.state.password
    }

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/admin/' + this.state.admin[this.state.idEditAdmin].id;
    console.log(this.state.admin[this.state.idEditAdmin].id);
    fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.state.token
      }),
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => this.setState({ user: "", password: "", getIdEditUser: "" }))
    this.getTokenAdmin();
  }

  deleteAdminUser = () => {

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/admin/' + this.state.admin[this.state.idEditAdmin].id;
    fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.state.token
      })

    })
      .then(res => res.json())
      .then(res => this.setState({ getIdEditUser: "" }));
    this.getTokenAdmin();
  }

  componentDidMount() {
    this.getTokenAdmin();
  }

  addAdminUser = () => {

    let data = {
      "user": this.state.user,
      "password": this.state.password
    }
    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/admin';

    fetch(url, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + this.state.token
      }),
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        console.log("ma réponse : ", res)
        this.setState({ user: "", password: "" })
        this.getTokenAdmin();

      })
  }

  render() {


    return (
      <div className="">
        <div>
          <NavBarAdmin />
        </div>

        {localStorage.getItem('token') ? <Redirect to="/user" /> : <Redirect to="/Login" />}

        <div className="pt-1 pb-3">
          <h1 className="bg-admin">Utilisateur</h1>

        </div>
        <div className="addUserAdmin pt-3 pb-3">
          { /* <!-- Button trigger modal --> */}
          <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#addUserAmdin">ajout utilisateur</button>
        </div>

        <div className="position-tab pt-3">
          <table className="table table-striped" style={{ width: "75%" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Modification du mot de passe</th>
                <th scope="col">Supprimer cet utilisateur</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.admin.map((element, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{element.user}</td>
                    <td> {index === 0 ? "" : <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editUserAmdin" onClick={this.getIdEditUser.bind(this, index)}>Modifier</button>}</td>
                    <td>{index === 0 ? "" : <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deleteUserAmdin" onClick={this.getIdEditUser.bind(this, index)}>Supprimer</button>}</td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>

        {/*début modal nouvel utilisateur*/}
        {/* <!-- Modal --> */}
        <div className="modal fade" id="addUserAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="titleAddUserAdmin">nouvel utilisateur</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='inputAddAdmin'>
                  <form >
                    <div className="form-group">
                      <label htmlFor="user">utilisateur</label>
                      <input type="email" className="form-control" id="user" value={this.state.user} aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handlerChangeInput} />

                    </div>
                    <div className="form-group">
                      <label htmlFor="password">mot de passe</label>
                      <input type="password" className="form-control" id="password" value={this.state.password} placeholder="Password" onChange={this.handlerChangeInput} />
                    </div>
                  </form>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addAdminUser}>Valider</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>
        {/*fin modal nouvel utilisateur*/}

        {/*début modal modification utilisateur*/}
        {/* <!-- Modal --> */}
        <div className="modal fade" id="editUserAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="titleEditUserAmdin">Modification utilisateur</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className='inputEditAdmin'>
                  <form >
                    <div className="form-group">
                      <label htmlFor="user">utilisateur</label>
                      <input type="email" className="form-control" id="user" value={this.state.user} aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handlerChangeInput} />

                    </div>
                    <div className="form-group">
                      <label htmlFor="password">mot de passe</label>
                      <input type="password" className="form-control" id="password" value={this.state.password} placeholder="Password" onChange={this.handlerChangeInput} />
                    </div>
                  </form>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.editAdminUser}>Valider</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>

              </div>
            </div>
          </div>
        </div>
        {/*fin modal nouvel utilisateur*/}

        {/*début modal suppression utilisateur*/}
        {/* <!-- Modal --> */}
        <div className="modal fade" id="deleteUserAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="titleDeleteUserAmdin">Suppression de l'utilisateur</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Souhaitez-vous supprimer cet utilisateur ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.deleteAdminUser}>Valider</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>

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