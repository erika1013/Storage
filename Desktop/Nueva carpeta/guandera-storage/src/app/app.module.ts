import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import {AngularFireModule  } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';

//componentes
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';
import { UsuarioComponent } from './components/usuarios/usuario/usuario.component';



import {FormsModule} from '@angular/forms' 
//services
import { UsuarioService } from './service/usuario.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuariosListComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireStorageModule,
   
    
    
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
