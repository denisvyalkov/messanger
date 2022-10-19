import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

interface User {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  #onUserInObs = new Subject<User>();
  onUserIn = this.#onUserInObs.asObservable();
  #onUserOutObs = new Subject();
  onUserOut = this.#onUserOutObs.asObservable();
  #loginSubscription = new Subscription();

  user: User | null = null;
  isUserLogged = new BehaviorSubject<boolean>(false);

  constructor() {
    this.#loginSubscription.add(
      this.#onUserInObs.subscribe((user: User) => {
        this.user = user;
        this.isUserLogged.next(true);
      })
    );
    this.#loginSubscription.add(
      this.#onUserOutObs.subscribe(() => {
        this.user = null;
        this.isUserLogged.next(false);
      })
    );
  }

  login(userData: User) {
    this.#onUserInObs.next(userData);
  }

  logout() {
    this.#onUserOutObs.next(null);
  }
}
