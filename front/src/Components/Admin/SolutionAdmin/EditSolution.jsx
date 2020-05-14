import React, { Component } from 'react';
import postRessources from './../../../utils/postRessources';
import $ from "jquery";
import DisplaySectionEdit from './DisplaySectionEdit';

const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class EditsolutionAdmin extends Component{
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
        if(this.state.document.length > 0 && this.state.document !== undefined){
            if(this.state.altImage !== "" && (this.state.document[0].name !== this.state.documentTosendBack[this.state.indexEdit].name) ){

                arrayImage[this.state.indexEdit].alt = this.state.altImage;
                arrayImageToSendBack.splice(this.state.indexEdit, 1);
                arrayImage[this.state.indexEdit].name = this.state.document[0].name;
    
                this.setState({documentTosendBack:[...this.state.documentTosendBack, this.state.document],arrayImage:arrayImage, altImage:"", indexEdit:null});
            }else{
                arrayImageToSendBack.splice(this.state.indexEdit, 1);
                arrayImage[this.state.indexEdit].name = this.state.document[0].name;
                this.setState({documentTosendBack:[...this.state.documentTosendBack, this.state.document]});
            }
    
        }else if(this.state.document.length > 0){

            arrayImageToSendBack.splice(this.state.indexEdit, 1);
            arrayImage[this.state.indexEdit].name = this.state.document[0].name;

            this.setState({documentTosendBack:[...this.state.documentTosendBack, this.state.document]});

        }else if(this.state.altImage !== ""){

            arrayImage[this.state.indexEdit].alt = this.state.altImage;
            arrayImageToSendBack.splice(this.state.indexEdit, 1);
            this.setState({arrayImage:arrayImage, altImage:"", indexEdit:null});
        }

        console.log("311 :", this.state.document[this.state.indexEdit]);
        $("#uploadAddImageSolutionAdmin")[0].value = "";
      }




    editsolutionAdmin = () => {

        function init(data) {
            const options = {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token')
                }),
                body: JSON.stringify(data)
            }
            return options;
        }

        const { arrayLang, locale } = this.props;
        let language = null;

        for (let i = 0; i < arrayLang.length; i++) {
            for (let [key, value] of Object.entries(arrayLang[i])) {
                if (locale === value) {
                    language = arrayLang[i].id;
                }
            }
        }

        let data = {
            "title": this.state.titrePage,
            "subtitle": this.state.nameSolution,
            "description": this.state.arrayDescription.join("/"),
            "section": "solutionAdmin",
            "language": language,
            "image_id": this.state.solutionToEdit[1]
        };

        let dataImage = {
            "name": this.state.nameImage,
            "url": this.state.urlImage,
            "alt": this.state.altImage,
            "section": "solutionAdmin",
            "homepage_id": 0
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



        if (this.state.solutionSelected.length > 0) {

            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            fetch(url, options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.solutionToEdit[1]}`;
            fetch(url, init(dataImage)).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.solutionToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));


            //on réactualise les solutions
            this.getStartedsolutionAdmin();
        }


    }


    render(){

        console.log("solution :",this.props.solutionAdmin.length > 0 ? JSON.parse(this.props.solutionAdmin[0].description) : "");
        return(
            <div>
                <div id="accordion">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#EditPartie1" aria-expanded="true" aria-controls="EditPartie1">
                        partie 1
                    </button>

                    <form id="EditPartie1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div class="form-group">
                            <label for="titre-section">Titre de la page <span style={{color:"red"}}>*</span></label>
                            <textarea class="form-control " value={this.props.titrePage} id="titre-section" type="text" placeholder="titre de la page" onChange={this.props.handleChangeInput}/>
                        </div>


                        <div class="form-group">
                            <label for="titre-solution-name">Nom de la solution <span style={{color:"red"}}>*</span></label>
                            <input class="form-control" value={this.props.nameSolution} id="titre-solution-name" type="text" placeholder="nom de la solution" onChange={this.props.handleChangeInput}/>
                        </div>
                    
                        <div class="modal-body">
                            <div className="pt-3">
                                {
                                    this.props.jsonParseDescriptionSolutionSelected.length > 0 
                                    &&
                                    <DisplaySectionEdit description={this.props.jsonParseDescriptionSolutionSelected}/>
                                }
                            </div>
                        </div>
                </form>
                
                <div className="p-2">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#EditPartie2" aria-expanded="false" aria-controls="EditPartie2">
                            partie 2
                    </button>
                </div>


                <div id="EditPartie2" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                            <div class="custom-file">
                                <input type="file" className="custom-file-input"  id="uploadAddImageSolutionAdmin" onChange={this.handlerUploadFile} />
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

        
                        <div id="EditPartie3" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
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


export default EditsolutionAdmin;