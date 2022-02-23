import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../../event.service';
import { ILogin } from '../../models.interface';

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
  errorMsg: any
  loading: boolean = false;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {

  }
  onSubmit(form: NgForm) {
    this.loading = true;
    const sub = this.eventService.adminLogin(this.loginData).subscribe({
      next: auth => {
        this.loading = false
        this.errorMsg = null
        this.router.navigate(['/admin/events'])
      },
      error: err => {
        console.log('error', err?.error)
        this.errorMsg = err?.error?.error
        this.loading = false
      },
    });
  }
}
