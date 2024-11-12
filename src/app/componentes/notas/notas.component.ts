import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Cursos } from '../../models/cursos';
import { Notas } from '../../models/notas';
import { Alumnos } from '../../models/alumnos';
import { CursosService } from '../../services/cursos.service';
import { NotasService } from '../../services/notas.service';
import { AlumnosService } from '../../services/alumnos.service';
import { HomeComponent } from '../home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    DialogModule,
    RouterModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    DropdownModule,
    HomeComponent,
    CommonModule,
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css',
})
export class NotasComponent {
  notas: Notas[] = [];
  alumnos: Alumnos[] = [];
  cursos: Cursos[] = [];
  visible: boolean = false;
  isDeleteInProgress: boolean = false;
  alumnoTemp: Alumnos = new Alumnos();
  cursoTemp: Cursos = new Cursos();
  totalRecords: number = 0;
  nota = new Notas(0, 0, 0, 0, 0, new Alumnos(), new Cursos());
  titulo: string = '';
  opc: string = '';
  op = 0;
  cargando: boolean = false;
  nota1Temp = 0;
  nota2Temp = 0;
  nota3Temp = 0;

  constructor(
    private notasService: NotasService,
    private alumnosService: AlumnosService,
    private cursosService: CursosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listarNotas();
    this.listarAlumnos();
    this.listarCursos();
  }

  get promedio(): number {
    return parseFloat(
      (
        (Number(this.nota1Temp) +
          Number(this.nota2Temp) +
          Number(this.nota3Temp)) /
        3
      ).toFixed(1)
    );
  }

  listarNotas() {
    this.notasService.getNotas().subscribe({
      next: (data) => {
        console.log(data);
        this.notas = data;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de notas',
        });
      },
    });
  }

  listarAlumnos() {
    this.alumnosService.getAlumnos().subscribe((data) => {
      console.log(data);
      this.alumnos = data;
    });
  }

  listarCursos() {
    this.cursosService.getCursos().subscribe((data) => {
      this.cursos = data;
    });
  }

  showDialogCreate() {
    this.titulo = 'Crear Nota';
    this.opc = 'Guardar';
    this.op = 0;
    this.nota1Temp = 0;
    this.nota2Temp = 0;
    this.nota3Temp = 0;
    this.visible = true;
    this.cursoTemp = new Cursos();
    this.alumnoTemp = new Alumnos();
    this.nota = new Notas(0, 0, 0, 0, 0, new Alumnos(), new Cursos());
  }

  showDialogEdit(id: number) {
    this.titulo = 'Editar Nota';
    this.opc = 'Editar';
    this.notasService.getNotasById(id).subscribe((data) => {
      this.nota = data;
      this.op = 1;
      this.nota1Temp = this.nota.nota1;
      this.nota2Temp = this.nota.nota2;
      this.nota3Temp = this.nota.nota3;
    });
    this.visible = true;
  }

  deleteNotas(id: number) {
    this.notasService.deleteNotas(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminado',
          detail: 'La nota ha sido eliminada exitosamente',
        });
        this.listarNotas();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar la nota',
        });
      },
    });
  }

  confirmDeleteNotas(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteNotas(id);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'Has cancelado la operación',
        });
      },
    });
  }

  opcion(): void {
    if (this.op == 0) {
      this.addNotas();
      this.limpiar();
    } else if (this.op == 1) {
      this.editNotas();
      this.limpiar();
    } else {
      this.limpiar();
    }
  }

  // Crear una nueva nota
  addNotas() {
    this.nota.nota1 = this.nota1Temp;
    this.nota.nota2 = this.nota2Temp;
    this.nota.nota3 = this.nota3Temp;
    this.nota.promedio = this.promedio;

    this.nota.alumnos = this.alumnoTemp;
    this.nota.cursos = this.cursoTemp;

    console.log(this.nota);
    this.notasService.crearNotas(this.nota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Registrada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo agregar la nota',
        });
      },
    });
    this.visible = false;
  }

  editNotas() {
    this.nota.nota1 = this.nota1Temp;
    this.nota.nota2 = this.nota2Temp;
    this.nota.nota3 = this.nota3Temp;
    this.nota.promedio = this.promedio;
    this.nota.alumnos = this.alumnoTemp;
    this.nota.cursos = this.cursoTemp;
    console.log(this.nota);
    this.notasService.updateNotas(this.nota, this.nota.idnota).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Nota Editada',
        });
        this.listarNotas();
        this.op = 0;
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo editar la nota',
        });
      },
    });
    this.visible = false;
  }

  SaveNotas() {
    this.confirmationService.confirm({
      message:
        this.op === 0
          ? '¿Estás seguro de que deseas agregar esta nota?'
          : '¿Estás seguro de que deseas editar esta nota?',
      header: 'Confirmar Acción',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.opcion();
      },
    });
  }

  limpiar() {
    this.titulo = '';
    this.opc = '';
    this.op = 0;
    this.nota = new Notas(0, 0, 0, 0, 0, new Alumnos(), new Cursos());
    this.nota1Temp = 0;
    this.nota2Temp = 0;
    this.nota3Temp = 0;
    this.cursoTemp = new Cursos();
    this.alumnoTemp = new Alumnos();
  }
}
