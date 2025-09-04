import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/auth/auth';
import { Snack } from '../../core/notify/snack';
import { MaterialModule } from '../../shared/material/material-module';


@Component({
  selector: 'app-login',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm!: FormGroup;
  loading = false;
  hide = true;
  returnUrl!: string;

  constructor(
    private auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    private snack: Snack
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe({
      next: () => {
        this.snack.ok('Login successful!');
        this.router.navigate(['/parties']);
        this.loading = false;
      },
      error: err => {
        this.snack.err('Login failed: ' + (err.error?.message || err.statusText));
        this.loading = false;
      }
    });
  }

}
