import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isUserIn = this.logsvc.isUserLogged;
  constructor(private logsvc: LoginService, private router: Router) {
  }

  navigateToRegistration () {
    this.router.navigateByUrl('registration');
  }

  ngOnInit(): void {}
}
