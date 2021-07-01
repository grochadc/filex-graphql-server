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
    const links = await this.get(`meetLinks.json`);
    if (links) return links;
    return [];
  }

  async saveMeetLinks(links: { teacher: string; link: string }[]) {
    return this.put(`/meetLinks.json`, links);
  }

  async logInUser() {
    const online = await this.get(`/online.json`);
    if (online === null) {
      this.put(`/online.json`, Number(1).toString());
      return 1;
    }
    const counter = Number(online) + 1;
    this.context.dataSources.sheetsAPI.setOnlineUsers(counter);
    this.put(`/online.json`, counter.toString());
    return counter;
  }

  async logOutUser() {
    const online = await this.get(`/online.json`);
    const counter = Number(online) - 1;
    this.context.dataSources.placementSheetsAPI.setOnlineUsers(counter);
    this.put(`/online.json`, counter.toString());
    return counter;
  }
}

export { PlacementAPI };
