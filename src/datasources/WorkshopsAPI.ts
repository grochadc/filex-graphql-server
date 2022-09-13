import { RESTDataSource } from "apollo-datasource-rest";
import * as R from "ramda";
import * as utils from "../utils";
import database, { Option } from "./db";
import { Workshop, AttendingStudent } from "../generated/graphql";
import {
  WorkshopModel,
  TeacherModel,
  OptionModel,
  StudentReservationModel,
  TeacherReservationModel,
  DatabaseModel,
} from "../modules/workshops/models";
import { PrismaClient } from "@prisma/client";

type Maybe<T> = T | null;

class WorkshopsAPI extends RESTDataSource {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    super();
    if (prisma === undefined)
      throw new Error("Must include a new PrismaClient() on constrctor");
    this.prisma = prisma;
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops/";
  }

  async isOpen(): Promise<boolean> {
    const open = await this.get(
      `${this.context.enviroment}/system/isOpen/result.json`
    );
    return open ? open : false;
  }

  async toggleOpen(): Promise<boolean> {
    const open = await this.isOpen();
    await this.put(`${this.context.enviroment}/system/isOpen.json`, {
      result: !open,
    });
    return !open;
  }

  async getWorkshops(): Promise<WorkshopModel[]> {
    const workshops = await this.get(
      `${this.context.enviroment}/workshops.json`
    );
    if (workshops === null)
      throw new Error(
        `${this.context.enviroment}/workshops.json returned null`
      );
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

  getTeacher(id: string) {
    return this.prisma.teacher.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async getAllTeachers() {
    return this.prisma.teacher.findMany({
      include: {
        options: {
          include: {
            workshop: true,
          },
        },
      },
    });
  }

  async getReservationCount(student_id: string) {
    return this.prisma.workshopReservation.count({
      where: {
        student_id: Number(student_id),
      },
    });
  }

  async getOptionReservationCount(option_id: string) {
    const todayDate = new Date();
    const oneWeekAgo = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      todayDate.getDate() - 7
    );

    return this.prisma.workshopReservation.count({
      where: {
        option_id: Number(option_id),
        create_time: {
          gt: oneWeekAgo,
        },
      },
    });
  }

  async getAllOptions(max_students: number) {
    return this.prisma.workshopOption.findMany();
  }

  async getAllWorkshops(max_students: number) {
    return this.prisma.workshop.findMany({
      include: {
        options: {
          include: {
            teacher: true,
          },
        },
      },
    });
  }

  async getTeacherReservations(teacherId: number, optionId: number) {
    return this.prisma.workshopReservation.findMany({
      where: {
        option: {
          teacher_id: teacherId,
          id: optionId
        },
      },
      include: {
        option: true,
        student: {
          include: {
            applicant: true,
            groupObject: true,
          },
        },
      },
    });
  }

  async getTeacherOptions(teacherId: string) {
    return this.prisma.workshopOption.findMany({
      include: {
        workshop: true,
      },
      where: {
        teacher_id: Number(teacherId),
      },
    });
  }

  async getStudentReservation(studentId: string) {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const reservation = await this.prisma.workshopReservation.findFirst({
      where: {
        student_id: Number(studentId),
        create_time: {
          gt: lastWeek,
        },
      },
      include: {
        student: true,
        option: {
          include: {
            workshop: true,
            teacher: true,
          }
        },
      },
    });
    if(!reservation) return null;
    return {...reservation, id: String(reservation.id)}
  }

  async makeReservation(student_id: string, option_id: string) {
    const reservation = await this.prisma.workshopReservation.create({
      data: {
        student_id: Number(student_id),
        option_id: Number(option_id),
      },
      include: {
        student: true,
        option: {
          include: {
            teacher: true,
            workshop: true
          }
        },
      },
    });
    return {...reservation, id: String(reservation.id)}
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

  async saveAttendance(attendance: AttendingStudent[], ) {
    const ids = attendance.filter((student) => student.attended).map(student => Number(student.id));
    const modified = await this.prisma.workshopReservation.updateMany({
      where: {
        id: {
          in: ids
        }
      },
      data: {
        attended: true
      }
    })
    return modified.count>0;
  }

  setWorkshopLink(option_id: string, url: string) {
    this.put(`${this.context.enviroment}/options/${option_id}/url.json`, url);
    return true;
  }

  async getMaxStudentReservations() {
    const result = await this.get(`system.json`);
    return result.max_reservations;
  }

  async getReservationLimit(): Promise<number> {
    return this.get("/reservationLimit.json");
  }
}

export { WorkshopsAPI };
