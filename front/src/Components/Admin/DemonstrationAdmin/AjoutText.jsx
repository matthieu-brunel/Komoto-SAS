import React, { Component } from 'react';


const REACT_APP_SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

class AjoutText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            labelMenuDrop: "",
            description: "",
            document: null,
            headerToDelete: null,
            isActive: true,
            idToEdit: null
        }
    }

    handleChangeInput = (event) => {
        switch (event.target.id) {

            case "title-showroom-admin-2":
                this.setState({ title: event.target.value });
                break;

            case "description-showroom-admin-2":
                this.setState({ description: event.target.value });
                break;

            case "label-labelMenuDrop-showroom-admin-2":
                this.setState({ labelMenuDrop: event.target.value });
                break;

            default:
                break;
        }
    }



    editDescription = (index, event) => {

        let showroom = this.state.showSelected;
        let description = this.state.showSelected[0].description;

        description.splice(index, 1);

        this.setState({ arrayDescription: showroom[0].description });
    }


   addNewHeader = async () => {
        const { arrayLang, locale } = this.props;

        let idLang;

        for (let i in arrayLang) {
            if (Object.values(arrayLang[i]).includes(locale)) {
                idLang = Object.values(arrayLang[i])[2];
            }
        }

        console.log("BAEBZFZEFZe :",idLang)


        let obj = {};
        obj.description = this.state.description;
        obj.labelMenuDrop = this.state.labelMenuDrop;

        let dataShowroom = {
            'title': this.state.title,
            'subtitle': "",
            'section': "demonstration_text",
            'description': JSON.stringify(obj),
            'model_url':"",
            'model_alt':"",
            'model_id': 0,
            'language': idLang
        }

        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('token')
            }),
            body: JSON.stringify(dataShowroom)
        }


        let url = REACT_APP_SERVER_ADDRESS_FULL + '/api/demonstration';

        const recordData = await (await (fetch( url, options ))).json();
        console.log("RESPONSE : ", recordData);
        this.setState({ title: "", description: "", labelMenuDrop:"" });
        this.props.getStartedText();
    }

    handleCloseModal = () => {
        this.setState({ isActive: false, isTooHeavy: false });
    };




    render() {

        return (
            <div>
                <form>
                    <div>

                        <div className="form-group ">
                            <label htmlFor="title-showroom-admin-2" className="col-form-label">titre</label>
                            <div className="">
                                <input type="text" value={this.state.title} className="form-control" id="title-showroom-admin-2" onChange={this.handleChangeInput} />
                            </div>

                            <label htmlFor="description-showroom-admin-2" className="col-form-label">texte</label>
                            <textarea type="text" value={this.state.description} className="form-control" id="description-showroom-admin-2" onChange={this.handleChangeInput} />

                            <label htmlFor="label-labelMenuDrop-showroom-admin-2" className="col-form-label">label du menu déroulant (model 3d)</label>
                            <div className="">
                                <input type="text" value={this.state.labelMenuDrop} className="form-control" id="label-labelMenuDrop-showroom-admin-2" onChange={this.handleChangeInput} />
                            </div>
                        </div>

                    </div>
                </form>
                <div className="modal-footer pt-1">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addNewHeader}>Enregistrer</button>
                </div>
            </div>
        )
    }
}


export default AjoutText;