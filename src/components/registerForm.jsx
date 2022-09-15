import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import {register} from '../services/userService';
class RegisterForm extends Form {
    
  state = {
    data: { username: "", password: "" ,name:''},
    errors:{
    }
  };
  schema = {
    username: Joi.string().required().label('Username').email(),
    password: Joi.string().required().label('Password').min(5),
    name: Joi.string().required().label('Name')

  }
  doSubmit = async () =>{
    //call the server
    try{

        const response = await register(this.state.data);
        console.log('Submitted');
        localStorage.setItem('token',response.headers['x-auth-token'])//send a key value pair in
        //this.props.history.push('/movies');
        //web token is only set once during the life cycle of the app, in order to refresh the web token after log out/log in or registering, need to reload full page
        window.location = "/";
    }
    catch(ex){
        if(ex.response && ex.response.status === 400){
            //modify the errors object
            const errors = {...this.state.errors};
            errors.username = 'A user has already registered with this username';
            this.setState({errors})
        }
    }
        
  }
    render() { 
        return (
            <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {/*<div className="form-group"><label htmlFor="username">Username</label><input name = "username" onChange = {this.handleChange} value = {this.state.data.username} autoFocus ref = {this.username} id = "username" type="text" className="form-control" /></div>*/}
              {/*<div className="form-group"><label htmlFor="password">Password</label><input name = "password" onChange = {this.handleChange} value = {this.state.data.password} id="password" type="text" className="form-control" /></div>*/}
              {this.renderInput('username','Username')}
              {this.renderInput('password','Password','password')}
              {this.renderInput('name','Name')}
              {this.renderButton("Register")}
            </form>
          </div>
        );
    }
}
 
export default RegisterForm;