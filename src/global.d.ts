import type { ResponseCursoData } from "./types";

declare module "astro" {
  interface AstroGlobal {
    locals: {
      cursosApi: ResponseCursoData[];
    };
  }
}