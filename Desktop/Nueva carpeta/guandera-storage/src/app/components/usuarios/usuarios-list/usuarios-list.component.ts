import { Component, OnInit } from '@angular/core';

import { Usuario } from '../../../models/usuario';

// service
import { UsuarioService } from '../../../service/usuario.service';


@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  usuarioList: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
   // private toastr: ToastrService
  ) { }

  ngOnInit() {
    return this.usuarioService.getUsuario()
      .snapshotChanges().subscribe(item => {
        this.usuarioList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.usuarioList.push(x as Usuario);
        });
      });
  }

  onEdit(usuario: Usuario) {
    this.usuarioService.selectedUsuario = Object.assign({}, usuario);
  }

  onDelete($key: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.usuarioService.delateUsuario($key);
      //this.toastr.warning('Deleted Successfully', 'Product Removed');
    }
  }

}


