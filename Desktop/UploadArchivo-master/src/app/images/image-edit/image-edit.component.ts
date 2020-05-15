import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/images/service/image.service';
import { AuthService } from '../../auth/services/auth.service'
import { AngularFireDatabase } from '@angular/fire/database';
import { ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.sass'],
  providers: [AuthService],
})
export class ImageEditComponent implements OnInit {


  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  isLogin = false;
  user = ''
  id= ''
element : any;

  formTemplate = new FormGroup({
    caption: new FormControl(''),
    category: new FormControl(''),
    imageUrl: new FormControl(''),
    user: new FormControl(''),
    id: new FormControl('')
  })

  constructor(  private rutaActiva : ActivatedRoute, private storage: AngularFireStorage,private db: AngularFireDatabase, public authSvc: AuthService, private service: ImageService) {


   }

  ngOnInit() {

    this.rutaActiva.params.subscribe(
        
      (params: Params) => {
        console.log("entra2+"+params.cliente)
        this.id = this.rutaActiva.snapshot.params.id;
      }
    );

    this.authSvc.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        console.log("logeado" + auth.email)
      
        this.user = auth.email;
      } else {
        this.isLogin = false;
      }
    })
    this.getOne(this.id)

   
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/drive.png';
      this.selectedImage = null;
    }
  }


  getOne(id){
this.service.getElelement(id).subscribe(response =>{
this.element = response
this.imgSrc = this.element.imageUrl;
this.formTemplate.setValue({
  caption: this.element.caption,
    imageUrl: this.element.imageUrl,
    category: this.element.category,
    user: this.element.user,
    id : this.element.id
})
 
})
  }

  onSubmit()
  {
console.log(this.formTemplate.value)
   const formValue = this.formTemplate.value
   this.isSubmitted = true;
   if (this.formTemplate.valid) {


     var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
     const fileRef = this.storage.ref(filePath);
     this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
       finalize(() => {
         fileRef.getDownloadURL().subscribe((url) => {
           formValue['imageUrl'] = url;
           formValue['id'] = this.id;
           formValue.user = this.user;
         
           this.service.updateElement(formValue);
           this.resetForm();
           console.log("Actualizado")
         })
       })
     ).subscribe();
   }
 }

 resetForm() {
  this.formTemplate.reset();
  this.formTemplate.setValue({
    caption: '',
    imageUrl: '',
    category: 'Documento',
    user: '',
    id : ''
  });
  this.imgSrc = 'assets/drive.png';
  this.selectedImage = null;
  this.isSubmitted = false;

}

public deleted(id){
  this.db.object('files/'+id).remove();
  
}

public update (id, datos){
  this.db.object('files/'+id).update(datos);
}


get formControls() {
  return this.formTemplate['controls'];
}


}
