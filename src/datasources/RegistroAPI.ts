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
      R.filter((item) => Object.keys(item).length >= maxStudents)(groupsCounter)
    );
  }

  async getSchedules(level) {
    const schedulesObj = await this.get(`system/schedules/${level}.json`);
    const objToArray = (obj) => Object.keys(obj).map((key) => obj[key]);
    const data = objToArray(schedulesObj);
    return data;
  }

  async getSchedule(level, group) {
    return this.get(`system/schedules/${level}/${group}.json`);
  }

  async registerStudent(student, level, group) {
    if (group === undefined) throw new Error("Group was not provided.");
    if (level === undefined) throw new Error("Level was not provided.");
    await this.post(`system/availableGroups/${level}/${group}.json`, "1");
    return this.put(
      `students/${level}/${group}/${student.codigo}.json`,
      new Object({ ...student })
    );
  }

  async getRegistered(level) {
    return this.get(`students/${level}.json`);
  }

  async getApplicant(codigo) {
    return this.get(`applicants/${codigo}.json`);
  }
}

export { RegistroAPI };
