import React, { Component } from 'react';

import postRessources from './../../../utils/postRessources';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class AjoutSolutionHomepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            SolutionHomepage: [],

            /*SolutionHomepage*/
            descriptionSolutionHomepage:"",
            titreSolutionHomepage:"",

            // state image
            urlImage:"",
            altImage:"",
            nameImage:"",
            document: null,
            SolutionHomepageToDelete:null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            idToEdit:null
        }
    }

    handleChangeInput = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case "titre-section":
                this.setState({titreSection:event.target.value});
                break;

            case "titre-savoiFaire-admin":
                this.setState({titreSolutionHomepage:event.target.value});
                break;

            case "description-SolutionHomepage-admin":
                this.setState({descriptionSolutionHomepage:event.target.value});
                break; 
                
            case "url-image-SolutionHomepage-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-SolutionHomepage-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-SolutionHomepage-admin":
                this.setState({nameImage:event.target.value});
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

    addNewSolutionHomepage= async() => {
        const {arrayLang, locale } = this.props;

        let idLang;
        let description = this.state.descriptionSolutionHomepage;

        for(let i in arrayLang){
            if(Object.values(arrayLang[i]).includes(locale)){
                idLang = Object.values(arrayLang[i])[2];
            }
        }


        let dataImage = {
            'name':this.state.nameImage,
            'url':this.state.urlImage,
            'alt':this.state.altImage,
            'homepage_id':0,
            'section':'solution'
        }

        let dataHomepage = {
            'subtitle':this.state.titreSolutionHomepage,
            'title':this.state.titreSection,
            'section':"solution",
            'description':description,
            'language':idLang,
            'image_id':0
        }

        const data = new FormData()
        data.append('file', this.state.document)
        
        await postRessources("homepage", dataImage, dataHomepage, data);
        
        this.setState({altImage:"", descriptionSolutionHomepage:"", nameImage:"",urlImage:"", titreSolutionHomepage:"", titreSection:""});
        this.props.getStartedSolutionHomepage();
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
                    <div>

                    <div className="form-group">
                        
                    <div class="form-group">
                            <label for="titre-section">Titre section</label>
                            <input class="form-control" value={this.state.titreSection} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput}/>
                        </div>
                        
                        <div class="form-group">
                            <label for="titre-savoiFaire-admin">Titre du savoir-faire</label>
                            <input class="form-control " value={this.state.titreSolutionHomepage} id="titre-savoiFaire-admin" type="text" placeholder="titre de la specialisation" onChange={this.handleChangeInput}/>
                        </div>

                        <label>Saisir une description</label>
                        <textarea type="text" value={this.state.descriptionSolutionHomepage} className="form-control" id="description-SolutionHomepage-admin" onChange={this.handleChangeInput}/>

                        <label htmlFor="alt-image-SolutionHomepage-admin" className="col-form-label">description de l'image</label>
                        <div className=""> 
                            <input type="text" value={this.state.altImage} className="form-control" id="alt-image-SolutionHomepage-admin" onChange={this.handleChangeInput}/>
                        </div>

                        <div class="custom-file">
                            <input type="file" className="custom-file-input" onChange={this.handlerUploadFile}/>
                            <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                        </div>
                        </div>
                    </div>

                </form>
                <div class="modal-footer pt-1">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addNewSolutionHomepage}>Enregistrer</button>
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


export default AjoutSolutionHomepage;