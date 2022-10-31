import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
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
  socket?: any;

  user: User | null = null;
  isUserLogged = new BehaviorSubject<boolean>(false);

  constructor() {
    this.#loginSubscription.add(
      this.#onUserInObs.subscribe((user: User) => {
        this.user = user;
        this.isUserLogged.next(true);
        console.log('logged in', user);
        this.#setWsConnection();
      })
    );
    this.#loginSubscription.add(
      this.#onUserOutObs.subscribe(() => {
        this.user = null;
        this.isUserLogged.next(false);
        this.socket.close();
      })
    );
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

  #setWsConnection(): void {
    this.socket = new WebSocket('ws://localhost:9000');
    this.socket.onmessage = function (message: any) {
      console.log('Message: %s', message.data);
    };
  }

  sendSms(a?: Event): void {
    console.log('sms sended');
  }

  wsSendEcho(value: any) {
    this.socket.send(
      JSON.stringify({ action: 'ECHO', data: value.toString() })
    );
  }
}
