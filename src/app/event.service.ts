import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IAuth, IEvt, ILogin, IResp } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventService = ''

  constructor(private http: HttpClient) { }

  getEvents(q: string = ''): Observable<IResp<IEvt[]>> {
    return this.http.get<IResp<IEvt[]>>(`${this.eventService}/api/events${q ? `?q=${q}` : ''}`).pipe(tap(data => console.log('All', JSON.stringify(data))), catchError(this.handleError))
  }

  adminLogin(loginData: ILogin): Observable<IResp<IAuth>> {
    console.log(loginData)
    return this.http.post<IResp<IAuth>>(`${this.eventService}/api/auth/login`, loginData, { headers: { "Content-Type": "application/json" }, }) /* of({ status: 2000 } as IResp<IAuth>) */
  }

  getEvent(id: number): Observable<IResp<IEvt>> {
    return this.http.get<IResp<IEvt>>(`${this.eventService}/api/events?id=${id}`).pipe(tap(data => console.log('All', data)), catchError(this.handleError))
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    const errorMsg = err.error instanceof ErrorEvent ? err.error.message : err.message;
    console.error(errorMsg)
    return throwError(() => new Error(errorMsg))
  }
}
