const { RESTDataSource } = require("apollo-datasource-rest");

class firebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops/";
  }

  async getReservations(teacher_id: String) {
    const data = await this.get(`reservations/${teacher_id}.json`);
    return data;
  }

  async makeReservation(teacher_id, reservation, option_id) {
    if (option_id) {
      const reservations = await this.get(
        `reservations/${teacher_id}/${option_id}.json`
      );
      if (
        reservations &&
        Object.values(reservations).filter(
          ({ code }) => reservation.code === code
        ).length > 0
      )
        throw new Error(
          "Ya hiciste una reservación para ese taller. Por favor elige uno diferente."
        );
    }
    this.addRegistered(option_id);
    return this.post(
      `reservations/${teacher_id}/${option_id}.json`,
      reservation
    );
  }

  async getRegistered(option_id: string): Promise<number> {
    const data = await this.get(`available/${option_id}/registered.json`);
    const registered = data && Object.keys(data).length;
    return registered;
  }

  async addRegistered(option_id: string) {
    return this.post(`available/${option_id}/registered.json`, 1);
  }
}

export = firebaseAPI;
