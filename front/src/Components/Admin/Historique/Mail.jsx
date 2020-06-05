import React, { Component } from 'react';
import './Mail.css'
import NavBarAdmin from '../NavBarAdmin/NavBar';
import DeleteMail from './DeleteMailAdmin';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class Mail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayMail: [],
      intervalMail: [],
      previous: 0,
      next: 0,
      btn: 0,
      interval: 10,
      numBtn: [],
      mailToDelete: [],

      message: "",
      societe: "",
      nom: "",
      prenom: "",
      email: "",
      date: "",
      document: ""
    }
  }


  getTextToList(data) {
    //variable objet qui servira à accueillir les données
    let objet = data;
    //variable array_description qui servira a convertir le contenu description en tableau grace au slash
    let array_description = JSON.parse(data.description);
    //on remplace le contenu description de l'objet.description par la nouvelle description
    objet.description = array_description;
    //on met a jour le state avec la nouvelle valeur 
    this.setState({ arrayMail: [...this.state.arrayMail, objet] });
  }

  changeInterval(btn, interval) {
    if (btn >= 0) {
      this.setState({ intervalMail: this.state.arrayMail.slice(btn, interval) });
    }
  }

  displayNumButton = () => {
    let numBtn = Math.ceil(this.state.arrayMail.length / this.state.interval);
    let arrayNumBtn = [];

    for (let i = 0; i < numBtn; i++) {
      arrayNumBtn.push(i + 1);
    }

    this.setState({ numBtn: arrayNumBtn });
  }

  getMail = async () => {
    this.setState({ intervalMail: [], arrayMail: [] });
    const { btn, interval, next } = this.state;

    const options = {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': 'Bearer ' + localStorage.getItem('token')
      }),
    }

    let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/mail';

    const data = await (await (fetch(url, options))).json();

    //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
    for (let i = 0; i < data.length; i++) {
      this.getTextToList(data[i]);
    }


    this.changeInterval((btn + next), (interval + next));
    this.displayNumButton();

  }

  changePageMail = (event) => {
    const { interval } = this.state;

    // 0 * 10, 10 * (0+1)  => [0, 10]
    // 1 * 10, 10 * (1+1)  => [10, 20]
    // 2 * 10, 10 * (2+1)  => [20, 30]

    this.setState({ intervalMail: this.state.arrayMail.slice(Number(event.target.id) * interval, interval * (Number(event.target.id) + 1)), btn: event.target.id });
  }

  viewMail = (event) => {
    let id = event.target.id;
    let mail = this.state.intervalMail[id];

    this.setState({
      message: mail.description.message,
      societe: mail.description.societe,
      nom: mail.description.nom,
      prenom: mail.description.prenom,
      email: mail.description.email,
      adresse: mail.description.adresse,
      telephone: mail.description.telephone,
      date: mail.date,
      document: mail.description.document !== "" ? REACT_APP_SERVER_ADDRESS_FULL + "/documents/" + mail.description.document : ""
    })

    console.log(mail);

  }

  getIdMailToDelete = (index, event) => {
    let arrayIdMail = [];
    console.log(index);
    arrayIdMail.push(this.state.intervalMail[index].id);
    arrayIdMail.push(this.state.intervalMail[index].description.document);

    this.setState({ mailToDelete: arrayIdMail });
  }


  componentDidMount = () => {
    this.getMail();
  }

  render() {

    return (
      <div className="">
        <div>
          <NavBarAdmin />
        </div>
        <div className="pb-3 pt-1">
          <h1 >Historique des e-mails</h1>
        </div>
        <div className="legende-historique-mail p-2 position-tab pt-3" style={{}}>
          <p className="text-left"><span className="badge badge-success">pj</span><span> = mail qui contient une pièce jointe</span></p>
        </div>
        <div className="position-tab pt-3 ">
          <table className="table table-striped" style={{ width: "75%" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">société</th>
                <th scope="col">nom</th>
                <th scope="col">@mail</th>
                <th scope="col">date</th>
                <th scope="col">visualiser</th>
                <th scope="col">supprimer</th>

              </tr>
            </thead>

            <tbody>
              {this.state.intervalMail.length > 0 &&
                this.state.intervalMail.map((element, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1 + (this.state.btn * this.state.interval)}{" "}<span className="badge badge-success">{element.description.document !== "" ? "pj" : ""}</span></th>
                    <td>{element.description.societe}</td>
                    <td>{element.description.nom}</td>
                    <td>{element.description.email}</td>
                    <td>{element.date}</td>
                    <td> {<button type="button" className="btn btn-primary" id={index} data-toggle="modal" data-target="#viewMail" onClick={this.viewMail}>visualiser</button>}</td>
                    <td> {<button type="button" className="btn btn-danger" id={index} data-toggle="modal" data-target="#delete-mail-admin" onClick={this.getIdMailToDelete.bind(this, index)}>X</button>}</td>
                  </tr>
                ))
              }

            </tbody>
          </table>
        </div>

        {
          this.state.numBtn.length > 0 &&
          this.state.numBtn.map(numPage => (

            <button key={numPage} type="button" className="btn btn-primary mr-1" id={numPage - 1} onClick={this.changePageMail}>{numPage}</button>
          ))
        }

        {/* <!-- Modal --> */}
        <div className="modal fade" id="viewMail" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Contenu du mail</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">



                <div className="row">
                  {/* <!-- Societe --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Societe</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.societe} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>


                  {/* <!-- Date --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Date</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.date} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <!-- Nom --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Nom</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.nom} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>

                  {/* <!-- Prenom --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Prénom</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.prenom} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>
                </div>


                <div className="row">
                  {/* <!-- Adresse --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Adresse</label>
                      <textarea className="form-control form-control-sm" defaultValue={this.state.adresse} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>

                  {/* <!-- Téléphone --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Téléphone</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.telephone} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  {/* <!-- Email --> */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Email</label>
                      <input className="form-control form-control-sm" defaultValue={this.state.email} id="exampleFormControlTextarea1" rows="1" />
                    </div>
                  </div>

                  {/* <!-- piece jointe --> */}
                  <div className="col-md-6">
                    <div className="form-group">

                      {
                        this.state.document !== ""
                          ?
                          <div className="btn-piece-jointe-mail">
                            <label htmlFor="exampleFormControlTextarea1">Pièce jointe</label>
                            <div className="btn-piece-jointe">
                              <a href={`${this.state.document}`} target="_blank" rel="noopener noreferrer"><button type="button" class="btn btn-primary">visualiser</button></a>
                            </div>
                          </div>
                          : <div className="pas-de-piece-jointe">pas de pièce jointe</div>
                      }


                    </div>
                  </div>
                </div>


                {/* <!-- Message --> */}
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Message</label>
                  <textarea className="form-control" defaultValue={this.state.message} id="exampleFormControlTextarea1" rows="3" />
                </div>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- suppression d'un mail --> */}
        <div className="modal fade" id="delete-mail-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression d'un mail</h5>
              </div>
              <div className="modal-body">
                <DeleteMail mailToDelete={this.state.mailToDelete} getMail={this.getMail} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

}

export default Mail;