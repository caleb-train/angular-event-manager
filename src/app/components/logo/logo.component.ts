import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-logo',
  template: `
    <a class="logo" [href]="href">
      <img class="logo" src="../../assets/images/logo.png" />
      <h1 [style.color]="theme === 'dark' ? 'white' : '#444'">Bambi</h1>
    </a>
  `,
})
export class LogoComponent implements OnInit {
  @Input() theme?: string = 'dark'
  href: string = '/'

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    if (this.eventService.isLoggedIn) this.href = '/admin/events'
  }

}
