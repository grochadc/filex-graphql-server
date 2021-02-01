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
    this.client
      .ref("onlineUsers")
      .once("value")
      .then((snapshot) => console.log("value ", snapshot.val()))
      .catch((e) => console.log("error ", e));
  }
  async get(ref: string) {
    console.log(`Getting ref ${ref}`);
    return this.client
      .ref(ref)
      .once("value")
      .then((snapshot: { val: any }) => {
        const data = snapshot.val();
        console.log(`DataSource got value ${data}`);
        return data;
      })
      .catch((e) => console.log(`Caught eror ${e}`));
  }

  async post(ref: string, data: any) {
    console.log(`Posting data ${data} to ref ${ref}`);
    return await this.client.ref(ref).set(data);
  }
}

export = FirebaseAPI;
