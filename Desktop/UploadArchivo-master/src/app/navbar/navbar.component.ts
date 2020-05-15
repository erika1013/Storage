import { Observable } from 'rxjs';
import { AuthService } from "../auth/services/auth.service";
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [AuthService],
})
export class NavbarComponent {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public isLogin: Boolean;

  constructor(public authSvc: AuthService, private router: Router, public angularfireauth: AngularFireAuth) {

  }
  ngOnInit() {
    this.authSvc.getAuth().subscribe(auth =>{
      if(auth){
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    })
  }



  async onLogout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
