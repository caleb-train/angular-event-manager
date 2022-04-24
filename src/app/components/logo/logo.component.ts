import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EventService } from 'src/app/event.service';
import { IAppState } from 'src/app/state/reducers';

@Component({
  selector: 'app-logo',
  template: `
    <a class="logo" [routerLink]="['/']">
      <img class="logo" src="../../assets/images/logo.png" />
      <h1 [style.color]="theme === 'dark' ? 'white' : '#444'">Bambi</h1>
    </a>
  `,
})
export class LogoComponent implements OnInit {
  @Input() theme?: string = 'dark';

  constructor() {}

  ngOnInit(): void {
    //if (this.store.sel) this.href = '/admin/events'
  }
}
