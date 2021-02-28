import { SheetsAPI } from "./SheetsAPI";
import { Applicant } from "../types/placement.d";

class PlacementSheetsAPI extends SheetsAPI {
  constructor(sheetID: string) {
    super(sheetID);
  }

  async saveApplicant(applicant: Applicant) {
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
        applicant.curso,
        applicant.meetLink,
      ],
    ];
    return this.append(values, "Today!A1");
  }

  async setOnlineUsers(online: number) {
    return this.update([[online]], "Today!B1");
  }
}

export { PlacementSheetsAPI };
