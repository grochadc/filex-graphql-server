const { RESTDataSource } = require("apollo-datasource-rest");

class firebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/";
  }

  async getReservations() {
    const data = await this.get("workshops/applicants.json");
    return data;
  }
}

module.exports = firebaseAPI;
