import { Injectable } from '@angular/core';

import {  AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuarioList: AngularFireList<any>;
  selectedUsuario: Usuario = new Usuario();

  constructor(private firebase:AngularFireDatabase) { }

  getUsuario()
  {
     return this.usuarioList=this.firebase.list('usuarios');
  }

  insertUsuario(usuario: Usuario){
    this.usuarioList.push({
      name: usuario.name,
      comment: usuario.coment , 
      urls: usuario.url    ,
    });
  }

  updateUsuario(usuario: Usuario)
  {
    this.usuarioList.update(usuario.$key, {
      name: usuario.name,
      comment: usuario.coment  ,
      urls: usuario.url  

    });
  }

  delateUsuario($key :string){
    this.usuarioList.remove($key)
  }
  

  
}
