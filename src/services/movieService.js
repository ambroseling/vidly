import httpService from "../httpService";

export function getMovies(){
    return httpService.get('http://localhost:3900/api/movies')
}
export function deleteMovie(movieId){
    return httpService.delete('http://localhost:3900/api/movies'+'/'+movieId);
}
export function getMovie(movieId){
    return httpService.get('http://localhost:3900/api/movies'+'/'+movieId)
}
export function saveMovie(movie){
    if(movie._id){
        const body = {...movie};
        delete body._id;
        return httpService.put('http://localhost:3900/api/movies'+'/'+movie._id,body);
    }
    return httpService.post('http://localhost:3900/api/movies',movie)

}