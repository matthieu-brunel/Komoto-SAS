import React, { Component } from 'react';
import postRessources from './../../../utils/postRessources';
import $ from "jquery";
import './AjoutSolution.css';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class AjoutsolutionAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            solutionAdmin: [],
            titrePage:"",
            titreSection:"",
            arraySections:[],

            /*solution*/
            nameSolution:"",
            description:"",
            arrayDescription:[],
            urlImage:"",

            altImage:"",
            nameImage:"",
            arrayImage:[],
    
            addDescription:"",
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            document: [],
            documentTosendBack:[],
            indexEdit:null
        }
    }

    handleChangeInput = (event) => {
        switch (event.target.id) {
            case "titrePage-solution":
                this.setState({titrePage:event.target.value});
                break;

            case "titre-solution-name":
                this.setState({nameSolution:event.target.value});
                break;

            case "titre-solution-section":
                this.setState({titreSection:event.target.value});
                break;

            case "addDescription-solution-admin":
                this.setState({addDescription:event.target.value});
                break; 
                
            case "url-image-solution-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-solution-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-solution-admin":
                this.setState({nameImage:event.target.value});
                break;

            case "refId-image-solution-admin":
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

    addAltImage = () => {

  
        let arrayObjetImage = [];
        let objetImage = {};

        objetImage.name = this.state.document[0].name;
        objetImage.alt = this.state.altImage;

        arrayObjetImage.push(objetImage);

        this.setState({arrayImage:[...this.state.arrayImage, objetImage], documentTosendBack:[...this.state.documentTosendBack, this.state.document], altImage:""});
        

    }
 
    
    addSection = () => {

    
        let sectionArray = [];
        let sectionObj = {};

        sectionObj.title = this.state.titreSection;
        sectionObj.description = this.state.arrayDescription;

        sectionArray.push(sectionObj);

        this.setState({arraySections:[...this.state.arraySections,sectionArray], arrayDescription:"", titreSection:""});
    }

    deleteDescription = (index, event) => {
       
        let description = this.state.arrayDescription;
        description.splice(index, 1);

        this.setState({arrayDescription:description});
    }

    editDescription = (index, event) => {
       
        let solutionAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:solutionAdmin[0].description});
    }

    async fetch(){

    }

    addNewsolutionAdmin = async() => {
        const {arrayLang, locale } = this.props;

        let idLang;
      
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

        
        let urlImageJoin = [];
        let altImageJoin = [];

        this.state.arrayImage.map(obj => {
            console.log(obj.name)
            console.log(obj.alt)
            urlImageJoin.push(obj.name);
            altImageJoin.push(obj.alt);
        });


        let dataImage = {
            'name':this.state.nameSolution,
            'url':urlImageJoin.join("/"),
            'alt':altImageJoin.join("/"),
            'homepage_id':0,
            'section':this.state.nameSolution
        }

        console.log(dataImage);

        let sectionDescription = {};

        let count = 1;
        for(let i of this.state.arraySections){
            sectionDescription[`section${count}`] = i;
            count++
        }

        console.log(sectionDescription);

        let dataSolution = {
            'title':this.state.titrePage,
            'name':this.state.nameSolution,
            'description': JSON.stringify(this.state.arraySections),
            'language':idLang,
            'image_id':0
        }



        const data = new FormData()
        for(var x = 0; x < this.state.documentTosendBack.length; x++) {
            data.append('file', this.state.documentTosendBack[x][0])
        }
        

        await postRessources("test", dataImage, dataSolution, data);

        this.setState({ 
            nameSolution:"",
            altImage:"",
            arrayDescription:[],
            nameImage:"",
            titrePage:"",
            urlImage:"",
            documentTosendBack:[],
            arrayImage:[],
            arraySections:[],
            nameSolution:"",
            titrePage:"",
            document:[]
            });
        this.props.getStartedsolutionAdmin();
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
    
        //let file = event.target.files[0] ? event.target.files[0] : "";
        let file = [];
        file.push(event.target.files[0]);

     

        this.setState({ document: file});

    
/*         if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
    
          this.setState({ document: file,urlImage:file.name, nameImage:file.name});
        } else {
          this.setState({ isTooHeavy: true });
          event.target.value = "";
          this.setState({isActive:true});
        } */
      };

      getIdImageSolutionToEdit = (index, event)  => {
        this.setState({indexEdit:index, document:[]});
      }

      getIdImageSolutionToDelete = (index, event)  => {
        let arrayImageToSendBack = this.state.documentTosendBack;  
        let arrayImage = this.state.arrayImage;

        arrayImage.splice(index, 1);
        arrayImageToSendBack.splice(this.state.indexEdit, 1);

        this.setState({arrayImage:arrayImage, indexEdit:index, documentTosendBack:arrayImageToSendBack});

      }


      editImageAdmin = () => {
        let arrayImageToSendBack = this.state.documentTosendBack;
        let arrayImage = this.state.arrayImage;
        if(this.state.altImage !== ""){
            arrayImage[this.state.indexEdit].alt = this.state.altImage;
            
            this.setState({arrayImage:arrayImage,altImage:"", indexEdit:null})

        }else if(this.state.document.length > 0){

            arrayImageToSendBack.splice(this.state.indexEdit, 1);
            arrayImage[this.state.indexEdit].name = this.state.document[0].name;

            this.setState({documentTosendBack:[...this.state.documentTosendBack, this.state.document]});
        }
      }



    render(){
        console.log(this.state.arrayImage.length > 0 ? this.state.arrayImage.map((element, index) => element) : "");
        return(
            <div>
                <div id="accordion">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#partie1" aria-expanded="true" aria-controls="partie1">
                        partie 1
                    </button>

                    <form id="partie1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="form-group">
                            <label for="titrePage-solution">Titre de la page <span style={{color:"red"}}>*</span></label>
                            <input class="form-control " value={this.state.titrePage} id="titrePage-solution" type="text" placeholder="titre de la page" onChange={this.handleChangeInput}/>
                        </div>


                        <div class="form-group">
                            <label for="titre-solution-name">Nom de la solution <span style={{color:"red"}}>*</span></label>
                            <input class="form-control" value={this.state.nameSolution} id="titre-solution-name" type="text" placeholder="nom de la solution" onChange={this.handleChangeInput}/>
                        </div>
                    
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="titre-solution-section">Titre de la section</label>
                                <input class="form-control " value={this.state.titreSection} id="titre-solution-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput}/>
                            </div>

                            <label>Saisir une description</label>
                            
                            <div class="form-group">
                                <textarea class="form-control" type="text" value={this.state.addDescription} id="addDescription-solution-admin" onChange={this.handleChangeInput}/>
                            </div>
                            
                            <button type="button" class="btn btn-primary mr-2" onClick={this.addDescription}>Ajouter une description</button>
                            <button type="button" class="btn btn-primary" onClick={this.addSection}>Valider la section</button>
                                
                
                            <div className="description-solution-admin-modal">
                                <ul>
                                    {this.state.arrayDescription.length > 0 && this.state.arrayDescription.map((description, index) => (
                                        <div className="p-1">
                                            <li key={index}>{description} {"  "}<button type="button" class="btn btn-primary btn-sm" onClick={this.deleteDescription.bind(this, index)}>X</button></li>
                                        </div>
                                    ) )}
                                </ul>

                            </div>
                        </div>
                </form>
                
                <div className="p-2">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#partie2" aria-expanded="true" aria-controls="partie2">
                            partie 2
                    </button>
                </div>


                <div id="partie2" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="custom-file">
                                <input type="file" className="custom-file-input"  onChange={this.handlerUploadFile} />
                                <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >Upload une image <span style={{color:"red"}}>*</span></label>
                            </div>

                            <div class="form-group mt-5">
                                <h6 className="text-center">Description de l'image</h6>
                                <div className="row">
                                    <div className="div-description-image-solution-admin col-10">
                                        <input class="form-control form-control-sm" value={this.state.altImage} id="alt-image-solution-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                                    </div>
                                    
                                    <div className="btn-ajouter-image-solution-admin col-2">
                                    {   this.state.altImage !== "" && this.state.document.length > 0
                                        ? 
                                        <button type="button" class="btn btn-primary" onClick={this.addAltImage}>ajouter</button> 
                                        :
                                        <button type="button" class="btn btn-secondary">ajouter</button> 
                                    }
                                    </div>
                                </div>


                                

                            </div>

                            <div className="pt-3">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">nom de l'image</th>
                                            <th scope="col">description de l'image</th>
                                            <th scope="col">modification</th>
                                            <th scope="col">supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            this.state.arrayImage.map((element, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{element.name ? element.name : element}</td>
                                                    <td>{element.alt}</td>
                                                    <td> {<button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#partie3" aria-expanded="true" aria-controls="partie3" onClick={this.getIdImageSolutionToEdit.bind(this, index)}>Modifier</button>}</td>
                                                    <td> {<button type="button" class="btn btn-danger" onClick={this.getIdImageSolutionToDelete.bind(this, index)}>X</button>}</td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

        
                        <div id="partie3" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                                    <h3 className="text-center p-3">Modification</h3>
                                    <div class="custom-file">
                                        <input type="file" className="custom-file-input"  onChange={this.handlerUploadFile} />
                                        <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >Upload une image <span style={{color:"red"}}>*</span></label>
                                    </div>

                                    <div class="form-group mt-5">
                                        <h6 className="text-center">Description de l'image</h6>
                                        <div className="row">
                                            <div className="div-description-image-solution-admin col-10">
                                                <input class="form-control form-control-sm" value={this.state.altImage} id="alt-image-solution-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                                            </div>
                                            
                                            <div className="btn-ajouter-image-solution-admin col-2">
                                                <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#partie2" aria-expanded="true" aria-controls="partie2" onClick={this.editImageAdmin}>modifier</button>
                                            </div>
                                        </div>


                                    </div>
                                </div>



                <div class="modal-footer pt-1">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

                    {
                        this.state.document.length > 0 && this.state.titrePage !== "" && this.state.nameSolution !== "" ? 
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addNewsolutionAdmin}>Enregistrer</button>
                    :
                    <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="merci de saisir les champs obligatoires">Enregistrer</button>}
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
        )
    }
}


export default AjoutsolutionAdmin;