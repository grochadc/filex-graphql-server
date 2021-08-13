import { RESTDataSource } from "apollo-datasource-rest";
import { MeetLink } from "../types/index";
import { getIndexToModify } from "../utils";

class PlacementAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/placement";
  }

  async addApplicant(applicant: Applicant) {
    return this.post(`applications.json`, applicant);
  }

  async getMeetLinks(env?: "dev" | "prod") {
    const defaultLinksUrl =
      env === "dev" ? `/${env}/meetLinks.json` : `/meetLinks.json`;
    const links = await this.get(defaultLinksUrl);
    if (links) return links;
    return [];
  }

  async saveMeetLinks(links: { teacher: string; link: string }[]) {
    return this.put(`/meetLinks.json`, links);
  }

  async saveSingleMeetLink(link: MeetLink, env?: "dev" | "prod") {
    const defaultMeetLinksLocation =
      env === "dev" ? `/${env}/meetLinks.json` : `/meetLinks.json`;
    const meetLinks: MeetLink[] = await this.get(defaultMeetLinksLocation);
    const insertAtIndex = getIndexToModify(
      link,
      meetLinks,
      (i, a) => i.id === a.id
    );
    console.log("inserting at index", insertAtIndex);
    console.log("modifiying db at", env);
    return this.put(
      `/${env}/meetLinks/${insertAtIndex.toString()}.json`,
      JSON.stringify(link)
    );
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
