import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { FirbaseAuthService } from './fire-base-auth.service';
import { Auth, updateProfile } from '@angular/fire/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { ProfileUser } from '../../models/user-profile';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.firebaseAuth.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }
  constructor(
    private firestore: Firestore,
    private firebaseAuth: FirbaseAuthService,
    private auth: Auth
  ) {}
  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
  updateProfileData(profileData: Partial<any>): Observable<any> {
    const user = this.auth.currentUser;
    return of(user).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Not Authenticated');

        return updateProfile(user, profileData);
      })
    );
  }

  updateUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(updateDoc(ref, { ...user }));
  }
}
