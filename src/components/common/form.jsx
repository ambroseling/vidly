import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';
import { Link } from 'react-router-dom';

class Form extends Component {
    state = {
        data:{},
        errors:{}
      };
      validate =()=> {
        // const errors = {};
        // if (this.state.data.username.trim() === ""){
        //  errors.username = 'Username is required';   
        // }
        // if (this.state.data.password.trim() === ""){
        //     errors.password = 'Password is required';   
        //    }
        // return Object.keys(errors).length === 0? null : errors;
       // console.log(this.state.data);
        const {error} = Joi.validate(this.state.data,this.schema,{abortEarly:false})
        if (!error) return null;
        const errors = {};
        for(let item of error.details) errors[item.path[0]] = item.message;
        return errors;
      }

      validateProperty = (input) => {
        // if(input.name === 'username'){
        //     if(input.value.trim() === '') return 'Username is required.';
        //     //...
        // }      
        // if(input.name === 'password'){
        //     if(input.value.trim() === '') return 'Password is required.';
        //     //...
        // }  
        const obj = {[input.name]:input.value};
        console.log(input)
        const schema = {[input.name]:this.schema[input.name]};
        const {error} = Joi.validate(obj,schema);//youre picking the {error} property of the returned Joi object
        return error ? error.details[0].message : null;
      }
      handleSubmit = (e) => {
        e.preventDefault();
        //call the server
        // const username = this.username.current.value();
        //const password = React.createRef();
        const errors = this.validate();
        this.setState({errors :errors || {}})
        if(errors) return;
        console.log("Submitted");
        this.doSubmit();
      };

  handleChange = (e) => {

    const errors = {...this.state.errors};
    console.log(e.currentTarget)
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage; //set the username or password error object to be that error message
    else delete errors[e.currentTarget.name];//if there isnt an error, delete that field in the object

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({errors})
    this.setState({ data });
  };
  renderButton(label){
   // console.log(this);
    return <button disable={this.validate()} className="btn btn-primary">{label}</button>

  }
  renderInput = (name,label,type='text') =>{
  return (
    <Input
    key={name}
    type={type}
    name={name}
    value={this.state.data[name]}
    label= {label}
    onChange={this.handleChange}
    error = {this.state.errors[name]}
  />
  )  
  }
  renderSelect(name,label,options){
   return (
    <Select
      key={name}
      name = {name}
      value = {this.state.data[name]}
      label = {label}
      options = {options}
      onChange = {this.handleChange}
      error = {this.state.errors[name]}
    />
   )
  }
}
 
export default Form;