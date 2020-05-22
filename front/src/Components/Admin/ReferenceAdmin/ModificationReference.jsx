import React, { Component } from 'react';
import putRessources from "./../../../utils/putRessources.js";
import "./ModificationReference.css";
import $ from "jquery";
const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class ModificationReference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceAdmin: [],
      titrePage: "",
      nameReference: "",
      descriptionReference: [],
      imagesReference:[],

      currentModificationTitle: "",
      currentModificationDescription: "",
      currentModificationIndex: null,
      currentModificationClick: false,
      currentModificationSectionTitle: "",
      currentModificationSectionDescription: [],
      currentModificationSectionDescriptionList: "",
      referenceAdminSave: [],

      altImageLogoRef:"",
      altImageLogoSolution:"",
      altImage:"",
      nameImage:"",
      arrayImage:[],

      objetImageCaroussel:[],
      objetImageLogoRef:[],
      objetImageLogoSolution:[],

      document:[],
      documentLogoRef:[],
      documentLogoSolution:[]
    }
  }

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

            arrayImageCaroussel.splice(index, 1);
            console.log(arrayImageCaroussel);
            
            this.setState({objetImageCaroussel:arrayImageCaroussel});
           break;
    
        default:
            break;
    }


  }


  handleChangeInput = (event) => {

    switch (event.target.id) {
      case "titre-section":
        this.setState({ titrePage: event.target.value });
        break;

      case "name-reference-admin":
        this.setState({ nameReference: event.target.value });
        break;

      case "title-description-modification-reference-admin":
        this.setState({ currentModificationSectionTitle: event.target.value });
        break;

      case "description-text-modification-reference-admin":
        this.setState({ currentModificationDescription: event.target.value });
        break;

      case "list-description-text-modification-reference-admin":
        this.setState({ currentModificationSectionDescriptionList: event.target.value });
        break;

      case "alt-imageLogoRef-reference-admin":
        this.setState({altImageLogoRef:event.target.value});
        break;


    case "alt-imageLogoSolution-reference-admin":
        this.setState({altImageLogoSolution:event.target.value});
        break;

    case "alt-image-reference-admin":
      this.setState({altImage:event.target.value});
      break;

      default:
        break;
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
        
        this.setState({ objetImageLogoRef:arrayObjetImage, altImageLogoRef:"", documentLogoRef:[] });
        $("#uploadAddImageLogoReference")[0].value = "";

    }else if(this.state.documentLogoSolution.length > 0){

        // constitution de l'objet logo reference pour affichage
        let arrayObjetImage = [];
        let objetImageDisplay = {};
        objetImageDisplay.name = this.state.documentLogoSolution[0].name;
        objetImageDisplay.alt = this.state.altImageLogoSolution;
        arrayObjetImage.push(objetImageDisplay);
    
        this.setState({ objetImageLogoSolution:arrayObjetImage , altImageLogoSolution:"", documentLogoSolution:[] });
        $("#uploadAddImageLogoSolution")[0].value = "";
    }

}

  handlerClickDescriptionSection = (index, event) => {
    this.setState({
      currentModification: event.target.id,
      currentModificationIndex: index,
      currentModificationSectionTitle: this.state.descriptionReference[index].title,
      currentModificationSectionDescription: this.state.descriptionReference[index].description
    });
  }


  componentDidMount() {
    let description = JSON.parse(this.props.referenceAdmin[this.props.idToEdit].description);
    let images = JSON.parse(this.props.referenceAdmin[this.props.idToEdit].url);

    let arraySolution = [];
    let imageSolution = {};
    imageSolution.name = images.logoSolution[0].name;
    imageSolution.alt = images.logoSolution[0].alt;
    arraySolution.push(imageSolution);

    let arrayRef = [];
    let imageRef = {};
    imageRef.name = images.logoRef[0].name;
    imageRef.alt = images.logoRef[0].alt;
    arrayRef.push(imageRef);

    this.setState({
      titrePage: this.props.referenceAdmin[this.props.idToEdit].title,
      nameReference: this.props.referenceAdmin[this.props.idToEdit].subtitle,
      descriptionReference: description,
      objetImageLogoRef:arrayRef,
      objetImageLogoSolution:arraySolution,
      objetImageCaroussel:images.imageCaroussel,


      imagesReference:images

    });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.referenceAdmin !== this.props.referenceAdmin) {
      this.setState({
        referenceAdmin: this.props.referenceAdmin
      });

    } else if (prevProps.idToEdit !== this.props.idToEdit) {
      let description = JSON.parse(this.props.referenceAdmin[this.props.idToEdit].description);
      this.setState({
        titrePage: this.props.referenceAdmin[this.props.idToEdit].title,
        nameReference: this.props.referenceAdmin[this.props.idToEdit].subtitle,
      });
    }
  }

  handleClickAddDescription = () => {

    this.setState({
      currentModificationSectionDescription: [...this.state.currentModificationSectionDescription, this.state.currentModificationSectionDescriptionList],
      currentModificationSectionDescriptionList: "",
    });
  }

  handleClickDeleteDescription = (index, event) => {
    let description = this.state.currentModificationSectionDescription;
    description.splice(index, 1);

    this.setState({ currentModificationSectionDescription: description });
  }

  closeModalModificationCancel = () => {

    const { referenceAdmin, idToEdit } = this.props;

    // concerne le tableau des descriptions - section 2
    let arrayDescription = [];

    let arrayReferenceSelected = referenceAdmin[idToEdit];
    let arrayDescriptionParsed = JSON.parse(arrayReferenceSelected.description);

    for (let i of arrayDescriptionParsed) {
      arrayDescription.push(i);
    }
    //********************************************

    //concerne les titres - section 1
    let titrePageAdmin = arrayReferenceSelected.title;
    let nameReferenceAdmin = arrayReferenceSelected.subtitle;


    this.setState({
      descriptionReference: arrayDescription,
      titrePage: titrePageAdmin,
      nameReference: nameReferenceAdmin
    })

  }

  handleClickValidation = async () => {
    const { descriptionReference, currentModificationIndex, currentModificationSectionDescription, currentModificationSectionTitle } = this.state;
    let array = [];
    let objet = {};
    objet.title = currentModificationSectionTitle;
    objet.description = currentModificationSectionDescription;

    for (let i = 0; i < descriptionReference.length; i++) {
      if (i === currentModificationIndex) {
        array.push(objet);
      } else {
        array.push(descriptionReference[i])
      }
    }

    this.setState({
      descriptionReference: array
    });

    let image_id = this.props.refToEdit[1];

    let dataReference = {
      'title': this.state.titrePage,
      "subtitle": this.state.nameReference,
      'description': this.state.currentModificationSectionDescription.length > 0 ? JSON.stringify(array) : JSON.stringify(this.state.descriptionReference),
      'language': this.props.idLang,
      'image_id': image_id,
      "section": "reference"
    }

    console.log(dataReference)

    let id = this.props.refToEdit[0];
    console.log("id reference : ",id);

    await putRessources("reference", id, dataReference);
    this.props.getStartedreferenceAdmin();
  }

  handleClickValidationImage = async () => {
    const { objetImageLogoRef, objetImageLogoSolution, objetImageCaroussel } = this.state;


    let objet = {};
    objet.logoRef = objetImageLogoRef;
    objet.logoSolution = objetImageLogoSolution;
    objet.imageCaroussel = objetImageCaroussel;

   let id = this.props.refToEdit[1];

    let dataImage = {
      'name': this.state.nameReference,
      "url": JSON.stringify(objet),
      'alt': "",
      'homepage_id': 0,
      "section": "reference"
    }

    console.log(dataImage)

    await putRessources("image", id, dataImage);
    this.props.getStartedreferenceAdmin();
  }


  render() {
    const { referenceAdmin, descriptionReference } = this.props;
    const { imagesReference } = this.state;
/* 
    if(imagesReference !== null){
      for(let i of imagesReference){
        console.log(i);
      }
    } */

    return (
      <div>
        <div id="accordion" className="position-tab pt-3">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Section 1
                        </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <div class="form-group">
                  <label for="titre-section">Titre de la page</label>
                  <input class="form-control form-control-sm" value={this.state.titrePage} id="titre-section" type="text" placeholder="titre de la section" onChange={this.handleChangeInput} />
                </div>
                <div className="form-group">
                  <label>Saisir le titre de la reference</label>
                  <input type="text" className="form-control form-control-sm" value={this.state.nameReference} id="name-reference-admin" onChange={this.handleChangeInput} />
                </div>

                <button type="button" class="btn btn-secondary" onClick={this.closeModalModificationCancel}>Annuler</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button>

              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Section 2
                        </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">

                <div className="description-reference-admin-modal">
                  {this.state.descriptionReference.length > 0 && this.state.descriptionReference.map((description, index) => (
                    <div className="-div-title-description-reference-modification">
                      <p className="title-description-reference-modification">{description.title}</p>
                      <ul>
                        {description.description.map((list, index) => (
                          <div>
                            <li key={index}>{list}</li>
                          </div>
                        ))}
                      </ul>
                      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#currentReference" onClick={this.handlerClickDescriptionSection.bind(this, index)}>modifier</button>
                    </div>
                  ))}

                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Section 3
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">
                <div class="form-group mt-5">
                  <div className="row" style={{ marginLeft: "0" }}>
                    {/*  upload logo de la référence */}
                    <div class="custom-file col-5">
                      <input type="file" className="custom-file-input" id="uploadAddImageLogoReference" onChange={this.handlerUploadFile} />
                      <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >logo de la référence<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className="div-description-image-reference-admin col-5">
                      <input class="form-control form-control-sm" value={this.state.altImageLogoRef} id="alt-imageLogoRef-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput} />
                    </div>

                    <div className="btn-ajouter-image-reference-admin col-2">
                      {
                        this.state.altImageLogoRef !== "" && this.state.documentLogoRef.length > 0
                          ?
                          <button type="button" class="btn btn-primary" style={{ marginRight: "0" }} onClick={this.addAltImage}>ajouter</button>
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
                        <th scope="col">supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.objetImageLogoRef.map((element, index) => {
                          if (index < 1) {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.name}</td>
                                <td>{element.alt}</td>
                                <td> {<button type="button" class="btn btn-danger" id="logoRef" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                              </tr>
                            )
                          }
                        })
                      }

                    </tbody>
                  </table>
                </div>

                <div class="form-group mt-5">
                  <div className="row" style={{ marginLeft: "0" }}>

                    {/*  upload logo de la solution utilisée */}
                    <div class="custom-file col-5">
                      <input type="file" className="custom-file-input" id="uploadAddImageLogoSolution" onChange={this.handlerUploadFile} />
                      <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >logo de la solution utilisée<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className="div-description-image-reference-admin col-5">
                      <input class="form-control form-control-sm" value={this.state.altImageLogoSolution} id="alt-imageLogoSolution-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput} />
                    </div>

                    <div className="btn-ajouter-image-reference-admin col-2">
                      {
                        this.state.altImageLogoSolution !== "" && this.state.documentLogoSolution.length > 0
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
                        <th scope="col">supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                        this.state.objetImageLogoSolution.map((element, index) => {
                          if (index < 1) {
                            return (
                              <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.name}</td>
                                <td>{element.alt}</td>
                                <td> {<button type="button" class="btn btn-danger" id="logoSolution" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                              </tr>
                            )
                          }
                        })
                      }

                    </tbody>
                  </table>
                </div>



                <div class="form-group mt-5">
                  <div className="row" style={{ marginLeft: "0" }}>
                    {/*  upload des images du caroussel */}
                    <div class="custom-file col-5">
                      <input type="file" className="custom-file-input" id="uploadAddImageReferenceCaroussel" onChange={this.handlerUploadFile} />
                      <label class="custom-file-label form-control form-control-sm" htmlFor="inputGroupFile01" >images du caroussel<span style={{ color: "red" }}>*</span></label>
                    </div>
                    <div className="div-description-image-reference-admin col-5">
                      <input class="form-control form-control-sm" value={this.state.altImage} id="alt-image-reference-admin" type="text" placeholder="description de l'image" onChange={this.handleChangeInput} />
                    </div>

                    <div className="btn-ajouter-image-reference-admin col-2">
                      {
                        this.state.altImage !== "" && this.state.document.length
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
                            <td> {<button type="button" class="btn btn-danger" id="imageCaroussel" onClick={this.getIdImageReferenceToDelete.bind(this, index)}>X</button>}</td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalModificationCancel}>Annuler</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidationImage}>Appliquer</button>
              </div>
            </div>
          </div>
        </div>

        {/*     Modal modification section 2 */}
        <div class="modal fade" id="currentReference" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>

              </div>
              <div class="modal-body row">
                <div className="form-group col-12">
                  <input type="text" className="form-control" value={this.state.currentModificationSectionTitle} id="title-description-modification-reference-admin" onChange={this.handleChangeInput} />
                </div>

                <div className="form-group col-10">
                  <input type="text" className="form-control" value={this.state.currentModificationSectionDescriptionList} id="list-description-text-modification-reference-admin" onChange={this.handleChangeInput} />
                </div>
                <div className="div-btn-ajout-description-reference-admin col-2">
                  {
                    this.state.currentModificationSectionDescriptionList !== ""
                      ?
                      <button className="btn btn-primary" onClick={this.handleClickAddDescription}>+</button>
                      :
                      <button className="btn btn-secondary">+</button>
                  }
                </div>
                <div className="div-list-description-reference-admin col-12">
                  <ul>
                    {
                      this.state.currentModificationSectionDescription.map((description, index) => (
                        <div>
                          <li key={index}>{description}</li>
                          <button className="btn btn-danger btn-sm" onClick={this.handleClickDeleteDescription.bind(this, index)}>X</button>
                        </div>

                      ))
                    }
                  </ul>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={this.closeModalModificationCancel}>Annuler</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.handleClickValidation}>Appliquer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ModificationReference;

