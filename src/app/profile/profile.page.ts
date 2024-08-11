import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData: any;

  constructor(private router: Router,
    private authService : AuthService,) { }

  ngOnInit() {
    this.loadUserData();
  }

  // google login data
  loadUserData() {
    this.userData = JSON.parse(sessionStorage.getItem('id_token_claims_obj') || '{}');
  }

  signOut() {
    this.authService.logout();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
