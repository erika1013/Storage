import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getImageDetailList() {
    return this.firebase.list('files').valueChanges();
  }

  insertImageDetails(imageDetails) {
    try {
      return this.firebase.database.ref('files/' + imageDetails.id).set(imageDetails)
      console.log("entra guardar")
      // this.imageDetailList.push(imageDetails);
    } catch (error) {
      console.log(error)
    }
  }

  deletedelement(id) {
    return this.firebase.database.ref('files/' + id).remove();
  }


  
  getElelement(id) {
    console.log(id)
    return this.firebase.object('files/' + id).valueChanges()
  }
  

  updateElement(element) {
    return this.firebase.object('files/' + element.id).update(element);
  }
  
}

