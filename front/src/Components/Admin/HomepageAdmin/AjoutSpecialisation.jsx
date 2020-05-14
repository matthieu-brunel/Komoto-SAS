import React, { Component } from 'react';
import './AjoutSpecialisation.css';
import postRessources from './../../../utils/postRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class AjoutSpecialisation extends Component{
    constructor(props){
        super(props);
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

            addDescription:"",
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            document: null,
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

    addDescription = () => {

  
        let description = [];
        description.push(this.state.addDescription);

        this.setState({arrayDescription:[...this.state.arrayDescription,this.state.addDescription], addDescription:""});
    }

    deleteDescription = (index, event) => {
       

        let description = this.state.arrayDescription;

        description.splice(index, 1);
        console.log(description);

        this.setState({arrayDescription:description});
    }

    editDescription = (index, event) => {
       
        let specialisation = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:specialisation[0].description});
    }

    async fetch(){

    }

    addNewSpecialisation = async() => {
        const {arrayLang, locale } = this.props;

        let idLang;
        let description = this.state.arrayDescription.join("/");

        for(let i in arrayLang){
            if(Object.values(arrayLang[i]).includes(locale)){
                idLang = Object.values(arrayLang[i])[2];
            }
        }
        const options = {
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('token')
            })
        }

        let dataImage = {
            'name':this.state.nameImage,
            'url':this.state.urlImage,
            'alt':this.state.altImage,
            'homepage_id':0,
            'section':'specialisation'
        }

        let dataHomepage = {
            'subtitle':this.state.titreSpec,
            'title':this.state.titreSection,
            'section':"specialisation",
            'description':description,
            'language':idLang,
            'image_id':0
        }

        const data = new FormData()
        data.append('file', this.state.document)
        
        await postRessources("homepage", dataImage, dataHomepage, data);
        this.setState({titreSpec:"", altImage:"", arrayDescription:[], nameImage:"",titreSection:"",urlImage:""});
        this.props.getStartedSpecialisation();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

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
    
        if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
    
          this.setState({ document: file,urlImage: REACT_APP_SERVER_ADDRESS_FULL + "/images/" + file.name, nameImage:file.name});
        } else {
          this.setState({ isTooHeavy: true });
          event.target.value = "";
          this.setState({isActive:true});
        }
      };

    render(){
  
        return(
            <div>
                <form>
                    {  this.props.specialisation.length > 0
                    ?
                    ""
                    :
                    <div class="form-group">
                        <label for="titre-section">Titre section</label>
                        <input class="form-control" value={this.state.titreSection} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput}/>
                    </div>
                    }

                    <div class="form-group">
                        <label for="titre-spec-admin">Titre section</label>
                        <input class="form-control " value={this.state.titreSpec} id="titre-spec-admin" type="text" placeholder="titre de la specialisation" onChange={this.handleChangeInput}/>
                    </div>

                    <div class="modal-body">
                        <label>Saisir une description</label>
                        
                        <div class="form-group">
                            <textarea class="form-control" type="text" value={this.state.addDescription} id="addDescription-spec-admin" onChange={this.handleChangeInput}/>
                        </div>
                        
                        <button type="button" class="btn btn-primary" onClick={this.addDescription}>Ajouter une description</button>
                            
                      
                       
                        <div className="description-spec-admin-modal">
                            <ul>
                                {this.state.arrayDescription.length > 0 && this.state.arrayDescription.map((description, index) => (
                                    <div className="p-1">
                                        <li key={index}>{description} {"  "}<button type="button" class="btn btn-primary btn-sm" onClick={this.deleteDescription.bind(this, index)}>X</button></li>
                                    </div>
                                ) )}
                            </ul>

                        </div>
                    </div>
                    

                    <div class="custom-file">
                       <input type="file" className="custom-file-input"  onChange={this.handlerUploadFile}/>
                       <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                   </div>

                    <div class="form-group">
                        <label for="alt-image-spec-admin">Description de l'image</label>
                        <input class="form-control form-control-sm" value={this.state.altImage} id="alt-image-spec-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                    </div>

                </form>
                <div class="modal-footer pt-1">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addNewSpecialisation}>Enregistrer</button>
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
        )
    }
}


export default AjoutSpecialisation;