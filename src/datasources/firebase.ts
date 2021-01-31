import { DataSource } from "apollo-datasource";
import firebase from "firebase/app";
import "firebase/database";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
}

class FirebaseAPI extends DataSource {
  client: any;
  constructor(clientConfig: FirebaseConfig) {
    super();
    const firebaseApp = !firebase.apps.length
      ? firebase.initializeApp(clientConfig)
      : firebase.app();
    this.client = firebaseApp.database();
  }
  async get(ref: string) {
    return await this.client
      .ref(ref)
      .once("value")
      .then((snapshot: { val: any }) => snapshot.val())
      .catch(console.log);
  }

  async post(ref: string, data: any) {
    return await this.client.ref(ref).set(data);
  }
}

export = FirebaseAPI;
