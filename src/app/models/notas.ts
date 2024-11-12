import { Alumnos } from './alumnos';
import { Cursos } from './cursos';

export class Notas {
  idnota: number;
  nota1: number;
  nota2: number;
  nota3: number;
  promedio: number;
  alumnos: Alumnos;
  cursos: Cursos;

  constructor(
    idnota: number = 0,
    nota1: number = 0,
    nota2: number = 0,
    nota3: number = 0,
    promedio: number = 0,
    alumnos: Alumnos = new Alumnos(),
    cursos: Cursos = new Cursos()
  ) {
    this.idnota = idnota;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
    this.promedio = promedio;
    this.alumnos = alumnos;
    this.cursos = cursos;
  }
}
