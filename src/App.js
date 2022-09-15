import logo from './logo.svg';
import './App.css';
import Movies from './components/movies';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Customers from './components/customers';
import NotFound from './components/notFound';
import React, { Component } from 'react';
import Rentals from './components/rentals';
import NavBar from './components/navBar';
import { without } from 'lodash';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import NewMovieForm from './components/newMovieForm';
import jwtDecode from 'jwt-decode';
import LogOut from './components/logout';
import { getCurrentUser } from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';

class App extends Component {
  state = {};
  componentDidMount(){
      const user = getCurrentUser();
      this.setState({user});
  }
  render(){
  return (
    <React.Fragment>
    <NavBar user = {this.state.user}/>

    <main className="container">

      <Switch>
    <Route path="/logout" component={LogOut}/>
    <Route path="/login" component={LoginForm}/>
    <Route path="/register" component={RegisterForm}/>
     <ProtectedRoute path="/movie/:id" component = {NewMovieForm}/>
      {/*//this logic checks if a user is logged in, then user will be allowed to edit a form*/}
    <Route path="/movies" render={props=><Movies {...props} user={this.state.user}/>}/> 
    {/*pass props and user to movie component so that we can disable certain elements based on whether they are anonymous or not */}
    <Route path="/customers" component={Customers}/>
    <Route path="/rentals" component={Rentals}/>
    <Route path="/not-found" component={NotFound}/>
    <Redirect from="/" exact to="/movies"/>
    <Redirect to="/not-found"/>
    </Switch>
    </main>

    </React.Fragment>
  );
  }
}

export default App;
