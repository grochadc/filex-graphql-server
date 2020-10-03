const { RESTDataSource } = require("apollo-datasource-rest");

class firebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops/";
  }

  async getReservations(teacher_id) {
    const data = await this.get(`reservations/${teacher_id}.json`);
    return data;
  }

  async makeReservation(teacher_id, reservation) {
    return this.post(`reservations/${teacher_id}.json`, reservation);
  }

  async getOptionAvailability(option_id) {
    const data = await this.get(`available/${option_id}/registered.json`);
    return data;
  }
}

export = firebaseAPI;
