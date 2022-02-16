import { Component, OnInit } from "@angular/core";
import { EventService } from "./event.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Bambi event manager'

  constructor(private eventService: EventService) {
  }
  ngOnInit(): void {
    this.eventService.hydrate()
  }

}