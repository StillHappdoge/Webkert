import { Injectable } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, User, UserCredential,signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Newuser } from '../models/newuser';
import { Firestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User|null>
  constructor(private auth:Auth,private router:Router, private firestore: Firestore) { 
    this.currentUser=authState(this.auth);
  }

  login(email:string,pwd:string):Promise<UserCredential>{
    localStorage.setItem("isLoggedIn","true") 
    return signInWithEmailAndPassword(this.auth,email,pwd)
  }
  logOut():Promise<void>{
    localStorage.setItem("isLoggedIn","false")
    return signOut(this.auth).then(()=>{
      window.location.href="/home"
    });
  }
  async signUp(email: string,password: string, userData: Partial<Newuser>): Promise<UserCredential>{
    try{
      const userCredential=await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.createUserData(userCredential.user.uid,{
        ...userData,
        id: userCredential.user.uid,
        email: email,
        signups: [],
      })
      return userCredential;
    }catch(error){
      console.error('Hiba a regisztráció során: ',error);
      throw error
    }
  }
  private async createUserData(userId: string,userData: Partial<Newuser>):Promise<void>{
    const userRef= doc(collection(this.firestore,'Users'),userId);
    return setDoc(userRef,userData);
  }
  loggedIn():string|null{
    return localStorage.getItem("isLoggedIn")
  }
  
  updateLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }
}
