import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [
        'souleymane.sada@gmail.com',
        [Validators.required, Validators.email],
      ],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    console.log(this.form.value);
    const { data, error } = await this.auth.login(this.form.value);
    console.log(data);
    if (error) {
    } else {
      this.router.navigateByUrl('app', { replaceUrl: true });
    }
  }
  async register() {
    console.log(this.form.value);
    const { data, error } = await this.auth.createAccount(this.form.value);
    console.log(data);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      this.router.navigateByUrl('app', { replaceUrl: true });
    }
  }
}
