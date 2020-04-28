import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';
import "./SpecialisationAdmin.css";
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class SpecialisationAdmin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            specialisation: [],
            titreSection:"",
            specSelected:[],

            /*scpecialisation*/
            titreSpec:"",
            description:"",
            arrayDescription:[],
            urlImage:"",
            altImage:"",
            nameImage:"",
            refIdImage:null,

            addDescription:""

        }
        
    }

    handleChangeInput = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titre-section":
                this.setState({titreSection:event.target.value});
                break;

            case "titre-spec-admin":
                this.setState({titreSpec:event.target.value});
                break;

            case "addDescription-spec-admin":
                this.setState({addDescription:event.target.value});
                break; 
                
            case "url-image-spec-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-spec-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-spec-admin":
                this.setState({nameImage:event.target.value});
                break;

            case "refId-image-spec-admin":
                this.setState({refIdImage:event.target.value});
                break;
        
            default:
                break;
        }
    }

    getSpecialisation = (event) => {
        let index = event.target.options[event.target.options.selectedIndex].id;
        console.log(" getSpecialisation = (event)");
        if(index !== "default"){
            let specSelected = [];
            specSelected.push(this.state.specialisation[index]);
            this.setState({
                specSelected:specSelected,
                titreSpec:this.state.specialisation[index].subtitle,
                arrayDescription:this.state.specialisation[index].description,
                altImage:this.state.specialisation[index].alt,
                urlImage:this.state.specialisation[index].url,
                nameImage:this.state.specialisation[index].name,
                refIdImage:this.state.specialisation[index].homepage_id,
                titreSection:this.state.specialisation[index].title
            })
        }else{
            this.setState({
                specSelected:[],
                titreSpec:"",
                arrayDescription:"",
                altImage:"",
                urlImage:"",
                refIdImage:"",
                nameImage:"",
                titreSection:""
            })
        }


    }

