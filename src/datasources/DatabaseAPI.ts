import { ApolloError } from "apollo-server";
import { DataSource } from "apollo-datasource";
import { Workshop } from "../generated/graphql";
import { ParameterizedQuery as PQ } from "pg-promise";

export interface OptionModel {
  id: number;
  day: string;
  time: string;
  teacher_name: string;
  url: string;
  workshop_name: string;
  workshop_description: string;
  workshop_levels: number[];
  teacher_id: number;
  workshop_id: number;
  reservations: number;
}

export type StudentModel = {
  id: number;
  codigo: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  genero: string;
  carrera: string;
  ciclo: string;
  telefono: string;
  email: string;
  nivel: string;
  curso: string;
  externo: boolean;
  grupo: string;
};

type Option = Omit<
  OptionModel,
  "id" | "workshop_id" | "teacher_id" | "reservations"
> & {
  id: string;
  workshop_id: string;
  teacher_id: string;
  isTutorial: boolean;
  available: boolean;
};

const SELECT_TEACHER_INFO = `
SELECT
  id,
  name,
  json_agg(
        (
        SELECT
          json_build_object('option_id',r.option_id, 'students', json_agg(s))
        FROM reservation r
        INNER JOIN student s ON s.id=r.student_id
        WHERE r.option_id=any(teacher.option_ids)
        GROUP BY r.option_id
        )
  ) as options FROM teacher Where id=2 GROUP BY teacher.id;
`;

class DatabaseAPI extends DataSource {
  db: any;
  constructor(db: any) {
    super();
    this.db = db;
  }
  _getStudentSql(query: string, values: any[]) {
    const paramQuery = new PQ({ text: query, values });
    return this.db.any(paramQuery);
  }
  async getStudent(codigo: string) {
    const SELECT_STUDENT = `SELECT * FROM student WHERE codigo=$1`;
    if (/^[1234567890]+$/.test(codigo)) {
      const result: StudentModel[] = await this._getStudentSql(SELECT_STUDENT, [
        codigo
      ]);
      if (result.length === 0)
        throw new ApolloError("404: Alumno inexistente", "404");
      return result[0];
    } else {
      throw new ApolloError("Input wasn't a number");
    }
  }
  _getOptionsSql(query: string) {
    return this.db.many(query);
  }
  async getAllOptions(max_reservations: number): Promise<Option[]> {
    const SELECT_OPTIONS = `
    SELECT
      Option.id,
      Workshop.name as workshop_name,
      Option.day,
      Option.time,
      Teacher.name as teacher_name,
      Option.url,
      Workshop.description as workshop_description,
      Workshop.levels as workshop_levels,
      Teacher.id as teacher_id,
      Workshop.id as workshop_id,
      COUNT(Reservation.id) as reservations
    FROM Option
    INNER JOIN Teacher ON Option.teacher_id=Teacher.id
    INNER JOIN Workshop on Option.workshop_id=Workshop.id
    LEFT JOIN Reservation ON Option.id=Reservation.option_id
    GROUP BY Option.id, Workshop.id, Teacher.id
    ORDER BY Option.id;
    `;
    const options: OptionModel[] = await this._getOptionsSql(SELECT_OPTIONS);
    const mapped = options.map(option => {
      return {
        ...option,
        available: Boolean(Number(option.reservations) < max_reservations),
        isTutorial: Boolean(option.workshop_id === 4),
        id: option.id.toString(),
        workshop_id: option.workshop_id.toString(),
        teacher_id: option.teacher_id.toString()
      };
    });
    return mapped;
  }

  async getAllWorkshops(max_reservations: number): Promise<Workshop[]> {
    const options = await this.getAllOptions(max_reservations);
    const workshops: Workshop[] = [];
    options.forEach(option => {
      const { workshop_description, ...simpleOption } = option;
      const foundWorkshopIndex = workshops.findIndex(
        workshop => workshop.id === option.workshop_id
      );
      if (foundWorkshopIndex === -1) {
        const new_workshop = {
          id: option.workshop_id,
          name: option.workshop_name,
          description: option.workshop_description,
          levels: option.workshop_levels.map(level => level.toString()),
          options: [simpleOption]
        };
        workshops.push(new_workshop);
      } else {
        workshops[foundWorkshopIndex].options.push(simpleOption);
      }
    });
    return workshops;
  }
  _getStudentReservationSql(query: string, values: any[]) {
    const paramQuery = new PQ({ text: query, values });
    return this.db.any(paramQuery);
  }
  getStudentReservation(id: number) {
    const SELECT_STUDENT_RESERVATION = `
    SELECT
      r.*,
      o.day,
      o.time,
      o.url,
      o.teacher_id,
      t.name as teacher_name,
      o.workshop_id,
      w.name as workshop_name
    FROM reservation r
    INNER JOIN option o ON o.id=r.option_id
    INNER JOIN teacher t ON t.id=o.teacher_id
    INNER JOIN workshop w ON w.id=o.workshop_id
    WHERE r.student_id=$1
    `;
    return this._getStudentReservationSql(SELECT_STUDENT_RESERVATION, [id]);
  }
  async _makeReservation(query: string, values: any[]) {
    const paramQuery = new PQ({ text: query, values });
    const result = await this.db.any(paramQuery);
    return result;
  }
  _newReservation(id: number) {
    const SELECT_NEW_RESERVATION = `
    SELECT
      r.id,
      o.day,
      o.time,
      t.name as teacher_name,
      t.id as teacher_id,
      w.name as workshop_name,
      w.id as workshop_id,
      o.url
    FROM reservation r
    INNER JOIN option o ON r.option_id=o.id
    INNER JOIN teacher t ON o.teacher_id=t.id
    INNER JOIN workshop w ON o.workshop_id=w.id
    WHERE r.id=$1
    `;
    return this.db.any(new PQ({ text: SELECT_NEW_RESERVATION, values: [id] }));
  }
  async makeReservation(
    student_id: number,
    option_id: number,
    tutorial_reason?: string
  ) {
    const INSERT_RESERVATION = `
      INSERT INTO reservation (student_id, option_id, tutorial_reason) VALUES ($1,$2,$3) RETURNING id;
    `;
    const normalizedTutorialReason =
      tutorial_reason === undefined ? null : tutorial_reason;
    const reservations = await this._makeReservation(INSERT_RESERVATION, [
      student_id,
      option_id,
      normalizedTutorialReason
    ]);
    const result = await this._newReservation(reservations[0].id);
    return result;
  }
  _resetReservations(query) {
    return this.db.any(query);
  }
  async resetReservations() {
    const DELETE_RESERVATIONS = `DELETE FROM reservation`;
    try {
      this._resetReservations(DELETE_RESERVATIONS);
    } catch (e) {
      throw new ApolloError(e);
    }
    return true;
  }
}

export { DatabaseAPI };
