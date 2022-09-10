import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import { StudentInput, ApplicantInput } from "../generated/graphql";
import * as R from "ramda";
import { PrismaClient, Group } from "@prisma/client";

const ALREADY_REGISTERED = "ALREADY_REGISTERED";

class RegistroAPI extends RESTDataSource {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient, db: any) {
    super();
    if (prisma === undefined) {
      throw Error("Supply a new PrismaCLient() on constructor");
    }
    this.prisma = prisma;
    this.baseURL = "https://filex-5726c.firebaseio.com/registro";
  }

  async getLevelsRegistering(course: string): Promise<string[]> {
    const levels = await this.get(`/system/registeringLevels/${course}.json`);
    if (levels === null) return [];
    return levels;
  }

  async getApplicant(codigo: string, ciclo: string) {
    const res = await this.prisma.student.findFirst({
      where: {
        ciclo_actual: ciclo,
        codigo: codigo,
      },
      include: {
        applicant: true,
      },
    });
    return { ...res, ...res.applicant };
  }

  async getAlreadyRegistered(codigo: string, ciclo: string) {
    const res = await this.prisma.student.findFirst({
      where: {
        ciclo_actual: ciclo,
        codigo,
      },
      include: {
        groupObject: {
          include: {
            teacher: true
          }
        },
      },
    });
    return res.groupObject;
  }

  async saveApplicant(codigo: string, applicant: ApplicantInput) {
    await this.put(
      `${this.context.enviroment}/applicants/${codigo}.json`,
      applicant
    );
    return applicant;
  }

  async getSchedule(id: number) {
    return this.prisma.group.findFirst({
      where: {
        id: id,
      },
      include: {
        teacher: true,
      },
    });
  }

  async registerStudent(student: StudentInput, groupId: number) {
    const { groupObject: registeredGroup, id: currentStudentId } =
      await this.prisma.student.findFirst({
        where: {
          codigo: student.codigo,
          ciclo_actual: "2022B",
        },
        include: {
          groupObject: {
            include: {
              teacher: true,
            },
          },
        },
      });

    if (registeredGroup)
      throw new ApolloError(`${registeredGroup.name}`, ALREADY_REGISTERED);

    const finalGroup = await this.incrementStudentCountOnGroup(groupId);

    return this.prisma.student.update({
      data: { groupId: finalGroup.id },
      where: { id: currentStudentId },
      include: {
        applicant: true,
        groupObject: {
          include: {
            teacher: true,
          },
        },
      },
    });
  }

  async setLevelsRegistering(levels: string[], course: string) {
    const localUrl = this.context.enviroment;
    this.put(`system/registeringLevels/${course}.json`, levels);
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

  async getSchedules(level: number, course: string, maxStudents: number) {
    return this.prisma.group.findMany({
      include: {
        teacher: true
      },
      where: {
        ciclo: "2022B",
        nivel: level,
        course: course,
        registrados: {
          lt: maxStudents,
        },
      },
    });
  }

  async incrementStudentCountOnGroup(groupId: number) {
    return this.prisma.group.update({
      data: {
        registrados: {
          increment: 1,
        },
      },
      where: {
        id: groupId,
      },
    });
  }
}

export { RegistroAPI };
