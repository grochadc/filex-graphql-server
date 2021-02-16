import { google } from "googleapis";
import * as fs from "fs";
import { authorize, CRED_PATH } from "../../sheetsAuth";
import { DataSource } from "apollo-datasource";

class SheetsAPI extends DataSource {
  sheetID: any;
  api: any;
  constructor(sheetID) {
    super();
    this.sheetID = sheetID;
  }

  async init() {
    authorize(JSON.parse(fs.readFileSync(CRED_PATH, "utf8"))).then((auth) => {
      this.api = google.sheets({ version: "v4", auth });
    });
  }

  async saveApplicant(applicant: Applicant) {
    await this.init();
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
      ],
    ];
    this.api.spreadsheets.values.append({
      spreadsheetId: this.sheetID,
      range: "Today!A1",
      valueInputOption: "RAW",
      resource: {
        values,
      },
    });
  }
}

export { SheetsAPI };
