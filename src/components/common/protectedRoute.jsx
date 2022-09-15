import React, { Component } from 'react';
import { getCurrentUser } from '../../services/authService';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const ProtectedRoute = ({path,component:Component,render,...rest}) => {
    return (
        <Route {...rest}
     render={props => {
      if(!getCurrentUser()) return <Redirect to={{pathname:'/login', state:{from:props.location}}}/>;
      return Component ? <Component {...props}/> : render(props)
      //this logic checks if a user is logged in, then user will be allowed to edit a form
    }}/>
    );
}
 
export default ProtectedRoute;