import { DataSource } from "apollo-datasource";
import { StudentModel } from "../../modules/workshops/models";
import { ParameterizedQuery as PQ } from "pg-promise";
import { ApolloError } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import {
  StudentInput,
  ApplicantInput,
  Applicant,
} from "../../generated/graphql";

type MyStudentInput = Omit<StudentModel, "id">;
type Changes = Partial<MyStudentInput>;

class StudentsAPI extends DataSource {
  db: any;
  prisma: PrismaClient;
  constructor(db: any, prisma: PrismaClient) {
    super();
    if (prisma === undefined)
      throw new Error("Include a new PrismaCLient() on constructor");
    this.prisma = prisma;
    this.db = db;
    if (prisma === undefined) {
      throw Error("Supply a new PrismaCLient() on constructor");
    }
    this.prisma = prisma;
  }

  async getAllStudents(cicloActual: string) {
    const students = await this.prisma.student.findMany({
      where: {
        cicloActual: cicloActual,
        groupId: {
          not: null
        }
      },
      include: {
        applicant: true,
        groupObject: {
          include: {
            teacher: true,
          },
        },
      },
    });

    return students;
  }

  async getStudent(codigo: string, cicloActual: string) {
    if (codigo === null)
      throw new Error("Codigo not provided on studentsAPI.getStudent");
    if (cicloActual === null)
      throw new Error("ciclo_actual not provided on studentsAPI.getStudent");
    const student = await this.prisma.student.findFirst({
      include: {
        applicant: true,
        groupObject: true,
      },
      where: {
        codigo,
        cicloActual,
      },
    });
    if (student === null) throw new Error("Student not found on database");
    if (student.applicant == null)
      throw new Error("Applicant info is missing on database");
    if (student.groupObject == null)
      throw new Error("Couldnt find a group Object");

    return student;
  }

  async addApplicant(
    applicant: ApplicantInput
  ): Promise<Omit<Applicant, "curso" | "groups" | "nivel" | "registering">> {
    const result = await this.prisma.applicant.create({
      data: applicant,
    });

    return {
      ...result,
      id: String(result.id),
    };
  }

  async addStudent(student: StudentInput) {
    const applicant = await this.prisma.applicant.findFirst({
      where: {
        codigo: student.codigo,
      },
    });

    if (applicant === null)
      throw new Error(
        "No applicant found on database. Please submit the student's personal information on the Applicant endpoint first."
      );

    const groupObj = await this.prisma.group.findFirst({
      where: {
        name: student.grupo,
        ciclo: student.cicloActual,
      },
    });
    return Promise.resolve();
    /*
    return this.prisma.student.create({
      data: {
        applicant: { connect: {id: applicant.id} },
        codigo: student.codigo,
        curso: student.curso,
        groupObject: { connect: { id: groupObj.id } },
        ciclo_actual: student.cicloActual,
        nivel: student.nivel
      }
    })
    */
  }

  async editStudent(codigo: string, changes: Changes, ciclo: string) {
    const oldStudent = await this.getStudent(codigo, ciclo);
    const newStudent = Object.assign(oldStudent, changes);
    try {
      this.db.none(
        new PQ({
          text: EDIT_STUDENT,
          values: [
            newStudent.codigo,
            newStudent.nombre,
            newStudent.apellido_materno,
            newStudent.apellido_paterno,
            newStudent.genero,
            newStudent.carrera,
            newStudent.ciclo,
            newStudent.telefono,
            newStudent.email,
            newStudent.nivel,
            newStudent.grupo,
            newStudent.externo,
            newStudent.curso,
            newStudent.id,
          ],
        })
      );
    } catch (e) {
      console.error(e);
    }
    return newStudent;
  }
}

export const GET_STUDENT = `
  SELECT * FROM Student WHERE codigo=$1
`;

export const ADD_STUDENT = `
  INSERT INTO Student (
    codigo,
    nombre,
    apellido_materno,
    apellido_paterno,
    genero,
    carrera,
    ciclo,
    telefono,
    email,
    nivel,
    grupo,
    externo,
    curso
  ) values (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $11,
    $12,
    $13
  )
  RETURNING id
`;

export const EDIT_STUDENT = `
  UPDATE Student SET
  codigo=$1,
  nombre= $2,
  apellido_materno= $3,
  apellido_paterno= $4,
  genero= $5,
  carrera= $6,
  ciclo= $7,
  telefono= $8,
  email= $9,
  nivel= $10,
  grupo= $11,
  externo= $12,
  curso= $13
  WHERE id=$14
`;

export { StudentsAPI };
