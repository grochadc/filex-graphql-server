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
  constructor(sheetID: string) {
    super();
    this.sheetID = sheetID;
    this.api = google.sheets({ version: "v4", auth: getJWT() });
  }

  interface() {
    return [this.api, this.sheetID];
  }

  async append(values: any[][], range: string) {
    return this.api.spreadsheets.values.append({
      spreadsheetId: this.sheetID,
      range,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    });
  }

  async update(values: any[][], range: string) {
    return this.api.spreadsheets.values.update({
      spreadsheetId: this.sheetID,
      range,
      valueInputOption: "RAW",
      resource: {
        values,
      },
    });
  }
}

export { SheetsAPI };
