import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

export interface User {
  login?: string;
  phone?: string;
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
  socket: WebSocket = new WebSocket('ws://localhost:9000');

  user: User | null = null;
  isUserLogged = new BehaviorSubject<boolean>(false);

  constructor() {
    console.log('login service!')
    this.#loginSubscription.add(
      this.#onUserInObs.subscribe((user: User) => {
        this.user = user;
        this.isUserLogged.next(true);
        console.log('logged in', user);
      })
    );
    this.#loginSubscription.add(
      this.#onUserOutObs.subscribe(() => {
        this.user = null;
        this.isUserLogged.next(false);
        this.socket.close();
      })
    );
    this.socket.onmessage = function (message: any) {
      console.log('Message: %s', message.data);
    };
  }

  login(userData: User) {
    this.#onUserInObs.next(userData);
  }

  logout() {
    this.#onUserOutObs.next(null);
  }

  phoneValidator(control: FormControl | AbstractControl) {
    if (
      control &&
      control?.dirty &&
      control?.value!.replace(/\D/g, '').length === 10
    ) {
      return null;
    } else return { error: 'error: incorrect input' };
  }

  sendWsMessage(type: string, data: any) {
    this.socket.send(JSON.stringify({ action: type, data: data }));
  }
}
