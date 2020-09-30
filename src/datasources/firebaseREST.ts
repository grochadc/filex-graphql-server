const { RESTDataSource } = require("apollo-datasource-rest");

class firebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/";
  }

  async getReservations(teacher_id) {
    const data = await this.get(`workshops/reservations/${teacher_id}.json`);
    return data;
  }
}

export = firebaseAPI;
