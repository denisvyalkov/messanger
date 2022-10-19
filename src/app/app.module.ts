import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginService } from './services/login.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    RegisterPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
