import React, { Component } from 'react';

import getRessources from './../../../utils/getRessources';
//import "./ShowroomAdmin.css";
import AjoutShowroom from './AjoutShowroom';
import DeleteShowroom from './DeleteShowroom';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class ShowroomAdmin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showroom: [],
            titreSection:"",

            /*savoir-faire*/
            titreShowroom:"",
            descriptionShowroom:"",
            urlImage:"",
            altImage:"",
            nameImage:"",
            document: null,
            ShowroomToDelete:null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            idToEdit:null,
            ShowroomToEdit:[]

        }
        
    }

    handlerUploadFile = event => {
        const format_type = [
          "application/pdf",
          "application/doc",
          "application/docx",
          "application/xls",
          "application/csv",
          "application/txt",
          "application/rtf",
          "application/html",
          "application/zip",
          "audio/mp3",
          "video/wma",
          "video/mpg",
          "video/flv",
          "video/avi", 
          "image/jpg",
          "image/jpeg",
          "image/png",
          "image/gif"
        ];
    
        let file = event.target.files[0] ? event.target.files[0] : "";
        console.log("urlImage: ",REACT_APP_SERVER_ADDRESS_FULL + "/images/" + file.name)
        if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
    
          this.setState({ document: file,urlImage: REACT_APP_SERVER_ADDRESS_FULL + "/images/" + file.name, nameImage:file.name});
        } else {
          this.setState({ isTooHeavy: true });
          event.target.value = "";
          this.setState({isActive:true});
        }
      };


    handleChangeInput = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titre-section-showroom":
                this.setState({titreSection:event.target.value});
                break;

            case "titre-showroom-admin":
                this.setState({titreShowroom:event.target.value});
                break;

            case "description-showroom-admin":
                this.setState({descriptionShowroom:event.target.value});
                break; 
                
            case "url-image-showroom-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-showroom-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-showroom-admin":
                this.setState({nameImage:event.target.value});
                break;

            case "refId-image-showroom-admin":
                this.setState({refIdImage:event.target.value});
                break;
        
            default:
                break;
        }
    }

    getShowroom = (id) => {
        let index = id;
      
        let ShowroomSelected = [];
        ShowroomSelected.push(this.state.showroom[index]);
        this.setState({
            ShowroomSelected:ShowroomSelected,
            titreShowroom:this.state.showroom[index].subtitle,
            descriptionShowroom:this.state.showroom[index].description,
            altImage:this.state.showroom[index].alt,
            urlImage:this.state.showroom[index].url,
            nameImage:this.state.showroom[index].name,
            titreSection:this.state.showroom[index].title
        })
    }




    
    componentDidMount = () => {
        this.getStartedShowroom();
    }

    getStartedShowroom = async() => {
        const { locale } = this.props;

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let showroom = await getRessources("homepage", "demonstration", locale);
     
        this.setState({ showroom: showroom });
        
    }

    componentDidUpdate(prevProps){
        if(prevProps.locale !== this.props.locale){
            this.setState({showroom:"", ShowroomSelected:"",titreSection:""});
            this.getStartedShowroom();
        }
    }


    closeModal = () => {
        this.setState({descriptionShowroom:""})
        this.getStartedShowroom();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    descriptionShowroom = () => {

        let showroom = this.state.ShowroomSelected;
        let description = this.state.ShowroomSelected[0].description;
        description.push(this.state.descriptionShowroom);
        showroom[0].description = description;
        this.setState({descriptionShowroom:showroom[0].description});
    }

    deleteDescription = (index, event) => {
       
        let showroom = this.state.ShowroomSelected;
        let description = this.state.ShowroomSelected[0].description;

        description.splice(index, 1);

        this.setState({descriptionShowroom:showroom[0].description});
    }

    getIdShowroomToDelete = (index, event) => {
       let arrayIdShowroom = [];
       arrayIdShowroom.push(this.state.showroom[index].id);
       arrayIdShowroom.push(this.state.showroom[index].id_image);

       this.setState({ShowroomToDelete:arrayIdShowroom});
    }

    getIdShowroomToEdit = (index, event) => {
        let arrayIdShowroom = [];
        arrayIdShowroom.push(this.state.showroom[index].id);
        arrayIdShowroom.push(this.state.showroom[index].id_image);
        this.getShowroom(index);
        this.setState({ShowroomToEdit:arrayIdShowroom, idToEdit:index});
     }

    editDescription = (index, event) => {
       
        let showroom = this.state.ShowroomSelected;
        let description = this.state.ShowroomSelected[0].description;

        description.splice(index, 1);

        this.setState({descriptionShowroom:showroom[0].description});
    }

    editShowroom = () => {

        function init(data){
            const options = {
                method:'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
                body:JSON.stringify(data)
            }
            return options;
        }

        const { arrayLang, locale } = this.props;
        let language_id = null;

        for(let i = 0; i < arrayLang.length; i++){
            for (let  [,value] of Object.entries(arrayLang[i])) {
                if(locale === value){
                    language_id = arrayLang[i].id;
                }
            }
        }

        let data = {
            "title":this.state.titreSection,
            "subtitle":this.state.titreShowroom,
            "description":this.state.descriptionShowroom,
            "section":"demonstration",
            "language_id":language_id,
            "image_id":this.state.ShowroomToEdit[1]
        };

        let dataImage = {
            "name":this.state.nameImage,
            "url":this.state.urlImage,
            "alt":this.state.altImage,
            "section":"demonstration",
            "homepage_id":0
        };


        const documentImage = new FormData();
        documentImage.append("file", this.state.document);


        const options = {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            redirect: "follow",
            referrer: "no-referrer",
            body: documentImage
        }





            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            this.state.document !== null && fetch(url, options).then(res => res.json()).then(res => console.log(res));
            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.ShowroomToEdit[1]}`;
            fetch(url,  init(dataImage)).then(res => res.json()).then(res => console.log(res));
    
            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.ShowroomToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));
    

            //on réactualise showroom
           this.getStartedShowroom();
        

    }


    render(){


        return(
            <div>
                <div>
                    <h1>Showroom</h1>
                </div>

                <div >
                    {!this.state.showroom.length > 0 && 
                    <div className="pt-3 pb-3">
                        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#new-showroom-admin">Ajouter un showroom</button>
                    </div>}

                    <div className="position-tab pt-3">
                    <table className="table table-striped" style={{width:"75%"}}>
                        <thead>
                        <tr>
                                <th scope="col">#</th>
                                <th scope="col">titre de la section</th>
                                <th scope="col">nom du showroom</th>
                                <th scope="col">modification</th>
                                <th scope="col">Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>
                         {this.state.showroom.length > 0 &&
                            this.state.showroom.map((element, index) => (
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{element.title}</td>
                                <td>{element.subtitle}</td>
                                <td> {<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editShowroomAmdin" onClick={this.getIdShowroomToEdit.bind(this, index)}>Modifier</button>}</td>
                            <td>{<button type="button" className="btn btn-danger" data-toggle="modal" data-target="#delete-showroom-admin" onClick={this.getIdShowroomToDelete.bind(this, index)}>Supprimer</button>}</td>
                            </tr>
                            ))
                        }

                        </tbody>
                    </table>
                    </div>
                </div>



                {/* <!-- Nouvelle spécialisation --> */}
              
                <div className="modal fade" id="new-showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Nouveau showroom</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <AjoutShowroom {...this.props} showroom={this.state.showroom} getStartedShowroom={this.getStartedShowroom}/>
                            </div>
                        </div>
                    </div>
                </div>
                                
                {/* <!-- suppression d'une spécialisation --> */}
                <div className="modal fade" id="delete-showroom-admin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalScrollableTitle">Suppression d'un showroom</h5>
                            </div>
                            <div className="modal-body">
                                <DeleteShowroom showroom={this.state.showroom} ShowroomToDelete={this.state.ShowroomToDelete} getStartedShowroom={this.getStartedShowroom}/>
                            </div>
                        </div>
                    </div>
                </div> 

                {/* <!-- Modification d'un savoir faire --> */}
                <div className="modal fade" id="editShowroomAmdin" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modifier un showroom</h5>
                        </div>
                        <div className="modal-body">
                        {this.state.showroom.length > 0 && <div className="form-group">
                                <div className="form-group">
                                    <label htmlFor="titre-section">Titre de la section showroom</label>
                                    <input className="form-control" value={this.state.titreSection} id="titre-section-showroom" type="text" placeholder="titre de la section" onChange={this.handleChangeInput}/>
                                </div>
                                <label>Saisir le titre du showroom</label>
                                <input type="text" className="form-control" value={this.state.titreShowroom} id="titre-showroom-admin" onChange={this.handleChangeInput}/>

                                <label>Saisir une description</label>
                                <textarea type="text" value={this.state.descriptionShowroom} className="form-control" id="description-showroom-admin" onChange={this.handleChangeInput}/>
 
                            
                                <label htmlFor="alt-image-showroom-admin" className="col-form-label col-form-label-sm">alt de l'image (SEO)</label>
                                <div className=""> 
                                    <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-showroom-admin" onChange={this.handleChangeInput}/>
                                </div>

                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" onChange={this.handlerUploadFile}/>
                                    <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                </div>
                            </div>}
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" id="titre-showroom-admin-Fermer" data-dismiss="modal" onClick={this.closeModal}>Fermer</button>
                                <button type="button" className="btn btn-primary"  data-dismiss="modal" onClick={this.editShowroom}>Enregistrer</button>
                            </div>
                            {/* [début:popup error] si le format est pas pris en charge ou si le fichier est trop lourd */}
                            {this.state.isTooHeavy && (
                                <div className={`${this.state.isActive ? "div-active-error" : "div-desactive-error"}`}>
                                    <span className="text-alert-error">
                                        {this.state.message_too_heavy}
                                    </span> {" "}<button type="button" className="btn btn-danger btn-sm" onClick={this.handleCloseModal}>ok</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ShowroomAdmin;