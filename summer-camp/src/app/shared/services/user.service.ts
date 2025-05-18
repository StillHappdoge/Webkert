import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Newuser } from '../models/newuser';
import { Signups } from '../models/signups';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{
    user: Newuser | null,
    signups: Signups[]
  }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({
            user: null,
            signups:[]
          });
        }

        return from(this.getById(authUser.uid));
      })
    );
  }

  private async getById(userId: string): Promise<{
    user: Newuser | null,
    signups: Signups[]
  }> {
    try {
      const userDocRef = doc(this.firestore, 'Users', userId);
      const userSnapshot = await getDoc(userDocRef);
      
      if (!userSnapshot.exists()) {
        return {
          user: null,
          signups: []
        };
      }

      const userData = userSnapshot.data() as Newuser;
      const user = { ...userData, id: userId };
      
      if (!user.signups || user.signups.length === 0) {
        return {
          user,
          signups: []
        };
      }
      const signUpCollection=collection(this.firestore, 'signups');
      const q=query(signUpCollection, where('id','in',user.signups));
      const signUpsSnapshot=await getDocs(q);
      const signups: Signups[]=[]
      signUpsSnapshot.forEach(doc=>{
        signups.push({...doc.data(), id:doc.id}as Signups)
      })
        console.log(signups)
      return {
        user,
        signups: signups
      };
    } catch (error) {
      console.error('Hiba a felhasználói adatok betöltése során:', error);
      return {
        user: null,
        signups: [],
      };
    }
  }
}