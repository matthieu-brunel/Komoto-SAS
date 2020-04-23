import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
const login_adress = process.env.REACT_APP_SERVER_ADDRESS_FULL;



class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            isLoggued:false
        }
    }

    handleChange = (event) => {
        switch (event.target.type) {
            case "email":
                let email = event.target.value;
                this.setState({
                    email:email
                })
                break;

            case "password":
                let password = event.target.value;
                this.setState({
                    password:password
                })
                break;
        
            default:
                break;
        }
    }

    handleSubmit = (event) => {
     
        const { email, password } = this.state;
        event.preventDefault();
         if(this.state.email === "" || this.state.password === ""){
            console.log("champs vide");
        }else{
            //console.log('http://localhost:5000/api/login');
            fetch('http://localhost:5000/api/login',{
                method:'POST',
                headers: new Headers({'Accept': 'application/json','Content-type':'application/json'}),
                body: JSON.stringify({ user:email, password:password }),
                mode:'cors'
            })
            .then((response) => {
                if(!response.ok){
                    alert("mot de passe ou email invalide");
                }else{
                    return response.json();
                }
                
            })
            .then((token) => {
                if(token !== undefined){
                
                    localStorage.setItem('token',token.token);
                    this.setState({isLoggued:true});
                   
                }else{
                    console.log("pas ok");
                }
            })
        
        } 
    }

    render(){

    
        return(
            <div>

                {localStorage.getItem('token') ?  <Redirect to="/user" /> : <Redirect to="/Login" />}
                <h1>LOGIN ADMIN</h1>
                <form className="container">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp" placeholder="Enter email"/>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={this.state.password} onChange={this.handleChange} placeholder="Password"/>
                    </div>
                    <button type="button"  className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </form>

            </div>
        )
    }
}

export default Login;