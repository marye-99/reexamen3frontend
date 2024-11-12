import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumnos } from '../models/alumnos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiUrl='http://localhost:8080/api/alumnos';
  constructor(private http:HttpClient) { }

  getAlumnos():Observable<Alumnos[]>{
    return this.http.get<Alumnos[]>(this.apiUrl);
  }

  getAlumnoById(id: number): Observable<Alumnos> {
    return this.http.get<Alumnos>(`${this.apiUrl}/${id}`);
  }

  createAlumno(alumno: Alumnos): Observable<Alumnos> {
    return this.http.post<Alumnos>(this.apiUrl, alumno);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateAlumno(alumno: Alumnos, id: number): Observable<Alumnos> {
    return this.http.put<Alumnos>(`${this.apiUrl}/${id}`, alumno);
  }
}
