import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";

enum Course {
  en = "en",
  fr = "fr",
}

class RegistroAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/registro";
  }

  async getLevelsRegistering(course: Course) {
    const levels = await this.get(`system/registeringLevels/${course}.json`);
    if (levels === null) return [];
    return levels;
  }

  async setLevelsRegistering(levels: number[], course: Course) {
    this.put(`system/registeringLevels/${course}.json`, levels);
    return levels;
  }

  async getUnAvailableGroups(
    level: string,
    maxStudents: number,
    course: Course
  ) {
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
      `system/availableGroups/${course}/${level}.json`
    );

    if (groupsCounter === null) return [];

    return Object.keys(
      R.filter((group: any) => Object.keys(group).length >= maxStudents)(
        groupsCounter
      )
    );
  }

  async getSchedules(level: string, course: Course) {
    const schedulesObj = await this.get(
      `system/schedules/${course}/${level}.json`
    );
    if (schedulesObj === null)
      throw new Error(`There are no schedules in /${course}/${level}`);
    const objToArray = (obj) => Object.keys(obj).map((key) => obj[key]);
    const data = objToArray(schedulesObj);
    return data;
  }

  async getSchedule(level: string, group: string, course: Course) {
    return this.get(`system/schedules/${course}/${level}/${group}.json`);
  }

  async registerStudent(
    student: Student,
    level: string,
    group: string,
    course: Course
  ) {
    if (group === undefined) throw new Error("Group was not provided.");
    if (level === undefined) throw new Error("Level was not provided.");
    await this.post(
      `system/availableGroups/${course}/${level}/${group}.json`,
      "1"
    );

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
    const range = `${student.curso.charAt(0).toUpperCase()}${level}!A1`;
    this.context.dataSources.registroSheetsAPI
      .append(values, range)
      .then(() => "Saved student to sheets successfully!");

    const schedule = await this.getSchedule(level, group, course);
    const composedStudent = { ...student, schedule };

    return composedStudent;
  }

  async getRegistered(level: string, course: Course) {
    return this.get(`students/${course}/${level}.json`);
  }

  async getApplicant(codigo: string) {
    return this.get(`applicants/${codigo}.json`);
  }
}

export { RegistroAPI };
