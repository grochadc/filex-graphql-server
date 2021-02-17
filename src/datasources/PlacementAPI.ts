import { RESTDataSource } from "apollo-datasource-rest";

class PlacementAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/placement";
  }

  async addApplicant(applicant: Applicant) {
    return this.post(`applications.json`, applicant);
  }

  async getMeetLinks() {
    return this.get(`meetLinks.json`);
  }

  async saveMeetLinks(links: string[]) {
    return this.put(`/meetLinks.json`, links);
  }
}

export { PlacementAPI };
