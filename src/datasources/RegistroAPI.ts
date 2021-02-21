import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";

class RegistroAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/registro";
  }

  async getLevelsRegistering() {
    return this.get(`system/registeringLevels.json`);
  }

  async setLevelsRegistering(levels: string[]) {
    return this.put(`system/registeringLevels.json`, levels);
  }

  async getUnAvailableGroups(level: string, maxStudents: number) {
    /*
    /availableGroups/4.json
    {
      "4-1": {
        "-IDa": "1",
        "-IDb": "1",
      },
      "4-2": {
        "-IDc": "1",
        "-IDd": "1",
      }
    }
    */
    const groupsCounter = await this.get(
      `system/availableGroups/${level}.json`
    );

    if (groupsCounter === null) return [];

    return Object.keys(
      R.filter((group: any) => Object.keys(group).length >= maxStudents)(
        groupsCounter
      )
    );
  }

  async getSchedules(level: string) {
    const schedulesObj = await this.get(`system/schedules/${level}.json`);
    if (schedulesObj === null)
      throw new Error(`Missing level schedules in firebase: Level ${level}`);
    const objToArray = (obj: any) => Object.keys(obj).map((key) => obj[key]);
    const data = objToArray(schedulesObj);
    return data;
  }

  async getSchedule(level: string, group: string) {
    return this.get(`system/schedules/${level}/${group}.json`);
  }

  async registerStudent(student: Student, level: string, group: string) {
    const alreadyRegistered = await this.get(
      `system/alreadyRegistered/${student.codigo}`
    );
    if (alreadyRegistered) throw new Error("Ya estas registrado.");

    if (group === undefined) throw new Error("Group was not provided.");
    if (level === undefined) throw new Error("Level was not provided.");

    this.post(`system/availableGroups/${level}/${group}.json`, "1");
    this.put(`system/alreadyRegistered/${student.codigo}`, "true");

    /*
    this.put(
      `students/${level}/${group}/${student.codigo}.json`,
      new Object({ ...student })
    );
    */

    const parsedStudent = [
      student.codigo,
      student.nombre,
      student.apellido_paterno,
      student.apellido_materno,
      student.genero,
      student.ciclo,
      student.carrera,
      student.telefono,
      student.email,
      student.nivel,
      student.grupo,
      student.externo,
    ];
    const values = [parsedStudent];
    const range = `Level ${level}!A1`;
    this.context.dataSources.registroSheetsAPI
      .append(values, range)
      .then(() => "Saved student to sheets successfully!");

    const schedule = await this.getSchedule(level, group);
    const composedStudent = { ...student, schedule };

    return composedStudent;
  }

  async getRegistered(level: string) {
    return this.get(`students/${level}.json`);
  }

  async getApplicant(codigo: string) {
    return this.get(`applicants/${codigo}.json`);
  }
}

export { RegistroAPI };
