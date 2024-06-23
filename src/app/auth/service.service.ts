import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }


  login(usuario:string, password:string){
    sessionStorage.setItem("isLogged","true");

  }
  logOut(){
    sessionStorage.clear()
  }

  isLogged():boolean{
    return !!sessionStorage.getItem("isLogged")

  }
}
