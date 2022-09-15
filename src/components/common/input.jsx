import React, { Component } from "react";
//sfc are usually controlled component, doesnt have its own state
const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        id={props.name}
        type={props.type}
        className="form-control"
      />
      {props.error && <div className="alert alert-danger">{props.error}</div>}
    </div>
  );
};

export default Input;
