import { RESTDataSource } from "apollo-datasource-rest";
import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server";

type Maybe<T> = T | null;

class WorkshopsAPI extends RESTDataSource {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    super();
    if (prisma === undefined)
      throw new Error("Must include a new PrismaClient() on constrctor");
    this.prisma = prisma;
    this.baseURL = "https://filex-5726c.firebaseio.com/workshops/";
    if (process.env.NODE_ENV === "test") this.initialize({} as any);
  }

  getTodaysDate(): Date {
    return new Date();
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

  getTeacher(id: number) {
    return this.prisma.teacher.findUnique({
      where: {
        id,
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

  async getReservationsByOptionId(option_id: number) {
    const openDate = await this.getOpenDate();
    const reservations = await this.prisma.workshopReservation.findMany({
      where: {
        option_id: option_id,
        create_time: {
          gte: new Date(openDate),
        },
      },
      include: {
        student: {
          include: {
            groupObject: true,
            applicant: true,
          },
        },
        option: true,
      },
    });

    if (reservations === null) return [];

    return reservations;
  }

  async getReservationCount(student_id: number) {
    return this.prisma.workshopReservation.count({
      where: {
        student_id: Number(student_id),
      },
    });
  }

  async getOptionReservationCount(option_id: number) {
    const openDate = await this.getOpenDate();

    return this.prisma.workshopReservation.count({
      where: {
        option_id: option_id,
        create_time: {
          gte: new Date(openDate),
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
    const hashId = (id: number, prepend: string): string =>
      `${[prepend]}_${id}`;

    const openDateStr = await this.getOpenDate();
    const reservations = await this.prisma.workshopReservation.findMany({
      where: {
        option: {
          teacher_id: teacherId,
          id: optionId,
        },
        create_time: {
          gt: new Date(openDateStr),
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

    return reservations.map((reservation) => ({
      ...reservation,
      id: hashId(reservation.id, "res"),
    }));
  }

  async getTeacherOptions(teacherId: number) {
    return this.prisma.workshopOption.findMany({
      include: {
        workshop: true,
      },
      where: {
        teacher_id: teacherId,
      },
    });
  }

  async getStudentReservation(studentId: number) {
    const openDateString = await this.getOpenDate();
    const reservation = await this.prisma.workshopReservation.findFirst({
      where: {
        student_id: studentId,
        create_time: {
          gte: new Date(openDateString),
        },
      },
      include: {
        student: true,
        option: {
          include: {
            workshop: true,
            teacher: true,
          },
        },
      },
    });
    if (!reservation) return null;
    return { ...reservation, id: String(reservation.id) };
  }

  async makeReservation(student_id: number, option_id: number) {
    if (!student_id)
      throw new Error(
        "No student_id provided to make a reservation on workshopsAPI.makeReservation"
      );
    if (!option_id)
      throw new Error(
        "No option_id provided to make a reservation on workshopsAPI.makeReservation"
      );
    const currentReservation = await this.getStudentReservation(student_id);
    if (currentReservation)
      throw new ApolloError("Student already has a reservation", "409");
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
            workshop: true,
          },
        },
      },
    });
    return { ...reservation, id: String(reservation.id) };
  }

  async resetReservations() {
    const now = await this.getTodaysDate();
    const nowString = now.toISOString();
    await this.put("system/openDate.json", { result: nowString });
    return true;
  }

  async getOpenDate(): Promise<string> {
    const openDate = await this.get("system/openDate.json");
    const dateString = openDate.result;
    return dateString;
  }

  async saveAttendance(
    attendance: { attended: boolean; id: number }[]
  ) {
    const reservation_ids = attendance
      .filter((student) => student.attended)
      .map((student) => student.id);
    const modified = await this.prisma.workshopReservation.updateMany({
      where: {
        id: {
          in: reservation_ids,
        },
      },
      data: {
        attended: true,
      },
    });
    return modified.count > 0;
  }

  async getMaxStudentReservations() {
    const result = await this.get(`system.json`);
    return result.max_reservations;
  }

  async getReservationLimit(): Promise<number> {
    return this.get("/reservationLimit.json");
  }

  async setWorkshopLink(option_id, url) {
    const todayISOString = (await this.getTodaysDate()).toISOString();
    return this.put("system/openDate.json", {
      result: todayISOString,
    });
  }
}

export { WorkshopsAPI };
