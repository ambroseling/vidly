import { options } from 'joi-browser';
import React, { Component } from 'react';
const Select = (props) => {
    return ( 
        <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <select
          name={props.name}
          onChange={props.onChange}
          value={props.value}
          id={props.name}
          options={props.options}
          error = {props.error}
          label = {props.label}
          className="form-control">
            {props.options.map(option => (<option key={option._id} value={option._id}>{option.name}</option>))}
          </select>
        
        {props.error && <div className="alert alert-danger">{props.error}</div>}
      </div>
     );
}
 
export default Select;