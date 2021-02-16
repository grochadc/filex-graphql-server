import { DataSource } from "apollo-datasource";
import { google } from "googleapis";
require("dotenv").config();

function getJWT() {
  return new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
}

class SheetsAPI extends DataSource {
  sheetID: any;
  api: any;
  ready: boolean;
  constructor(sheetID) {
    super();
    this.sheetID = sheetID;
    this.api = google.sheets({ version: "v4", auth: getJWT() });
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
