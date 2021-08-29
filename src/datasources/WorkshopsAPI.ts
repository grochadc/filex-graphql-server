import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";
import * as utils from "../utils";
import database, { Option } from "./db";
import { Workshop } from "../generated/graphql";
import {
  WorkshopModel,
  TeacherModel,
  OptionModel,
  StudentReservationModel,
  TeacherReservationModel,
  DatabaseModel
} from "../modules/workshops/models";

type Maybe<T> = T | null;

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
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops";
  }

  async getWorkshops(): Promise<WorkshopModel[]> {
    const workshops = (await this.get(
      `${this.context.enviroment}/workshops.json`
    )) as DatabaseModel["workshops"];
    return Object.values(workshops);
  }

  async getOptions(): Promise<DatabaseModel["options"]> {
    return (await this.get(
      `${this.context.enviroment}/options.json`
    )) as DatabaseModel["options"];
  }

  getAvailableOptions(): Promise<Maybe<DatabaseModel["availableOptions"]>> {
    return this.get(
      `${this.context.enviroment}/availableOptions.json`
    ) as Promise<Maybe<DatabaseModel["availableOptions"]>>;
  }

  getTeacher(id: string): Promise<TeacherModel> {
    return this.get(`${this.context.enviroment}/teachers/${id}.json`);
  }

  getStudentReservation(codigo: string): Promise<StudentReservationModel> {
    return this.get(
      `/${this.context.enviroment}/studentsReservations/${codigo}.json`
    );
  }

  async makeReservation(codigo: string, teacher_id: string, option_id: string) {
    const option = await this.getOptionById(option_id);
    const student = await this.context.dataSources.studentsAPI.getStudent(
      codigo
    );
    const {
      nombre,
      apellido_paterno,
      apellido_materno,
      nivel,
      grupo
    } = student;
    const teacherReservation: TeacherReservationModel = {
      codigo: student.codigo,
      nombre,
      apellido_paterno,
      apellido_materno,
      nivel,
      grupo,
      option_id: option.id,
      option_name: "why? option_name from makeReservation dataSource",
      workshop_id: option.workshop_id,
      workshop_name: option.workshop_name
    };
    this.post(
      `${this.context.enviroment}/teachers/${teacher_id}/raw_reservations/${option_id}.json`,
      teacherReservation
    );
    this.put(`${this.context.enviroment}/studentsReservations/${codigo}.json`, {
      option_id: option_id
    });

    //enqueue
    const availableNumber = await this.get(
      `${this.context.enviroment}/availableOptions/${option_id}.json`
    );
    this.put(
      `${this.context.enviroment}/availableOptions/${option_id}.json`,
      availableNumber + 1
    );

    return { ...option, option_id: option.id };
  }

  deleteReservations(teacher_id: string, option_id: string) {
    return this.delete(
      `${this.context.enviroment}/teachers/${teacher_id}/raw_reservations/${option_id}.json`
    );
  }

  async resetReservations() {
    await this.delete(`${this.context.enviroment}/studentsReservations.json`);
    await this.delete(`${this.context.enviroment}/availableOptions.json`);
    return true;
  }

  getOptionById(id: string): Promise<OptionModel> {
    return this.get(`${this.context.enviroment}/options/${id}.json`);
  }

  async saveAttendance(attendance: AttendingStudent[]) {
    const date = new Date();
    const values = attendance.map(student => {
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
        student.attended
      ];
    });
    const range = "Attendance!A1";

    try {
      await this.context.dataSources.workshopsSheetsAPI.append(values, range);
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  setWorkshopLink(option_id: string, url: string) {
    this.put(`${this.context.enviroment}/options/${option_id}/url.json`, url);
    return true;
  }
}

export { WorkshopsAPI };
