import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/images/service/image.service';
import { AuthService } from '../../auth/services/auth.service'
import { Routes, RouterModule,ActivatedRoute} from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.sass'],
  providers: [AuthService],
})

export class ImageListComponent implements OnInit {
  imageList: any;
  list = []

  public user$: Observable<any> = this.authSvc.afAuth.user;
  isLogin = false;
  user = '';
  rol = null;
  constructor(  private service: ImageService, public authSvc: AuthService) {


   }



  ngOnInit() {


    this.authSvc.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.user = auth.email;
        this.getRolUser(this.user)
        
      } else {
        this.isLogin = false;
      }
    })

    this.getListImages()

    /** 
      this.service.imageDetailList.snapshotChanges().subscribe(
          list => {
            this.imageList = list.map(item => { return item.payload.val(); });
            this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
          }
        );
        */
  }


  getListImages() {
    this.service.getImageDetailList().subscribe(response => {
      this.imageList =   response;
      this.list =  Array.from( this.imageList);
console.log(this.imageList, this.list)
    })
  }
  getRolUser(user) {
    try {
      this.authSvc.getUsers().subscribe(response => {
        const users = response;


        for (let index = 0; index < users.length; index++) {
          const element = users[index];

          if (element['email'] == user) {

            this.rol = element['rol'];

          }
        }
      })


    } catch (error) {
      console.log(error)
    }

  }
  deleteElement(id) {
    console.log(id)
    this.service.deletedelement(id)
  }

}