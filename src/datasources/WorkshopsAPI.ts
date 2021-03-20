import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";
import * as utils from "../utils";
import database from "./db";

interface AttendingStudent {
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno?: string;
  nivel: string;
  grupo: string;
  workshop: string;
  teacher: string;
  attended: boolean;
}

class WorkshopsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      process.env.NODE_ENV === "production"
        ? "https://filex-5726c.firebaseio.com/workshops"
        : "https://filex-5726c.firebaseio.com/dev/workshops";
  }

  getWorkshops() {
    return database.workshops;
  }

  mapOptionIds(option_ids: string[]) {
    return utils.mapOptionIds(database.options, option_ids);
  }

  getOptionById(id: string) {
    return utils.getById(database, "options", id, () => null);
  }

  async getOptionsByTeacherId(teacher_id) {
    let linksObj = await this.getWorkshopLinks(teacher_id);
    const options = database.options.filter(
      (option) => option.teacher_id === teacher_id
    );
    if (linksObj === null) {
      //We couldn't find any link on firebase
      const option_ids = options.map((option) => option.id);

      //Create an object with all the option ids as keys and empty strings as values
      linksObj = option_ids.reduce((acc, curr) => {
        acc[curr] = "";
        return acc;
      }, {});
    }
    return options.map((option) => {
      return {
        ...option,
        workshop: utils.getById(
          database,
          "workshops",
          option.workshop_id,
          () => null
        ).id,
        url: linksObj[option.id],
      };
    });
  }

  makeReservation(teacher_id: string, option_id: string, reservation: any) {
    this.post(`reservations/${teacher_id}/${option_id}.json`, reservation);
    this.post(`available/${option_id}/registered.json`, "1");
  }

  getTeacher(id: string) {
    return utils.getById(database, "teachers", id, () => null);
  }

  async getReservations(teacher_id: String) {
    const data = await this.get(`reservations/${teacher_id}.json`);
    const parse = R.compose(R.flatten, R.map(R.values), R.values);
    return parse(data);
  }

  getOption(id: string) {
    return utils.getById(database, "options", id, () => null);
  }

  async getRegistering(option_id: string): Promise<boolean> {
    const registeredObj: any = await this.get(
      `/available/${option_id}/registered.json`
    );
    if (registeredObj === null) return true;

    const registered = Object.keys(registeredObj).length;
    return Boolean(registered < 15);
  }

  saveAttendance(attendance: AttendingStudent[]) {
    const date = new Date();
    const values = attendance.map((student) => {
      return [
        `=date(${date.getFullYear()},${date.getMonth() + 1},${date.getDate()})`,
        student.codigo,
        student.nombre,
        student.apellido_paterno,
        student.apellido_materno,
        student.nivel,
        student.grupo,
        student.workshop,
        student.teacher,
        student.attended,
      ];
    });
    const range = "Attendance!A1";

    return this.context.dataSources.workshopsSheetsAPI.append(values, range);
  }

  deleteReservations(teacher: string, option_id: string) {
    this.delete(`/reservations/${teacher}/${option_id}.json`);
  }

  async getAlreadyRegistered(
    code: string,
    teacher: string,
    option_id: string
  ): Promise<boolean> {
    const reservationsObj = await this.get(
      `/reservations/${teacher}/${option_id}.json`
    );
    if (reservationsObj === null) return false;
    const reservations = Object.values(reservationsObj);
    const filteredReservations = reservations.filter(
      (reservation: any) => reservation.codigo === code
    );
    const answer = filteredReservations.length > 0;
    return answer;
  }

  async resetReservations() {
    this.delete("/reservations.json");
    this.delete("/available.json");
    return true;
  }

  getWorkshopsByCategory(category: string) {
    return utils.getById(database, "workshops", category, null);
  }

  setWorkshopLink(option_id: string, teacher_id: string, link: string) {
    this.put(
      `/system/links/${teacher_id}/${option_id}.json`,
      JSON.stringify(link)
    );
    return true;
  }

  getWorkshopLinks(teacher_id: string) {
    return this.get(`/system/links/${teacher_id}.json`);
  }
}

export { WorkshopsAPI };
