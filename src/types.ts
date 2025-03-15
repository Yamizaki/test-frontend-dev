export interface ResponseCursoData {
  clases: Array<clasesModulo>;
  titulo: string;
  descripcion: string;
}

export interface clasesModulo {
  completado: boolean;
  descripcion: string;
  duracion: string;
  titulo: string;
  video: string;
}