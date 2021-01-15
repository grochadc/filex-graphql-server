const { google } = require("googleapis");
const { getSpreadSheet } = require("./auth");

function request(auth, spreadsheetId, values, range) {
  const sheets = google.sheets({ version: "v4", auth });
  return new Promise<void>((resolve, reject) => {
    const request = {
      spreadsheetId,
      auth,
      range,
      valueInputOption: "RAW",
      resource: { values: values },
    };
    sheets.spreadsheets.values.append(request, (err, res) => {
      if (err) {
        reject(err);
      } else {
        console.log("Success!");
        resolve();
      }
    });
  });
}

function update(sheetId, values, range) {
  return new Promise<void>((resolve, reject) => {
    getSpreadSheet((auth) => request(auth, sheetId, values, range));
  });
}

export = { update };
