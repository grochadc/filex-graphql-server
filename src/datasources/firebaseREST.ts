const { RESTDataSource } = require("apollo-datasource-rest");
const R = require("ramda");

class firebaseAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops/";
  }

  async getReservations(teacher_id: String) {
    const data = await this.get(`reservations/${teacher_id}.json`); //{alondralunes : {}, alondramiercoleds:{}}
    const parse = R.compose(
      R.flatten,
      R.map(R.values),
      R.values
    )
    return parse(data);
  }

  async makeReservation(teacher_id: string, reservation, option_id: string) {
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
      this.addRegistered(option_id);
      return this.post(
        `reservations/${teacher_id}/${option_id}.json`,
        reservation
      );
    } else if (option_id === undefined) {
      throw new Error("No option id provided");
    }
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
