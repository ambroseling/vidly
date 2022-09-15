import React, { Component } from "react";
import Input from "./common/input";
import Joi from 'joi-browser';
import Form from './common/form';
import { getCurrentUser, login } from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
  //username = React.createRef();

  state = {
    data: { username: "", password: "" },
    errors:{
    }
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),

  }
  doSubmit = async () =>{
    //call the server
    try {
      await login(this.state.data.username,this.state.data.password)
      //localStorage.setItem('token',jwt);//stores the jwt web token in local storage, local storage is available for per domain
      console.log('Submitted');
      //this.props.history.push('/');
      const {state} = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (ex) {
      if(ex.response && ex.response.status === 400){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({errors:errors});
      }
      
    }

  }
  render() {
    //we need to prevent user from accessing /login endpoint when they are already logged in
    if (getCurrentUser()) return <Redirect to='/'/>
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {/*<div className="form-group"><label htmlFor="username">Username</label><input name = "username" onChange = {this.handleChange} value = {this.state.data.username} autoFocus ref = {this.username} id = "username" type="text" className="form-control" /></div>*/}
          {/*<div className="form-group"><label htmlFor="password">Password</label><input name = "password" onChange = {this.handleChange} value = {this.state.data.password} id="password" type="text" className="form-control" /></div>*/}
          {this.renderInput('username','Username')}
          {this.renderInput('password','Password','password')}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
