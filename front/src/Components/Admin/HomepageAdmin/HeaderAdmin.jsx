import React, { Component } from 'react';



class HeaderAdmin extends Component{
    
    render(){
        return(
            <div>
                <div>
                    <h1>Header</h1>
                </div>
                <div>
                    <form>
                        <div class="form-group row">
                            <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Titre</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control form-control-sm" id="colFormLabelSm" placeholder="saisir votre titre"/>
                            </div>
                        </div>
                        <div class="custom-file" style={{width:'50%'}}>
                            <input type="file" class="custom-file-input" id="customFile"/>
                            <label class="custom-file-label" for="customFile">Choisir votre image</label>
                        </div>
                    </form>
                </div>


            </div>
        )
    }
}

export default HeaderAdmin;