import { RESTDataSource } from "apollo-datasource-rest";
import { ApolloError } from "apollo-server";
import { StudentInput, ApplicantInput, Applicant } from "../generated/graphql";
import * as R from "ramda";
import {
  PrismaClient,
  Group,
  Student,
  Applicant as PrismaApplicant,
} from "@prisma/client";

import { serializeNumberId, deSeralizeNumberId } from "../utils";

function convertToIdString(id: number, prepend: string): string {
  return prepend + "_" + id.toString();
}

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

  async getUnenrolledStudent(
    codigo: string,
    ciclo_actual: string
  ): Promise<Student & { applicant: PrismaApplicant }> {
    if (codigo === null)
      throw new Error(
        "Codigo not provided on registroAPI.getUnenrolledStudent"
      );
    if (ciclo_actual === null)
      throw new Error(
        "ciclo_actual not provided on registroAPI.getUnenrolledStudent"
      );

    const student = await this.prisma.student.findFirst({
      where: {
        codigo: codigo,
        cicloActual: ciclo_actual,
      },
      include: {
        applicant: true,
      },
    });
    return student;
  }

  async getLevelsRegistering(course: string): Promise<string[]> {
    const levels = await this.get(`/system/registeringLevels/${course}.json`);
    if (levels === null) return [];
    return levels;
  }

  async getApplicant(codigo: string, ciclo: string) {
    const res = await this.prisma.student.findFirst({
      where: {
        cicloActual: ciclo,
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
        cicloActual: ciclo,
        codigo,
      },
      include: {
        groupObject: {
          include: {
            teacher: true,
          },
        },
      },
    });
    if (res === null) return null;
    return res.groupObject;
  }

  async saveApplicant(
    codigo: string,
    applicant: ApplicantInput
  ): Promise<
    Omit<Applicant, "curso" | "groups" | "nivel" | "registering"> | Applicant
  > {
    const newApplicant = await this.prisma.applicant.create({
      data: applicant,
    });

    const newId = convertToIdString(newApplicant.id, "applicant");

    return {
      ...newApplicant,
      id: newId,
    };
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
    const response =
      await this.prisma.student
        .findFirst({
          where: {
            codigo: student.codigo,
            cicloActual: "2023B",
          },
          include: {
            groupObject: {
              include: {
                teacher: true,
              },
            },
          },
        });

        const { groupObject: registeredGroup, id: currentStudentId } = response;

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

  async getSchedules(
    level: number,
    course: string,
    maxStudents: number,
    ciclo_actual: string
  ) {
    return this.prisma.group.findMany({
      include: {
        teacher: true,
      },
      where: {
        ciclo: ciclo_actual,
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
