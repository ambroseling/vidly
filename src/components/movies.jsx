import React, { Component } from 'react';
import {getMovies,deleteMovie} from '../services/movieService'
import {toast} from 'react-toastify';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import { paginate } from './paginate';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import { NavLink ,Link} from 'react-router-dom';
import SearchBox from './searchBox';
class Movie extends Component {
    state = {movies: [] ,pageSize: 4,currentPage:1 ,genres:[],sortColumn:{path:'title',order:'asc'},searchQuery:"",selectedGenre:null};
    async componentDidMount(){
        const {data} = await getGenres();//the axios response object has a data property, so you can do object destructuring to get data
        const genres = [{_id:'',name: 'All Genres'},...data];
        const {data:retrieved_movies} = await getMovies();
        this.setState({movies:retrieved_movies,genres:genres})
    }
    handleDelete = async movie => {
        console.log(movie);
        const originalMovies = this.state.movies;

        const movies = this.state.movies.filter(m => m._id !==movie._id)
        this.setState({movies: movies});
        try{
        await deleteMovie(movie._id);
        }
        catch(ex){
        if(ex.response && ex.response.status === 404){
            toast.error('This movie has already been deleted');
            this.setState({moive:originalMovies});
        }
        }

    }
    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies:movies});
    }
    handlePageChange = (page) => {
    this.setState({currentPage:page})
    }
    handleGenreSelect = (genre) => {
        //const movies = [...this.state.movies].filter(m => m.genre == genre);
         //this.setState({movies: movies});
        this.setState({selectedGenre: genre,searchQuery:"" , currentPage:1});
    }
    handleSort = sortColumn => {

        this.setState({sortColumn: sortColumn});
    }
    getPagedData = () => {
        const {pageSize ,currentPage, movies:allMovies,genres,selectedGenre,sortColumn,searchQuery} = this.state;
        let filtered = allMovies;
        if(searchQuery)
            filtered = allMovies.filter(m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
        else if (selectedGenre && selectedGenre._id)
            filtered = allMovies.filter(m=>m.genre._id === selectedGenre._id);
       
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
        const movies = paginate(sorted,currentPage,pageSize);
        return {totalCount:filtered.length,data:movies};
    }
    handleSearch = query =>{
        this.setState({searchQuery:query,selectedGenre:'',currentPage:1});
    }
    render() { 
        const {legnth: count} = this.state.movies;
        const {pageSize ,currentPage,sortColumn,searchQuery,handleSearch} = this.state;
        const {user} = this.props
        //const {length: count} = this.state.movies
        if(count === 0){
            return <h2>There are no more movies left in the database.</h2>;
        }
        const {totalCount,data} = this.getPagedData();
        return (
            <div className = 'row'>
            <div className = 'col-3'>
                <ListGroup items = {this.state.genres} onItemSelect={this.handleGenreSelect} selectedItem={this.state.selectedGenre}/>
            </div>
            <div className = "col">
            {user && <Link className="btn btn-primary" to="/movies/new" style={{marginBottom:20}}>New Movie</Link>}
            <p>Showing {totalCount} movies in the database...</p>
            <SearchBox value = {searchQuery} onChange={this.handleSearch}/>
            <MoviesTable movies = {data} sortColumn = {sortColumn} onSort = {this.handleSort} onLike = {this.handleLike} onDelete={this.handleDelete}/>
            <Pagination itemsCount={totalCount} pageSize = {this.state.pageSize} onPageChange={this.handlePageChange} currentPage={currentPage}/>
            </div>
            </div>
        )
        ;
    }
}
 
export default Movie;