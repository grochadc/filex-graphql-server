import { RESTDataSource } from "apollo-datasource-rest";

import { RegistroAPI } from "./RegistroAPI";

const registroAPI = new RegistroAPI();

class StudentsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/students";
  }

  async getStudent(codigo: string) {
    return this.get(`/${codigo}.json`);
  }
}

export { StudentsAPI };
