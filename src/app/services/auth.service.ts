import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { App, AppState } from '@capacitor/app';
import { loginSuccess, logoutSuccess } from '../stateManagement/auth/auth.state';
import { Store } from '@ngrx/store';
import { delay, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private oauthService: OAuthService,
    private platform: Platform,
    private store: Store<AppState>,
  ) {
    this.configureOAuth();
  }

  private configureOAuth() {
    const authConfig: AuthConfig = {
      issuer: 'https://accounts.google.com',
      redirectUri: this.platform.is('capacitor') ? 'yourapp://callback' : 'http://localhost:8100/tabs/home',
      clientId: environment.clientId,
      dummyClientSecret: environment.client_secret,
      responseType: 'code',
      scope: 'openid profile email',
      showDebugInformation: true,
      requireHttps: true,
      strictDiscoveryDocumentValidation: false,
      disableAtHashCheck: true,
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oauthService.hasValidIdToken()) {
        const user = this.oauthService.getIdentityClaims();
        const token = this.oauthService.getAccessToken();
        this.store.dispatch(loginSuccess(user, token));
      }
    });

    if (this.platform.is('capacitor')) {
      App.addListener('appUrlOpen', (data: any) => {
        if (data.url) {
          this.oauthService.tryLogin({ customHashFragment: data.url.split('#')[1] });
          const user = this.oauthService.getIdentityClaims();
          const token = 'xjwncjwcnwnwdjwojdowj';
          this.store.dispatch(loginSuccess(user, token));
        }
      });
    }
  }

  public login() {
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
    this.store.dispatch(logoutSuccess());
  }

  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  public get isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  loginSimple(username: string, password: string): Observable<any> {
    if (username === 'test' && password === 'password') {
      return of({ username: 'test', token: 'fake-jwt-token' }).pipe(delay(1000));
    } else {
      return of({ error: 'Invalid credentials' }).pipe(delay(1000));
    }
  }

}
