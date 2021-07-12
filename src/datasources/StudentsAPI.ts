import { RESTDataSource } from "apollo-datasource-rest";

export type GetStudentFn = (codigo: string, env?: 'dev'|'prod') => Promise<any>;

class StudentsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://filex-5726c.firebaseio.com/students";
  }

  async _get(url: string, env:string|undefined) {
    const finalUrl = env ? '/'+env+url : '/prod'+url;
    return this.get(finalUrl);
  }

  async getStudent(...[codigo, env]: Parameters<GetStudentFn>) {
    return this.get(`/${env}/${codigo}.json`);
  }
}

export { StudentsAPI };