editAdminUser = (event) => {
        event.preventDefault();
        const {arrayLang, locale } = this.props;

        let idLang;
        let description = this.state.specSelected[0].description.join("/");

        for(let i in arrayLang){
            if(Object.values(arrayLang[i]).includes(locale)){
                idLang = Object.values(arrayLang[i])[2];
            }
        }

        
        let data = {
            'subtitle':this.state.titreSpec,
            'title':this.state.titreSection,
            'section':"specialisation",
            'description':description,
            'language':idLang,
            'image_id':""
        }
        
        let url = REACT_APP_SERVER_ADDRESS_FULL +'/api/admin/'+ this.state.admin[this.state.idEditAdmin].id;
        console.log(this.state.admin[this.state.idEditAdmin].id);
        fetch(url,{
          headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + this.state.token
        }),
          method:'PUT',
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(res => this.setState({user:"", password:"", getIdEditUser:""}))
          this.getTokenAdmin();
      }

    getTextToList(data) {
        //variable objet qui servira à accueillir les données
        let objet = data;
        //variable array_description qui servira a convertir le contenu description en tableau grace au slash
        let array_description = data.description.split('/');
        //on remplace le contenu description de l'objet.description par la nouvelle description
        objet.description = array_description;
        //on met a jour le state avec la nouvelle valeur [specialisation=state:[...this.state.specialisation=state actuel,objet=variable objet qui contient les nouvelles données]]
        this.setState({ specialisation: [...this.state.specialisation, objet] });
      } 
    
    componentDidMount = () => {
        this.getStartedSpecialisation();
    }

    getStartedSpecialisation = async() => {
        const { locale } = this.props;

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let data = await getRessources('homepage', 'specialisation',locale);
        
        //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
        for (let i = 0; i < data.length; i++) {
            this.getTextToList(data[i]);
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.locale !== this.props.locale){
            this.setState({specialisation:"", specSelected:"",titreSection:""});
            this.getStartedSpecialisation();
        }
    }

    closeModal = (event) => {

        switch (event.target.id) {
            case "titre-spec-admin-annuler":
                this.setState({titreSpec:this.state.specSelected[0].subtitle});
                break;

           case "description-spec-admin-annuler":
                this.setState({arrayDescription:this.state.specSelected[0].description});
                break;
        
            default:
                break;
        }
    }

    addDescription = () => {
        let specialisation = this.state.specSelected;
        let description = this.state.specSelected[0].description;
        description.push(this.state.addDescription);
        specialisation[0].description = description;
        this.setState({arrayDescription:specialisation[0].description, addDescription:""});
    }

    deleteDescription = (index, event) => {
       
        let specialisation = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:specialisation[0].description});
    }

    editDescription = (index, event) => {
       
        let specialisation = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:specialisation[0].description});
    }


    render(){
        const { locale, arrayLang } = this.props;
        console.log(this.state.specSelected);

        return(
            <div>
                <div>
                    <h1>Specialisation</h1>
                </div>

{ this.state.titreSection.length > 0 &&
                <div>
                    <form>
                        <div class="form-group row">
                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Titre de la section specialisation</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control form-control-sm" id="titre-spec1" value={this.state.titreSection} placeholder="saisir votre titre" onChange={this.handleChangeInput}/>
                            </div>
                            <div class="col-sm-2">
                                <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modifier-titre-section-admin">Modifier</button>
                            </div>
                        </div>
                    </form>
                </div>}

                <div class="form-group container select-specialisation" style={{width:"none"}}>
                    <label for="exampleFormControlSelect1">Choisir la spécialisation</label>
                    <select class="form-control" id="select-specialisation" onChange={this.getSpecialisation}>
                        <option id="default">Choisir la spécialisation</option>
                        {this.state.specialisation.length && this.state.specialisation.map((element, index) => (
                            <option key={index} id={index}>{`Specialisation ${index + 1}`}</option>
                        ))}
                    </select>
                </div>
                
               
                {this.state.specSelected.length > 0 &&
                    <div className="div-input-specialisationAdmin">
                        <div className="sous-titre-spec-admin">
                            <h3>Titre</h3>
                            <p>{this.state.titreSpec}</p>
                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modifier-titreAdmin">Modifier</button>
                        </div>

                        <div className="description-spec-admin">
                            <h3>Description(s)</h3>
                            {this.state.arrayDescription.map((element, index) => (
                                <p key={index}>{element}</p>
                            ))}
                            <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#modifier-descriptionAdmin">Modifier</button>
                        </div>

                        <div className="image-spec-admin">
                            <h3>Url de l'image</h3>
                            <p>Url : {this.state.urlImage}</p>
                            <p>Alt : {this.state.altImage}</p>
                            <button type="button" class="btn btn-warning"  data-toggle="modal" data-target="#modifier-urlAdmin">Modifier</button>
                        </div>

                        <div className="custom-file pb-5">
                            <input type="file" className="custom-file-input"  /* onChange={this.handlerUploadFile} *//>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choisir une image</label>
                        </div>

                        <div className="btn-appliquer-spec-Admin">
                            <button type="button" class="btn btn-outline-primary">Appliquer</button>
                        </div>
                    </div>   }  

                    {/* <!-- Modifier titre --> */}
                    <div class="modal fade" id="modifier-titreAdmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier le titre</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <textarea type="text" value={this.state.titreSpec} id="titre-spec-admin" onChange={this.handleChangeInput}/>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="titre-spec-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                <button type="button" class="btn btn-primary"  data-dismiss="modal">Appliquer</button>
                            </div>
                            </div>
                        </div>
                    </div> 

                    {/* <!-- Modifier description --> */}
                    <div class="modal fade" id="modifier-descriptionAdmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier les descriptions</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <label>Saisir une description</label>
                                <input type="text" value={this.state.addDescription} id="addDescription-spec-admin" onChange={this.handleChangeInput}/>
                                <button type="button" class="btn btn-primary" onClick={this.addDescription}>Ajouter une description</button>
                                <div className="description-spec-admin-modal">
                                    <ul>
                                        {this.state.specSelected.length > 0 && this.state.specSelected[0].description.map((description, index) => (
                                            <div>
                                                <li key={index}>{description} {"  "}<button type="button" class="btn btn-primary" onClick={this.deleteDescription.bind(this, index)}>X</button></li>
                                                
                                            </div>


                                        ) )}
                                    </ul>

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal"  id="description-spec-admin-annuler" onClick={this.closeModal}>Annuler</button>
                                <button type="button" class="btn btn-primary" >Save changes</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modifier url Image --> */}
                    <div class="modal fade" id="modifier-urlAdmin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier l'image / alt / id</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group row">
                                        <label  htmlFor="name-image-spec-admin" className="col-sm-4 col-form-label col-form-label-sm">nom de l'image</label>
                                        <div className="col-sm-8">
                                            <input type="text" value={this.state.nameImage} className="form-control form-control-sm" id="name-image-spec-admin" onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label htmlFor="url-image-spec-admin" className="col-sm-4 col-form-label col-form-label-sm">l'url</label>
                                        <div className="col-sm-8">
                                             <input type="text" value={this.state.urlImage} className="form-control form-control-sm" id="url-image-spec-admin" onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label htmlFor="alt-image-spec-admin" className="col-sm-4 col-form-label col-form-label-sm">description de l'image</label>
                                        <div className="col-sm-8"> 
                                            <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-spec-admin" onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                       
                                    <div class="form-group row">
                                        <label htmlFor="refId-image-spec-admin" className="col-sm-4 col-form-label col-form-label-sm">id de l'image</label>
                                        <div className="col-sm-8">
                                            <input type="text" value={this.state.refIdImage} className="form-control form-control-sm" id="refId-image-spec-admin" onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary"  data-dismiss="modal"> Appliquer</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Modifier Titre de la section --> */}
                    <div class="modal fade" id="modifier-titre-section-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modifier le titre de la section</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group row">
                                        <label  htmlFor="titre-section" className="col-sm-4 col-form-label col-form-label-sm">titre de la section</label>
                                        <div className="col-sm-8">
                                            <input type="text" value={this.state.titreSection} className="form-control form-control-sm" id="titre-section" onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary"  data-dismiss="modal"> Appliquer</button>
                            </div>
                        </div>
                    </div>
                </div>        
            </div>
        )
    }
}

export default SpecialisationAdmin;