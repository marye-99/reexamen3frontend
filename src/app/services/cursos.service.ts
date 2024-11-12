import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cursos } from '../models/cursos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private apiUrl='http://localhost:8080/api/cursos';
  constructor(private http:HttpClient) { }

  getCursos():Observable<Cursos[]>{
    return this.http.get<Cursos[]>(this.apiUrl);
  }

  getCursoById(id: number): Observable<Cursos> {
    return this.http.get<Cursos>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Cursos): Observable<Cursos> {
    return this.http.post<Cursos>(this.apiUrl, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateCurso(curso: Cursos, id: number): Observable<Cursos> {
    return this.http.put<Cursos>(`${this.apiUrl}/${id}`, curso);
  }

  
}
