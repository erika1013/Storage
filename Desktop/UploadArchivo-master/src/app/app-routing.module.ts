import { NgModule } from '@angular/core';
import { Routes, RouterModule,} from '@angular/router';
import { SendEmailComponent } from "./auth/send-email/send-email.component";

import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';
import { ImagesComponent } from './images/images.component';
import { ImageEditComponent } from './images/image-edit/image-edit.component';
import { DetailComponent } from "./images/detail/detail.component";
import { QrcodeReaderComponent } from "./qrcode-reader/qrcode-reader.component";
import { BarcodeReaderComponent } from "./barcode-reader/barcode-reader.component";



const routes: Routes = [
  { path: '', 
  redirectTo: '/home', 
  pathMatch: 'full' },
  {
    path: 'image', component: ImagesComponent, children: [
      { path: 'upload', component: ImageComponent },
      { path: 'list', component: ImageListComponent },
      { path: 'edit/:id', component: ImageEditComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'qrcode-reader', component: QrcodeReaderComponent },
      { path: 'barcode-reader', component: BarcodeReaderComponent }

    ]
  },

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'verification-email',
    component: SendEmailComponent,
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }