import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";
import * as utils from "../utils";
import database from "./db";

class WorkshopsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops";
  }

  getWorkshops() {
    return database.workshops;
  }

  getOptionById(id: string) {
    return utils.getById(database, "options", id, () => null);
  }

  getOptionsByTeacherId(teacher_id) {
    return database.options
      .filter((option) => option.teacher_id === teacher_id)
      .map((option) => {
        return {
          ...option,
          workshop: utils.getById(
            database,
            "workshops",
            option.workshop_id,
            () => null
          ).id,
        };
      });
  }

  makeReservation(teacher_id: string, option_id: string, reservation: any) {
    this.post(`${teacher_id}/${option_id}.json`, reservation);
  }

  getTeacher(id: string) {
    return utils.getById(database, "teachers", id, () => null);
  }

  async getReservations(teacher_id: String) {
    console.log(
      "Warning: Getting reservations hardcoded from memory. Please change to query database"
    );
    const data = await this.get(`reservations/${teacher_id}.json`);
    const parse = R.compose(R.flatten, R.map(R.values), R.values);
    return parse(data);
  }

  getOption(id: string) {
    return utils.getById(database, "options", id, () => null);
  }
}

export { WorkshopsAPI };
