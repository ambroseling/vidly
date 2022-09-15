import httpService from "../httpService";

export function register(user){
    return httpService.post('http://localhost:3900/api/users',{
        email:user.username,
        password:user.password,
        name:user.name
    });

}