import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from 'src/app/images/service/image.service';
import { AuthService } from '../../auth/services/auth.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl:'./detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ImageService],
})

export class DetailComponent implements OnInit {
  imageList:any;
  list = {}
  id = '';  
  video;
  category='';
  imagen;
  
  constructor(private dataApi: ImageService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    console.log(id)
    this.getfile(id);
  }

    getfile(id) {
      this.dataApi.getElelement(id).subscribe(response => {
         console.log(response)
        this.imageList = response;
        console.log(this.imageList)
        //= response;
        
    
      })
    }
  }


























  

  