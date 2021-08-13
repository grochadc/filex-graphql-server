import { SheetsAPI } from "./SheetsAPI";
import { Applicant } from "../types/placement.d";

class PlacementSheetsAPI extends SheetsAPI {
  constructor(sheetID: string) {
    super(sheetID);
  }

  async saveApplicant(applicant: Applicant) {
    const nivel_final =
      Number(applicant.nivel_escrito) < 3 ? applicant.nivel_escrito : null;
    const values = [
      [
        new Date().toUTCString(),
        applicant.id,
        applicant.codigo,
        applicant.nombre,
        applicant.apellido_paterno,
        applicant.apellido_materno,
        applicant.genero,
        applicant.ciclo,
        applicant.carrera,
        applicant.telefono,
        applicant.email,
        applicant.externo,
        applicant.reubicacion,
        applicant.curso,
        applicant.meetLink,
        applicant.nivel_escrito,
        nivel_final,
        nivel_final,
      ],
    ];
    return this.append(values, "Today!A1");
  }

  async setOnlineUsers(online: number) {
    return this.update([[online]], "Today!B1");
  }
}

export { PlacementSheetsAPI };
