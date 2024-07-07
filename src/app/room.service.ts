import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  getRooms(): Observable<any> {
    return this.http.get(`${this.apiUrl}/rooms`);
  }

  createRoom(room: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/rooms`, room, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updateRoom(id: string, room: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/rooms/${id}`, room, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteRoom(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/rooms/${id}`, { headers }).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
