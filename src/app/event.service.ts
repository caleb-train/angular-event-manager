import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { IEvt, IResp } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventService = 'https://event-manager-node.herokuapp.com'

  constructor(private http: HttpClient) { }

  getEvents(): Observable<IResp<IEvt[]>> {
    return this.http.get<IResp<IEvt[]>>(`${this.eventService}/api/events`).pipe(tap(data => console.log('All', JSON.stringify(data))), catchError(this.handleError))
  }

  getEvent(id: number): Observable<IResp<IEvt>> {
    return this.http.get<IResp<IEvt>>(`${this.eventService}/api/events?id=${id}`).pipe(tap(data => console.log('All', data)), catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) {
    const errorMsg = err.error instanceof ErrorEvent ? err.error.message : err.message;
    console.error(errorMsg)
    return throwError(() => new Error(errorMsg))
  }
}
