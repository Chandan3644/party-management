import { Component } from '@angular/core';
import { Snack } from '../../../core/notify/snack';
import { Auth } from '../../../core/auth/auth';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material-module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-toolbar',
  imports: [MaterialModule,CommonModule],
  templateUrl: './app-toolbar.html',
  styleUrl: './app-toolbar.css'
})
export class AppToolbar {
  isLoggedIn = false;
  constructor(public auth: Auth, private router: Router, private snack: Snack) { 
     this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
   this.auth.logout()
  }
}
