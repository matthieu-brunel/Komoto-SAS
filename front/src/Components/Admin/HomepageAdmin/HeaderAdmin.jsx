import React, { Component } from 'react';
import AjoutHeader from './AjoutHeader';
import DeleteHeader from './DeleteHeader';
import getRessources from './../../../utils/getRessources';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


class HeaderAdmin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            header: [],

            /*scpecialisation*/
            descriptionHeader:"",

            // state image
            urlImage:"",
            altImage:"",
            nameImage:"",
            document: null,
            headerToDelete:null,

            isTooHeavy: false,
            message_too_heavy: "Format non pris en charge ou fichier trop lourd.",
            isActive:true,
            idToEdit:null
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

            case "addDescription-header-admin":
                this.setState({descriptionHeader:event.target.value});
                break; 
                
            case "url-image-header-admin":
                this.setState({urlImage:event.target.value});
                break;

            case "alt-image-header-admin":
                this.setState({altImage:event.target.value});
                break;

            case "name-image-header-admin":
                this.setState({nameImage:event.target.value});
                break;
            default:
                break;
        }
    }

    getHeader = (id) => {
        let index = id;
      
        let headerSelected = [];
        headerSelected.push(this.state.header[index]);
        this.setState({

            altImage:this.state.header[index].alt,
            urlImage:this.state.header[index].url,
            nameImage:this.state.header[index].name,
            descriptionHeader:this.state.header[index].description
        })
    }



    componentDidMount = () => {
        this.getStartedHeader();
    }

    getStartedHeader = async() => {
        const { locale } = this.props;
        console.log("locale : ", locale);

        //on récupère les données depuis la fonction externe getRessources de maniere aysnchrone
        let data = await getRessources('homepage', 'header',locale);
  
        this.setState({header:data});
        

    }

    componentDidUpdate(prevProps){
        if(prevProps.locale !== this.props.locale){
            this.setState({header:"", headerSelected:"",titreSection:""});
            this.getStartedHeader();
        }
    }


    closeModal = () => {
        this.setState({descriptionHeader:"", altImage:"", urlImage:"", nameImage:""});
        this.getStartedHeader();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };

    addDescription = () => {

        let header = this.state.headerSelected;
        let description = this.state.headerSelected[0].description;
        description.push(this.state.addDescription);
        header[0].description = description;
        this.setState({arrayDescription:header[0].description, addDescription:""});
    }


    getIdheaderToEdit = (index, event) => {
        let arrayIdheader = [];
        arrayIdheader.push(this.state.header[index].id);
        arrayIdheader.push(this.state.header[index].id_image);
        this.getHeader(index);
        this.setState({headerToEdit:arrayIdheader, idToEdit:index});
     }

    editDescription = (index, event) => {
       
        let header = this.state.headerSelected;
        let description = this.state.headerSelected[0].description;

        description.splice(index, 1);

        this.setState({arrayDescription:header[0].description});
    }

    getIdHeaderToDelete = (index, event) => {
        let arrayIdHeader = [];
        arrayIdHeader.push(this.state.header[index].id);
        arrayIdHeader.push(this.state.header[index].id_image);
 
        this.setState({headerToDelete:arrayIdHeader});
     }

    editheader = () => {

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
        let language = null;

        for(let i = 0; i < arrayLang.length; i++){
            for (let [key, value] of Object.entries(arrayLang[i])) {
                if(locale === value){
                    language = arrayLang[i].id;
                }
            }
        }

        let data = {
            "title":"",
            "subtitle":"",
            "description":this.state.descriptionHeader,
            "section":"header",
            "language":language,
            "image_id":this.state.headerToEdit[1]
        };

        let dataImage = {
            "name":this.state.nameImage,
            "url":this.state.urlImage,
            "alt":this.state.altImage,
            "section":"header",
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



        if(this.state.header.length > 0){

            // fetch pour envoi d el'image dans le dossier back/public/images
            let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/uploadImage';
            fetch(url,  options).then(res => res.json()).then(res => console.log(res));

            // fetch pour modification des champs de la table image
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/image/${this.state.headerToEdit[1]}`;
            fetch(url,  init(dataImage)).then(res => res.json()).then(res => console.log(res));
    
            // fetch pour modification des champs de la table homepage
            url = `${REACT_APP_SERVER_ADDRESS_FULL}/api/homepage/${this.state.headerToEdit[0]}`;
            fetch(url, init(data)).then(res => res.json()).then(res => console.log(res));
    
            //on réactualise les spécialisations
           this.getStartedHeader();
        }

    }


    render(){


        return(
            <div>
                <div>
                    <h1>Entête du site</h1>
                </div>
                <div>
                        <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#new-header-admin">Nouvel entête</button>
                    </div>
                <div>

                    <table className="table table-striped" style={{width:"75%"}}>
                        <thead>
                        <tr>
                                <th scope="col">#</th>
                                <th scope="col">description</th>
                                <th scope="col">modification</th>
                                <th scope="col">Supprimer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.header.length > 0 &&
                            this.state.header.map((element, index) => (
                                <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{element.description}</td>
                                <td> {<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editheaderAmdin" onClick={this.getIdheaderToEdit.bind(this, index)}>Modifier</button>}</td>
                                <td>{<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete-header-admin" onClick={this.getIdHeaderToDelete.bind(this, index)}>Supprimer</button>}</td>

                            </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>

                
                {/* <!-- Nouvel entête --> */}
              
                <div class="modal fade" id="new-header-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Nouvel entête</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <AjoutHeader {...this.props} header={this.state.header} getStartedHeader={this.getStartedHeader}/>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <!-- suppression d'un entête --> */}
                <div class="modal fade" id="delete-header-admin" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalScrollableTitle">Suppression d'une spécialisation</h5>
                            </div>
                            <div class="modal-body">
                                <DeleteHeader header={this.state.header} headerToDelete={this.state.headerToDelete} getStartedHeader={this.getStartedHeader}/>
                            </div>
                        </div>
                    </div>
                </div> 
    

                {/* <!-- Modification de l'entête--> */}
                <div class="modal fade" id="editheaderAmdin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modifier l'entête du site</h5>
                        </div>
                        <div class="modal-body">
                        {this.state.header.length > 0 && <div className="form-group">

                                <label>Saisir une description</label>
                                <textarea type="text" value={this.state.descriptionHeader} className="form-control form-control-sm" id="addDescription-header-admin" onChange={this.handleChangeInput}/>
                               
                                <label htmlFor="alt-image-header-admin" className="col-form-label col-form-label-sm">description de l'image</label>
                                <div className=""> 
                                    <input type="text" value={this.state.altImage} className="form-control form-control-sm" id="alt-image-header-admin" onChange={this.handleChangeInput}/>
                                </div>

                                <div class="custom-file">
                                    <input type="file" className="custom-file-input" onChange={this.handlerUploadFile}/>
                                    <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01">Upload une image</label>
                                </div>
                            </div>}
                        </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" id="titre-header-admin-annuler" data-dismiss="modal" onClick={this.closeModal}>Annuler</button>
                                <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={this.editheader}>Appliquer</button>
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

export default HeaderAdmin;