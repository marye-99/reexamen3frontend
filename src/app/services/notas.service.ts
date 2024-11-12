import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notas } from '../models/notas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotasService {
  private apiUrl = 'http://localhost:8080/api/notas';
  constructor(private http: HttpClient) {}

  getNotas(): Observable<Notas[]> {
    return this.http.get<Notas[]>(this.apiUrl);
  }

  getNotasById(id: number): Observable<Notas> {
    return this.http.get<Notas>(`${this.apiUrl}/${id}`);
  }

  crearNotas(nota: Notas): Observable<Notas> {
    return this.http.post<Notas>(this.apiUrl, nota);
  }

  deleteNotas(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateNotas(nota: Notas, idnota: number): Observable<Notas> {
    return this.http.put<Notas>(`${this.apiUrl}/${idnota}`, nota);
  }
}
