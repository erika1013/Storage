import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from 'src/app/images/service/image.service';
import { AuthService } from '../../auth/services/auth.service'
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass'],
  providers: [AuthService],
})
export class ImageComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  isLogin = false;
  user = ''
  id: ''

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    imageUrl: new FormControl('', Validators.required),
    user: new FormControl(''),
    id: new FormControl('')
  })



  constructor(private storage: AngularFireStorage,private db: AngularFireDatabase, public authSvc: AuthService, private service: ImageService) { }

  ngOnInit() {
    this.authSvc.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        console.log("logeado" + auth.email)
      
        this.user = auth.email;
      } else {
        this.isLogin = false;
      }
    })

    this.resetForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = 'assets/img/12313.png';
      this.selectedImage = null;
    }
  }


  onSubmit()
   {

    const formValue = this.formTemplate.value
    this.isSubmitted = true;
    if (this.formTemplate.valid) {


      var filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            
            formValue['id'] = this.db.createPushId();
            formValue.user = this.user;
            console.log(formValue)
            this.service.insertImageDetails(formValue);
            this.resetForm();
          })
        })
      ).subscribe();
    }
  }


  get formControls() {
    return this.formTemplate['controls'];
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
    this.imgSrc = 'assets/img/12313.png';
    this.selectedImage = null;
    this.isSubmitted = false;

  }



  public update (id, datos){
    this.db.object('files/'+id).update(datos);
  }

}


