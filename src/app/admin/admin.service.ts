
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class AdminService {
    user: Observable<firebase.User>;

    constructor(private firebaseAuth: AngularFireAuth) {
        this.user = firebaseAuth.authState;
    }

    signup(email: string, password: string) {
        this.firebaseAuth
            // .auth
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Success!', value);
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    login(email: string, password: string) {
        console.log('login')
        if(localStorage.getItem('silverFlameToken') || localStorage.getItem('silverFlameToken')!==null){
            console.log(localStorage.getItem('silverFlameToken'))
            return;
        }
        this.firebaseAuth
            // .auth
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                console.log('Nice, it worked!', value);
                localStorage.setItem('silverFlameToken', value.user.refreshToken)
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
            });
    }

    logout() {
        console.log('this.logout')
        this.firebaseAuth
            // .auth
            .signOut();
    }
}