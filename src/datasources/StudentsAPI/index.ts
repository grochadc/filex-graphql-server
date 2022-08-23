import { DataSource } from "apollo-datasource";
import { StudentModel } from "../../modules/workshops/models";
import { ParameterizedQuery as PQ } from "pg-promise";
import { ApolloError } from "apollo-server";
import { PrismaClient } from "@prisma/client";

type StudentInput = Omit<StudentModel, "id">;
type Changes = Partial<StudentInput>;

class StudentsAPI extends DataSource {
  db: any;
  prisma: PrismaClient;
  constructor(db: any, prisma: PrismaClient) {
    super();
    if (prisma === undefined)
      throw new Error("Include a new PrismaCLient() on constructor");
    this.prisma = prisma;
    this.db = db;
  }

  async getAllStudents(ciclo: string) {
    const result = await this.prisma.student.findMany({
      include: {
        group: true,
        applicant: true,
      },
      where: {
        ciclo,
        groupId: {
          not: null
        },
        applicantId: {
          gt: 100
        }
      },
    });

    if (result === null)
      throw new Error(`No students found for ciclo ${ciclo}`);

    return result.map((el) => ({
      ...el,
      ...el.applicant,
      grupo: el.group.name,
      nivel: String(el.nivel),
    }));
  }

  async getStudent(codigo: string): Promise<StudentModel> {
    const result = await this.db.oneOrNone(
      new PQ({ text: GET_STUDENT, values: [codigo] })
    );
    if (result) {
      return result;
    } else {
      throw new ApolloError("404: Alumno inexistente", "404");
    }
  }

  async addStudent(student: StudentInput) {
    const addedStudent = await this.db.one(
      new PQ({
        text: ADD_STUDENT,
        values: [
          student.codigo,
          student.nombre,
          student.apellido_materno,
          student.apellido_paterno,
          student.genero,
          student.carrera,
          student.ciclo,
          student.telefono,
          student.email,
          student.nivel,
          student.grupo,
          student.externo,
          student.curso,
        ],
      })
    );
    return { id: addedStudent.id, ...student };
  }

  async editStudent(codigo: string, changes: Changes) {
    const oldStudent = await this.getStudent(codigo);
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
