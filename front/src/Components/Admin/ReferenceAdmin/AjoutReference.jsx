import React, { Component } from 'react';
import postRessources from './../../../utils/postRessources';
import $ from "jquery";


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class AjoutReferenceAdmin extends Component{
    constructor(props){
        super(props);
        this.state = {
            referenceAdmin: [],
            titrePage:"",
            titreSection:"",
            arraySections:[],

            /*reference*/
            nameReference:"",
            description:"",
            arrayDescription:[],
            urlImage:"",

            altImageLogoRef:"",
            altImageLogoSolution:"",
            altImage:"",
            nameImage:"",
            arrayImage:[],
    
            addDescription:"",
            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            document: [],
            documentLogoRef:[],
            documentLogoSolution:[],
            documentTosendBack:[],
            indexEdit:null,
            documentsFiles:[],


            objetImageCaroussel:[],
            objetImageLogoRef:[],
            objetImageLogoSolution:[]

        }

        this.objetImage = {};
    }
/*     objImages = {
        "logoRef":["name","alt"],
        "logoSolution":["name", "alt"],
        "imageCaroussel":[["name","alt"], ["name","alt"],["name","alt"], ["name","alt"] ]
        } */


    handleChangeInput = (event) => {
        switch (event.target.id) {
            case "titrePage-reference":
                this.setState({titrePage:event.target.value});
                break;

            case "titre-reference-name":
                this.setState({nameReference:event.target.value});
                break;

            case "titre-reference-section":
                this.setState({titreSection:event.target.value});
                break;

            case "addDescription-reference-admin":
                this.setState({addDescription:event.target.value});
                break; 
                
            case "url-image-reference-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-reference-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-reference-admin":
                this.setState({nameImage:event.target.value});
                break;

            case "alt-imageLogoRef-reference-admin":
                this.setState({altImageLogoRef:event.target.value});
                break;


            case "alt-imageLogoSolution-reference-admin":
                this.setState({altImageLogoSolution:event.target.value});
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
        //

        if(this.state.document.length > 0){

            // constitution de l'objet image caroussel pour affichage
            let arrayObjetImage = [];
            let objetImageDisplay = {};
            objetImageDisplay.name = this.state.document[0].name;
            objetImageDisplay.alt = this.state.altImage;
            arrayObjetImage.push(objetImageDisplay);

            this.setState({
                objetImageCaroussel:[...this.state.objetImageCaroussel, objetImageDisplay],
                documentsFiles:[...this.state.documentsFiles, this.state.document],
                altImage:"",
                document:[]
            });
            $("#uploadAddImageReferenceCaroussel")[0].value = "";

        }else if(this.state.documentLogoRef.length > 0){
            
            // constitution de l'objet logo reference pour affichage
            let arrayObjetImage = [];
            let objetImageDisplay = {};
            objetImageDisplay.name = this.state.documentLogoRef[0].name;
            objetImageDisplay.alt = this.state.altImageLogoRef;
            arrayObjetImage.push(objetImageDisplay);
            
            this.setState({ objetImageLogoRef:[...this.state.objetImageLogoRef, arrayObjetImage, this.state.documentLogoRef], altImageLogoRef:"", documentLogoRef:[] });
            $("#uploadAddImageLogoReference")[0].value = "";

        }else if(this.state.documentLogoSolution.length > 0){

            // constitution de l'objet logo reference pour affichage
            let arrayObjetImage = [];
            let objetImageDisplay = {};
            objetImageDisplay.name = this.state.documentLogoSolution[0].name;
            objetImageDisplay.alt = this.state.altImageLogoSolution;
            arrayObjetImage.push(objetImageDisplay);
        
            this.setState({ objetImageLogoSolution:[...this.state.objetImageLogoSolution, arrayObjetImage, this.state.documentLogoSolution], altImageLogoSolution:"", documentLogoSolution:[] });
            $("#uploadAddImageLogoSolution")[0].value = "";
        }

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
       
        let referenceAdmin = this.state.specSelected;
        let description = this.state.specSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:referenceAdmin[0].description});
    }


    addNewreferenceAdmin = async() => {
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

        
        let objetImageFinal = {};
        
        for(let i of this.state.objetImageLogoRef[0]){
                let array = [];
                array.push(i.name);
                array.push(i.alt);
                objetImageFinal.logoRef = array;
        }

        for(let i of this.state.objetImageLogoSolution[0]){
            let array = [];
            array.push(i.name);
            array.push(i.alt);
            objetImageFinal.logoSolution = array;
        }
        
    objetImageFinal.imageCaroussel = this.state.objetImageCaroussel;

        console.log(objetImageFinal)
        let dataImage = {
            'name':this.state.nameReference,
            'url': JSON.stringify(objetImageFinal),
            'alt':"",
            'homepage_id':0,
            'section':"reference"
        }

        let sectionDescription = [];
        for(let i of this.state.arraySections){
            sectionDescription.push(i[0]);
          }
/*         let count = 1;
        for(let i of this.state.arraySections){
            sectionDescription[`section${count}`] = i;
            count++
        } */

    
        let dataReference = {
            'title':this.state.titrePage,
            "subtitle":this.state.nameReference,
            'description': JSON.stringify(sectionDescription),
            'language':idLang,
            'image_id':0,
            "section":"reference"
        }


        // on ajoute toutes les images dans documentToSendBack
        let documentTosendBack = [];

        documentTosendBack.push(this.state.objetImageLogoRef[1]);
        documentTosendBack.push(this.state.objetImageLogoSolution[1]);
        
        for(let objetImage of this.state.documentsFiles){
            documentTosendBack.push(objetImage);
        }

        console.log(documentTosendBack);

        const data = new FormData()
        for(var x = 0; x < documentTosendBack.length; x++) {
            data.append('file', documentTosendBack[x][0])
        }

       console.log(data);
        

        await postRessources("reference", dataImage, dataReference, data);

        this.setState({ 
            nameReference:"",
            altImage:"",
            arrayDescription:[],
            nameImage:"",
            titrePage:"",
            urlImage:"",
            documentTosendBack:[],
            arrayImage:[],
            arraySections:[],
            nameReference:"",
            titrePage:"",
            document:[],
            documentLogoRef:[],
            documentLogoSolution:[],
            objetImageCaroussel:[],
            objetImageLogoRef:[],
            objetImageLogoSolution:[]
            });
        this.props.getStartedreferenceAdmin();
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
        console.log(event.target.id)
        switch (event.target.id) {
            case "uploadAddImageLogoReference":
                this.setState({documentLogoRef:file});
                break;

            case "uploadAddImageLogoSolution":
                this.setState({documentLogoSolution:file});
                break;

            case "uploadAddImageReferenceCaroussel":
                this.setState({document:file});
                break;
        
            default:
                break;
        }
 
    
/*         if (format_type.includes(event.target.files[0].type) && event.target.files[0].size <= 2000000) {
    
          this.setState({ document: file,urlImage:file.name, nameImage:file.name});
        } else {
          this.setState({ isTooHeavy: true });
          event.target.value = "";
          this.setState({isActive:true});
        } */
      };


      getIdImageReferenceToDelete = (index, event)  => {

        switch (event.target.id) {
            case "logoRef":
                this.setState({objetImageLogoRef:[]});
                break;

            case "logoSolution":
                this.setState({objetImageLogoSolution:[]});
                break;

            case "imageCaroussel":
                let arrayImageCaroussel = this.state.objetImageCaroussel;
                let documentsFiles = this.state.documentsFiles;

                arrayImageCaroussel.splice(index, 1);
                documentsFiles.splice(index, 1);
            
                this.setState({objetCaroussel:arrayImageCaroussel, documentsFiles:documentsFiles});
                break;
        
            default:
                break;
        }


      }



    render(){
        return(
            <div>
                <div id="accordion">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#partie1" aria-expanded="true" aria-controls="partie1">
                        partie 1
                    </button>

                    <form id="partie1" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="form-group">
                            <label htmlFor="titrePage-reference">Titre de la page <span style={{color:"red"}}>*</span></label>
                            <input className="form-control " value={this.state.titrePage} id="titrePage-reference" type="text" placeholder="titre de la page" onChange={this.handleChangeInput}/>
                        </div>


                        <div className="form-group">
                            <label htmlFor="titre-reference-name">Nom de la reference <span style={{color:"red"}}>*</span></label>
                            <input className="form-control" value={this.state.nameReference} id="titre-reference-name" type="text" placeholder="nom de la reference" onChange={this.handleChangeInput}/>
                        </div>
                    
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="titre-reference-section">Titre de la section</label>
                                <input className="form-control " value={this.state.titreSection} id="titre-reference-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput}/>
                            </div>

                            <label>Saisir une description</label>
                            
                            <div className="form-group">
                                <textarea className="form-control" type="text" value={this.state.addDescription} id="addDescription-reference-admin" onChange={this.handleChangeInput}/>
                            </div>
                            
                            <button type="button" className="btn btn-primary mr-2" onClick={this.addDescription}>Ajouter une description</button>
                            <button type="button" className="btn btn-primary" onClick={this.addSection}>Valider la section</button>
                                
                
                            <div className="description-reference-admin-modal">
                                <ul>
                                    {this.state.arrayDescription.length > 0 && this.state.arrayDescription.map((description, index) => (
                                        <div className="p-1">
                                            <li key={index}>{description} {"  "}<button type="button" className="btn btn-primary btn-sm" onClick={this.deleteDescription.bind(this, index)}>X</button></li>
                                        </div>
                                    ) )}
                                </ul>

                            </div>
                        </div>
                </form>
                
                <div className="p-2">
                    <button className="btn btn-link" data-toggle="collapse" data-target="#partie2" aria-expanded="true" aria-controls="partie2">
                            partie 2
                    </button>
                </div>


                <div id="partie2" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">

                            <div className="form-group mt-5">
                                    <div className="row" style={{marginLeft:"0"}}>
                                        {/*  upload logo de la référence */}  
                                        <div className="custom-file col-5">
                                            <input type="file" className="custom-file-input"  id="uploadAddImageLogoReference" onChange={this.handlerUploadFile} />
                                            <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >logo de la référence<span style={{color:"red"}}>*</span></label>
                                        </div>
                                        <div className="div-description-image-reference-admin col-5">
                                            <input className="form-control form-control-sm" value={this.state.altImageLogoRef} id="alt-imageLogoRef-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                                        </div>
                                        
                                        <div className="btn-ajouter-image-reference-admin col-2">
                                        {  
                                            this.state.altImageLogoRef !== "" && this.state.documentLogoRef.length > 0
                                            ? 
                                            <button type="button" className="btn btn-primary" style={{marginRight:"0"}} onClick={this.addAltImage}>ajouter</button> 
                                            :
                                            <button type="button" className="btn btn-secondary">ajouter</button> 
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
                                            <th scope="col">supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            this.state.objetImageLogoRef.map((element, index) => {
                                                if(index < 1){
                                                    return(
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{element[0].name ? element[0].name : element[0]}</td>
                                                            <td>{element[0].alt}</td>
                                                            <td> {<button type="button" className="btn btn-danger" id="logoRef" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                                                        </tr>
                                                    )
                
                                                } 
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>





                            <div className="form-group mt-5">
                                    <div className="row" style={{marginLeft:"0"}}>

                                        {/*  upload logo de la solution utilisée */}  
                                        <div className="custom-file col-5">
                                            <input type="file" className="custom-file-input"  id="uploadAddImageLogoSolution" onChange={this.handlerUploadFile} />
                                            <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >logo de la solution utilisée<span style={{color:"red"}}>*</span></label>
                                        </div>
                                        <div className="div-description-image-reference-admin col-5">
                                            <input className="form-control form-control-sm" value={this.state.altImageLogoSolution} id="alt-imageLogoSolution-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                                        </div>
                                        
                                        <div className="btn-ajouter-image-reference-admin col-2">
                                        {  
                                            this.state.altImageLogoSolution !== "" && this.state.documentLogoSolution.length > 0
                                            ? 
                                            <button type="button" className="btn btn-primary" onClick={this.addAltImage}>ajouter</button> 
                                            :
                                            <button type="button" className="btn btn-secondary">ajouter</button> 
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
                                            <th scope="col">supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            this.state.objetImageLogoSolution.map((element, index) => {
                                                if(index < 1){
                                                    return (
                                                        <tr key={index}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{element[0].name ? element[0].name : element[0]}</td>
                                                            <td>{element[0].alt}</td>
                                                            <td> {<button type="button" className="btn btn-danger" id="logoSolution" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                    

                            <div className="form-group mt-5">
                                <div className="row" style={{marginLeft:"0"}}>
                                    {/*  upload des images du caroussel */} 
                                    <div className="custom-file col-5">
                                        <input type="file" className="custom-file-input"  id="uploadAddImageReferenceCaroussel" onChange={this.handlerUploadFile} />
                                        <label className="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >images du caroussel<span style={{color:"red"}}>*</span></label>
                                    </div>
                                    <div className="div-description-image-reference-admin col-5">
                                        <input className="form-control form-control-sm" value={this.state.altImage} id="alt-image-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput}/>
                                    </div>
                                    
                                    <div className="btn-ajouter-image-reference-admin col-2">
                                    {  
                                        this.state.altImage !== "" && this.state.document.length 
                                        ? 
                                        <button type="button" className="btn btn-primary" onClick={this.addAltImage}>ajouter</button> 
                                        :
                                        <button type="button" className="btn btn-secondary">ajouter</button> 
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
                                            <th scope="col">supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                   {
                                            this.state.objetImageCaroussel.map((element, index) => (
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{element.name ? element.name : element}</td>
                                                    <td>{element.alt}</td>
                                                    <td> {<button type="button" className="btn btn-danger" id="imageCaroussel" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                                                </tr>
                                            ))
                                        } 

                                    </tbody>
                                </table>
                            </div>
                        </div>



                <div className="modal-footer pt-1">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                    {
                        this.state.objetImageCaroussel.length > 0 && this.state.objetImageLogoRef.length > 0 && this.state.objetImageLogoSolution.length > 0 && this.state.titrePage !== "" && this.state.nameReference !== "" ? 
                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewreferenceAdmin}>Enregistrer</button>
                    :
                    <button type="button" className="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="merci de saisir les champs obligatoires">Enregistrer</button>}
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


export default AjoutReferenceAdmin;