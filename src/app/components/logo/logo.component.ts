import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <a class="logo" href="/">
      <img class="logo" src="../../assets/images/logo.png" />
      <h1 [style.color]="theme === 'dark' ? 'white' : '#444'">Bambi</h1>
    </a>
  `,
})
export class LogoComponent implements OnInit {
  @Input() theme?: string = 'dark'
  
  constructor() { }

  ngOnInit(): void {
  }

}
