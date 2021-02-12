import { RESTDataSource } from "apollo-datasource-rest";

class FirebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/";
  }

  async getRef(ref: String) {
    return this.get(`${ref}.json`);
  }

  async setRef(ref: String, data: any) {
    return this.put(`${ref}.json`, data);
  }

  async addApplicant(applicant) {
    return this.post(`placement/applications.json`, applicant);
  }

  async getMeetLinks() {
    return this.get(`placement/meetLinks.json`);
  }
}

export { FirebaseAPI };
