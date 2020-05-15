import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class AuthService {
  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );


      return result;
    } catch (error) {
      console.log(error);
    }
  }
  public guardarUsuarioBD(user) {
    console.log("entra")
    const id = this.db.createPushId()
    return this.db.database.ref('usuarios/' + id).set(user);
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      const user: any = {

        "email": email,
        "rol": 2
      }
      this.guardarUsuarioBD(user)
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  getUsers()  {
    // metodo para el user  y su rol
    return this.db.list('usuarios/').valueChanges()

  }

  public getAuth() {
    return this.afAuth.authState;

  }
}
