import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage,AngularFireStorageReference,AngularFireUploadTask} from 'angularfire2/storage';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import {map} from 'rxjs/operators/'
//service

import { UsuarioService } from '../../../service/usuario.service';
//product class
import { Usuario } from "../../../models/usuario";


// toastr
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  constructor(public usuarioService:UsuarioService,public afStorage: AngularFireStorage) { }
  public name: string='';
  public coment: string='';
  public url: string='';


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadProgress:Observable<number>;
  downloadURL: Observable<string>;
  uploadState: Observable<string >;
  uploadPercent:Observable<Number>;
  urlfile:Observable<string>;


  upload(e){

    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(e.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadPercent=this.task.percentageChanges();
   this.task.snapshotChanges().pipe(finalize(() => this.urlfile = this.ref.getDownloadURL())).subscribe();

  }

  ngOnInit() {
    this.usuarioService.getUsuario();
   
    this.resetForm();
  }

  onSubmit(usuarioForm: NgForm)
  {
    if(usuarioForm.value.$key == null)
      this.usuarioService.insertUsuario(usuarioForm.value);
    else
    this.usuarioService.updateUsuario(usuarioForm.value);
    
    this.resetForm(usuarioForm);
    //this.toastr.success('Sucessful Operation', 'Product Registered');
  }

  resetForm(usuarioForm?: NgForm)
  {
    if(usuarioForm != null)
    usuarioForm.reset();
      this.usuarioService.selectedUsuario = new Usuario();
  }
}
