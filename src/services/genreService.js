
import httpService from "../httpService";

export function getGenres() {
    //return genres.filter(g => g);
    //call server
    return httpService.get('http://localhost:3900/api/genres')

  }
  