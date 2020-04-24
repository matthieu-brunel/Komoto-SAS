import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';

class SpecialisationAdmin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            specialisation: [],
            titreSection:"",



            /*scpecialisation 1*/
            titre1Spec1:"",
            description1:"",
            arrayDescription1:[],

            /*scpecialisation 2*/
            titre1Spec2:"",
            description2:"",
            arrayDescription2:[],

            /*scpecialisation 3*/
            titre1Spec3:"",
            description3:"",
            arrayDescription3:[],

            /*scpecialisation 4*/
            titre1Spec4:"",
            description4:"",
            arrayDescription4:[]
        }
    }

    handleChangeInput = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titre-section":
                this.setState({titreSection:event.target.value});
                break;

            case "titre-spec1":
                this.setState({titre1Spec1:event.target.value});
                break;

            case "description-1":
                this.setState({description1:event.target.value +"/"});
                break;

            case "description-2":
                this.setState({description2:event.target.value +"/"});

            case "description-3":
                this.setState({description3:event.target.value +"/"});
                break;

            case "description-4":
                this.setState({description4:event.target.value +"/"});
                break;
        
            default:
                break;
        }
    }

/* editAdminUser = (event) => {
        event.preventDefault();
        let data = {
            'subtitle':"",
            'title':"",
            'section':"",
            'description':"",
            'language':"",
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
      } */

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
    
       componentDidMount = async () => {
        //const { locale } = this.props;
        let locale = "fr"; 
        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let data = await getRessources('homepage', 'specialisation',locale);
        
        //une boucle qui permettra d'itérer chaque objet et de l'envoyer dans la fonction getTextToList
         for (let i = 0; i < data.length; i++) {
          this.getTextToList(data[i]);
         
        }
      }

    addDescription = (index, event) => {
        switch (event.target.id) {
            case `btn-add-description-1`:
                this.setState({arrayDescription1:[...this.state.arrayDescription1, this.state.description1]})
                break;

            case `btn-add-description-2`:
                this.setState({arrayDescription2:[...this.state.arrayDescription2, this.state.description2]})
                break;

            case `btn-add-description-3`:
                this.setState({arrayDescription3:[...this.state.arrayDescription3, this.state.description3]})
                break

            case `btn-add-description-4`:
                this.setState({arrayDescription4:[...this.state.arrayDescription4, this.state.description4]})
                break
        
            default:
                break;
        }
    }

    render(){
/*         let rowDescription = [];

        if(this.state.arrayDescription1.length > 0){
            this.state.arrayDescription1.map((description, index) => {
            rowDescription.push(<p key={index}>{description}</p>)
            })
        } */
        return(
            <div>
                <div>
                    <h1>Specialisation</h1>
                </div>
                <div>
                <form>
                    <div class="form-group row">
                        <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Titre de la section specialisation</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control form-control-sm" id="titre-spec1" placeholder="saisir votre titre" onChange={this.handleChangeInput}/>
                        </div>
                    </div>
                </form>

                </div>
                    {this.state.specialisation.length > 0 ?
                        this.state.specialisation.map((specialisation, index) => (
                            <div key={index}>
                                <h2>{`specialisation ${index + 1}`}</h2>
                                <form>
                                    <div class="form-group row">
                                        <label for="titre-spec1" class="col-sm-2 col-form-label col-form-label-sm">titre</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control form-control-sm" id="titre-spec1" placeholder="saisir le titre de la specialisation" value={this.state.titre1Spec1} onChange={this.handleChangeInput}/>
                                        </div>
                                    </div>
                                    <div style={{width:"50%"}}>
                                        <input type="text" class="form-control form-control-sm" id={`description-${index}`} value={this.state.description} placeholder="saisir une description" onChange={this.handleChangeInput}/>
                                        <button type="button" class="btn btn-primary" id={`btn-add-description-${index}`} onClick={this.addDescription.bind(this, index)}>ajouter une description</button>
                                    </div>
                                    <div>
                                        {/* Ajouter une description concernant la scpecialisation numero 1*/}
                                        {   
                                            index === 0 && this.state.arrayDescription1.length > 0 ? this.state.arrayDescription1.map((element, index) => (
                                                <p key={index}>{element}</p>
                                            ))
                                            :
                                            null
                                        }

                                        {/* Ajouter une description concernant la scpecialisation numero 2*/}
                                        {   
                                            index === 1 && this.state.arrayDescription2.length > 0 ? this.state.arrayDescription2.map((element, index) => (
                                                <p key={index}>{element}</p>
                                            ))
                                            :
                                            null
                                        }

                                       {/* Ajouter une description concernant la scpecialisation numero 3*/}
                                       {   
                                            index === 2 && this.state.arrayDescription3.length > 0 ? this.state.arrayDescription3.map((element, index) => (
                                                <p key={index}>{element}</p>
                                            ))
                                            :
                                            null
                                        }
                        
                                       {/* Ajouter une description concernant la scpecialisation numero 4*/}
                                       {   
                                            index === 3 && this.state.arrayDescription4.length > 0 ? this.state.arrayDescription4.map((element, index) => (
                                                <p key={index}>{element}</p>
                                            ))
                                            :
                                            null
                                        }

                                    </div>

                                    <div class="custom-file" style={{width:'50%'}}>
                                        <input type="file" class="custom-file-input" id="customFile"/>
                                        <label class="custom-file-label" for="customFile">Choisir votre image</label>
                                    </div>
                                </form>
                                <div>
                                        <button type="button" class="btn btn-primary" id={`btn-specialisation-${index}`}>valider</button>
                                </div>
                        </div>
                        ))
                        : null
                    }

                    
            </div>
        )
    }
}

export default SpecialisationAdmin;