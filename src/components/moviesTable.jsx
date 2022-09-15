import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';
import TableBody from './common/tableBody';
import TableHeader from './common/tableHeader'; 
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
const x = <Like></Like>; //React Element {}

class MoviesTable extends Component {
    state = {  } 
    deleteColumn = {key:'delete',content: movie => <button onClick = {()=>this.props.onDelete(movie)} className="btn btn-danger btn-sm">Delete</button>};   

    
    columns = [
        {path:'title',label:'Title',content: movie => <Link to={`/movie/${movie._id}`}>{movie.title}</Link>},
        {path:'genre.name',label:'Genre'},
        {path:'numberInStock',label:'Stock'},
        {path:'dailyRentalRate',label:'Rate'},
        {key:'like',content: movie => <Like onClick = {()=>this.props.onLike(movie)} liked = {movie.liked}/>},
    ]
    constructor(){
        super();
        const user = getCurrentUser();
            if(user && user.isAdmin) {
                this.columns.push(this.deleteColumn)
            }
    }
    render() { 
        const {movies,onDelete,onLike,onSort,columns,sortColumn} = this.props;
        return( 
            <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort = {onSort}/> 
         );;
    }
}
 
export default MoviesTable;

