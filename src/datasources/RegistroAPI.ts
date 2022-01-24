import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import { ApplicantModel, ScheduleModel } from "../modules/registro/models";
import { StudentInput, ApplicantInput } from "../generated/graphql";
import * as R from "ramda";

const ALREADY_REGISTERED = "ALREADY_REGISTERED";

class RegistroAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/registro";
  }

  async getLevelsRegistering(course: string): Promise<string[]> {
    const localUrl = `${
      this.context.enviroment ? this.context.enviroment : "prod"
    }/registeringLevels`;
    const levels = await this.get(`${localUrl}/${course}.json`);
    if (levels === null) return [];
    return levels;
  }

  async getApplicant(codigo: string): Promise<ApplicantModel> {
    const localUrl = this.context.enviroment;
    const APPLICANT_NOT_FOUND = "APPLICANT_NOT_FOUND";
    //alreadyRegistered: {"12345678900": "E3-5"}
    const applicant: ApplicantModel = await this.get(
      `${localUrl}/applicants/${codigo}.json`
    );
    if (applicant === null)
      throw new ApolloError(
        `No applicant found with code ${codigo}`,
        APPLICANT_NOT_FOUND
      );
    return applicant;
  }

  async saveApplicant(
    codigo: string,
    applicant: ApplicantInput
  ): Promise<ApplicantModel> {
    await this.put(
      `${this.context.enviroment}/applicants/${codigo}.json`,
      applicant
    );
    return applicant as ApplicantModel;
  }

  async getSchedule(level: string, group: string, course: string) {
    const localUrl = this.context.enviroment;
    const schedule: ScheduleModel = await this.get(
      `${localUrl}/schedules/${course}/level${level}/${group}.json`
    );
    if (schedule === null)
      throw new Error(
        `We couldn't find a schedule in /${course}/level${level}/${group}.json`
      );
    return schedule;
  }

  async registerStudent(student: StudentInput, course: string) {
    const localUrl = this.context.enviroment;
    //runtime checks
    if (student.grupo === undefined) throw new Error("Group was not provided.");
    if (student.nivel === undefined) throw new Error("Level was not provided.");
    if (student.curso === undefined) throw new Error("Course was not provided");

    const registeredGroup = await this.getAlreadyRegistered(student.codigo);
    if (registeredGroup)
      throw new ApolloError(`${registeredGroup}`, ALREADY_REGISTERED);
    this.post(
      `${localUrl}/availableGroups/${student.curso}/level${student.nivel}/${student.grupo}.json`,
      "1"
    ).catch((e) => console.log("this.post Error", e));
    this.setAlreadyRegistered(student.codigo, student.grupo);

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
      student.institucionalEmail,
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
      course
    );
    const composedStudent = { ...student, schedule };

    return composedStudent;
  }

  async setLevelsRegistering(levels: string[], course: string) {
    const localUrl = this.context.enviroment;
    this.put(`${localUrl}/registeringLevels/${course}.json`, levels);
    return levels;
  }

  async getUnAvailableGroups(
    level: string,
    maxStudents: number,
    course: string
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
      `${this.context.enviroment}/availableGroups/${course}/level${level}.json`
    );

    if (groupsCounter === null) return [];

    return Object.keys(
      R.filter((group: any) => Object.keys(group).length >= maxStudents)(
        groupsCounter
      )
    );
  }

  async getSchedules(level: string, course: string) {
    const schedulesObj = await this.get(
      `${this.context.enviroment}/schedules/${course}/level${level}.json`
    );
    if (schedulesObj === null)
      throw new Error(`There are no schedules in /${course}/level${level}`);
    const data: ScheduleModel[] = Object.values(schedulesObj);
    return data;
  }

  getRegistered(level: string, course: string) {
    this.get(`students/${course}/level${level}.json`);
  }

  getAlreadyRegistered(codigo: string): Promise<string | null> {
    return this.get(
      `${this.context.enviroment}/alreadyRegistered/${codigo}.json`
    );
  }
  setAlreadyRegistered(codigo: string, grupo: string) {
    this.put(
      `${this.context.enviroment}/alreadyRegistered/${codigo}.json`,
      JSON.stringify(grupo)
    ).catch((e) =>
      console.log("Put already registered", e.extensions.response)
    );
  }
}

export { RegistroAPI };
