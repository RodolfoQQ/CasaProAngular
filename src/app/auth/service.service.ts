import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }


  login(usuario:string, password:string){
    sessionStorage.setItem("isLogged","true");
    sessionStorage.setItem("activo",usuario)

  }
  logOut(){
    sessionStorage.clear()
  }

  isLogged():boolean{
    return !!sessionStorage.getItem("isLogged")

  }
}
