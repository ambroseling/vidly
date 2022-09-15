import Joi from 'joi-browser';
import React, { Component } from 'react';
import { getGenres } from '../services/genreService';
import { saveMovie } from '../services/movieService';
import Form from './common/form';
import { getMovie } from '../services/movieService';

class NewMovieForm extends Form {
    state = {
        data: { title: "", genreId: "" ,numberInStock:'',dailyRentalRate:''},
        genres:[],
        errors:{
        }
      };
      schema = {
        _id:Joi.string(),
        title: Joi.string(),
        genreId: Joi.string().required().label('Genre'),
        numberInStock: Joi.number().required().min(0).max(1000).label('Number In Stock'),
        dailyRentalRate:Joi.number().required().min(0).max(10).label('Daily Rental Rate')
    
      }
      async doSubmit(){
        //call the server
        await saveMovie(this.state.data);
        this.props.history.push('/movies');
        console.log('Submitted');
      }
      async populateGenres(){
        const {data:genres} = await getGenres();
        this.setState({genres:genres});
      }
      async populateMovie(){
        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;//exit this function if its a new movie
        try{
            const {data:movie} = await getMovie(movieId);
            this.setState({data:this.mapToViewModel(movie)});

        }
        catch(ex){
            if(ex.response && ex.response===404)
             this.props.history.replace('/not-found');

        }
      }
      async componentDidMount(){
        await this.populateGenres();
        await this.populateMovie();
      }
      mapToViewModel(movie){
        return{
            _id:movie._id,
            title:movie.title,
            genreId:movie.genre._id,
            numberInStock:movie.numberInStock,
            dailyRentalRate:movie.dailyRentalRate
        }
      }
    render() { 
        return (
            <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
              {/*<div className="form-group"><label htmlFor="username">Username</label><input name = "username" onChange = {this.handleChange} value = {this.state.data.username} autoFocus ref = {this.username} id = "username" type="text" className="form-control" /></div>*/}
              {/*<div className="form-group"><label htmlFor="password">Password</label><input name = "password" onChange = {this.handleChange} value = {this.state.data.password} id="password" type="text" className="form-control" /></div>*/}
              {this.renderInput('title','Title')}
              {this.renderSelect('genreId','Genre',this.state.genres)}
              {this.renderInput('numberInStock','Number in stock','number')}
              {this.renderInput('dailyRentalRate','Rate')}

              {this.renderButton("Save")}
            </form>
          </div>   
        );
    }
}
 
export default NewMovieForm;