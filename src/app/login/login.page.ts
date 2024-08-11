
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { login, selectIsAuthenticated } from '../stateManagement/auth/auth.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  // Google login
  onGoogleLogin() {
    this.authService.login();
  }

  ionViewDidEnter() {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/tabs/home']);
    }
  }

  // Form login 
  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (username == 'testApp' && password == 'testAppPassword') {
        this.store.dispatch(login(username, password));
        this.router.navigate(['/tabs/home']);
      } else {
        alert("Enter your valid crediential")
      }
    } else {
      alert("Enter your valid crediential")
    }
  }

}
