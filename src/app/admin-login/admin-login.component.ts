import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../event.service';
import { IAuth, ILogin } from '../models.interface';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  originalLoginData: ILogin = {
    username: '',
    password: ''
  }

  loginData: ILogin = { ...this.originalLoginData };
  auth: IAuth | undefined;
  errorMsg: any

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  login() {

  }
  onSubmit(form: NgForm) {
    const sub = this.eventService.adminLogin(this.loginData).subscribe({
      next: auth => this.auth = auth.data,
      error: err => {
        console.log('error', err)
      }
    });
  }
}
