import { RESTDataSource } from "apollo-datasource-rest";
import { StudentModel } from "../modules/workshops/models";
import { ApolloError } from "apollo-server-errors";

class StudentsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/students";
  }

  async getStudent(codigo: string): Promise<StudentModel> {
    const student = await this.get(`${this.context.enviroment}/${codigo}.json`);
    if (student === null)
      throw new ApolloError(
        "No se encontró ese codigo de alumno en la base de datos.",
        "STUDENT_NOT_FOUND"
      );
    return student;
  }
}

export { StudentsAPI };
