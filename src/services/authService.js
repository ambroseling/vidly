import httpService from "../httpService";
import jwtDecode from 'jwt-decode';

httpService.setJwt(getJwt());
export async function login (email,password){
    const {data:jwt} = await httpService.post('http://localhost:3900/api/auth',{email,password});
    localStorage.setItem('token',jwt);
}
export function getCurrentUser(){
    try {
        const jwt = localStorage.getItem('token');
        const user = jwtDecode(jwt);
        return user;
        
      } catch (error) {
        return null;
      }
}
export function logout(){
    localStorage.removeItem('token');
}
export function getJwt(){
    return localStorage.getItem('token');
}