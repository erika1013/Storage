import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarecodeScannerLivestreamModule ,} from 'ngx-barcode-scanner';
import {Quagga} from 'quagga';


//firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthService } from '../app/auth/services/auth.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { ImageComponent } from './images/image/image.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { environment } from "../environments/environment";
import { NavbarComponent } from './navbar/navbar.component';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { ImageEditComponent } from './images/image-edit/image-edit.component';
import { DetailComponent } from './images/detail/detail.component';
import { QrcodeReaderComponent } from './qrcode-reader/qrcode-reader.component';
import { BarcodeReaderComponent } from './barcode-reader/barcode-reader.component';



@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ImageComponent,
    ImageListComponent,
    NavbarComponent, 
    SendEmailComponent,
     ImageEditComponent, 
     DetailComponent, QrcodeReaderComponent, 
     BarcodeReaderComponent,
     
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    ZXingScannerModule,
    BarecodeScannerLivestreamModule
    
    ,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
