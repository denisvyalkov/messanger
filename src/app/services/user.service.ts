import { Injectable } from '@angular/core';

export interface Rule {
  name: string;
  ok: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  countryCodes = ['+7'];
  passwordRules: Rule[] = [];
  timeToResend = 60; // time to sms resend

  constructor() {}
}
