import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  loginSub$ = new Subscription();
  isUserIn = false;
  constructor(private logsvc: LoginService, private router: Router) {}

  navigateToRegistration() {
    this.router.navigateByUrl('registration');
  }

  ngOnInit(): void {
    this.loginSub$ = this.logsvc.isUserLogged.subscribe(
      this.#isUserLogged.bind(this)
    );
  }

  #isUserLogged(res: boolean): void {
    res ? '' : this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {}
}
