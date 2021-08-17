env: ClientEnv = "prod"import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import * as R from "ramda";

const ALREADY_REGISTERED = "ALREADY_REGISTERED";

class RegistroAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/registro";
  }

  async getLevelsRegistering(
    course: Course,
    env: ClientEnv = "prod"
  ): Promise<LevelsRegistering> {
    const localUrl = `${env}/registeringLevels`;
    const levels = await this.get(`${localUrl}/${course}.json`);
    if (levels === null) return [];
    return levels;
  }

  async getApplicant(codigo: string, env?: ClientEnv): Promise<Applicant> {
    const localUrl = env;
    const APPLICANT_NOT_FOUND = "APPLICANT_NOT_FOUND";
    //alreadyRegistered: {"12345678900": "E3-5"}
    const registeredGroup = await this.get(
      `${localUrl}/alreadyRegistered/${codigo}.json`
    );
    console.log("registeredGroup", registeredGroup);
    if (registeredGroup)
      throw new ApolloError(`${registeredGroup}`, ALREADY_REGISTERED);
    const applicant: Applicant = await this.get(
      `${localUrl}/applicants/${codigo}.json`
    );
    if (applicant === null)
      throw new ApolloError(
        `No applicant found with code ${codigo}`,
        APPLICANT_NOT_FOUND
      );
    return applicant;
  }

  async getSchedule(
    level: string,
    group: string,
    course: Course,
    env: ClientEnv = "prod"
  ): Promise<Schedule> {
    const localUrl = env;
    const schedule = await this.get(
      `${localUrl}/schedules/${course}/level${level}/${group}.json`
    );
    if (schedule === null)
      throw new Error(
        `We couldn't find a schedule in /${course}/level${level}/${group}.json`
      );
    return schedule;
  }

  async registerStudent(student: Student, course: Course, env: ClientEnv = "prod") {
    const localUrl = env;
    //runtime checks
    if (student.grupo === undefined) throw new Error("Group was not provided.");
    if (student.nivel === undefined) throw new Error("Level was not provided.");
    if (student.curso === undefined) throw new Error("Course was not provided");

    const registeredGroup = await this.get(
      `${localUrl}/alreadyRegistered/${student.codigo}.json`
    );
    if (registeredGroup)
      throw new ApolloError(`${registeredGroup}`, ALREADY_REGISTERED);
    this.post(
      `${localUrl}/availableGroups/${student.curso}/${student.nivel}/${student.grupo}.json`,
      "1"
    ).catch((e) => console.log("this.post Error", e));
    this.put(
      `system/alreadyRegistered/${student.codigo}.json`,
      JSON.stringify(student.grupo)
    ).catch((e) =>
      console.log("Put already registered", e.extensions.response)
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
    const range = `${student.curso.charAt(0).toUpperCase()}${student.nivel}!A1`;
    this.context.dataSources.registroSheetsAPI
      .append(values, range)
      .then(() => "Saved student to sheets successfully!")
      .catch((e) => console.log("registriSheets Error", e));

    const schedule = await this.getSchedule(
      student.nivel,
      student.grupo,
      course,
      env
    );
    const composedStudent: RegisterResponse = { ...student, schedule };

    return composedStudent;
  }

  async setLevelsRegistering(levels: Level[], course: Course, env: ClientEnv = "prod") {
    const localUrl = env;
    this.put(`${localUrl}/registeringLevels/${course}.json`, levels);
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
      `system/availableGroups/${course}/level${level}.json`
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
      `system/schedules/${course}/level${level}.json`
    );
    if (schedulesObj === null)
      throw new Error(`There are no schedules in /${course}/level${level}`);
    const data: Schedule[] = Object.values(schedulesObj);
    return data;
  }

  async getRegistered(level: string, course: Course) {
    return this.get(`students/${course}/level${level}.json`);
  }
}

export { RegistroAPI };
