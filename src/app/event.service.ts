import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IAuth, IEvt, IEvtTypes, ILogin, INewEvt, IResp } from './models.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventService = ''
  currentUser: IAuth | undefined;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {

  }

  getEvents(q: string = ''): Observable<IResp<IEvt[]>> {
    return this.http.get<IResp<IEvt[]>>(`${this.eventService}/api/events${q ? `?q=${q}` : ''}`).pipe(tap(data => console.log('All', JSON.stringify(data))), catchError(this.handleError))
  }

  getRegistrations(q: string = ''): Observable<IResp<IEvt[]>> {
    return this.http.get<IResp<IEvt[]>>(`${this.eventService}/api/event/registration${q ? `?email=${q}` : ''}`).pipe(tap(data => data), catchError(this.handleError))
  }

  deleteEvent(id: number): Observable<IResp<number>> {
    return this.http.delete<IResp<number>>(`${this.eventService}/api/events${id ? `?id=${id}` : ''}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.currentUser?.token}`,
      }
    }).pipe(tap(data => data), catchError(this.handleError))
  }

  deleteEventType(id: number): Observable<IResp<number>> {
    return this.http.delete<IResp<number>>(`${this.eventService}/api/event-types${id ? `?id=${id}` : ''}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.currentUser?.token}`,
      }
    }).pipe(tap(data => data), catchError(this.handleError))
  }

  getEventTypes(q: string) {
    return this.http.get<IResp<IEvtTypes[]>>(`${this.eventService}/api/event-types`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.currentUser?.token}`,
      }
    }).pipe(tap(), catchError(this.handleError))
  }

  adminLogin(loginData: ILogin): Observable<IResp<IAuth>> {
    return this.http.post<IResp<IAuth>>(`${this.eventService}/api/auth/login`, loginData, { headers: { "Content-Type": "application/json" }, }).pipe(tap(data => this.saveUser(data.data)))
  }

  createEvent(evtData: INewEvt): Observable<IResp<any>> {
    return this.http.post<IResp<IAuth>>(`${this.eventService}/api/events`, evtData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.currentUser?.token}`,
      },
    })
  }

  createEventType(eventType: IEvtTypes): Observable<IResp<any>> {
    return this.http.post<IResp<IAuth>>(`${this.eventService}/api/event-types`, eventType, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this.currentUser?.token}`,
      },
    })
  }

  getEvent(id: number): Observable<IResp<IEvt>> {
    return this.http.get<IResp<IEvt>>(`${this.eventService}/api/events?id=${id}`).pipe(tap(data => console.log('All', data)), catchError(this.handleError))
  }

  saveUser(user: IAuth) {
    localStorage.setItem('admin', JSON.stringify(user))
    this.hydrate()
  }

  logout() {
    localStorage.removeItem('admin')
    this.isLoggedIn = false
    this.currentUser = undefined
  }

  hydrate() {
    const admin = localStorage.getItem('admin')
    if (admin) {
      this.currentUser = JSON.parse(admin) as IAuth;
      this.isLoggedIn = true
    }
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err)
    const errorMsg = err.error instanceof ErrorEvent ? err.error.message : err.message;
    console.error(errorMsg)
    return throwError(() => new Error(errorMsg))
  }
}
