import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(__dirname, "/secrets/token.json");
const CRED_PATH = path.join(__dirname, "/secrets/credentials.json");

async function authorize(cred: any) {
  const { client_secret, client_id, redirect_uris } = cred.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(
      JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"))
    );
    return oAuth2Client;
  }

  return getNewToken<typeof oAuth2Client>(oAuth2Client);
}

async function getNewToken<T = any>(oAuth2Client: any): Promise<T> {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this url:", authUrl);
  const code = await readlineAsync("Enter the code from that page here: ");
  const token = await new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err: any, token: any) => {
      err ? reject(err) : resolve(token);
    });
  });
  oAuth2Client.setCredentials(token);
  // Store the token to disk for later program executions
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
  console.log("Token stored to", TOKEN_PATH);

  return oAuth2Client;
}

async function readlineAsync(question: string) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let response: any;

  rl.setPrompt(question);
  rl.prompt();

  return new Promise((resolve) => {
    rl.on("line", (input) => {
      response = input;
      rl.close();
    });

    rl.on("close", () => {
      resolve(response);
    });
  });
}

export { authorize, CRED_PATH };
