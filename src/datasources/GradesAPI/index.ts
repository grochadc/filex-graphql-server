import { DataSource } from "apollo-datasource";
import { PrismaClient } from "@prisma/client";

const _prisma = new PrismaClient();

type GradeRow = {
  codigo: string;
  finalGrade: string;
  situacion: string;
};

export class GradesAPI extends DataSource {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    super();
    if (prisma === undefined)
      throw new Error("Include a new PrismaCLient() on constructor");
    this.prisma = _prisma;
  }

  async postGrades(
    grades: GradeRow[],
    ciclo: string,
    curso: string
  ): Promise<any> {
    const queries = grades.map((el) =>
      this.prisma.student.update({
        where: {
          codigoCicloCursoID: {
            codigo: el.codigo,
            ciclo_actual: ciclo,
            curso,
          },
        },
        data: {
          finalGrade: el.finalGrade,
          situacion: el.situacion,
        },
      })
    );
    return this.prisma.$transaction(queries);
  }
}
