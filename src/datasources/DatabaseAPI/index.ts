import { ApolloError } from "apollo-server";
import { DataSource } from "apollo-datasource";
import { Workshop, Teacher, TeacherOption } from "../../generated/graphql";
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

export const SELECT_STUDENT = `SELECT * FROM student WHERE codigo=$1`;

export const SELECT_STUDENT_RESERVATION = `
--SELECT_STUDENT_RESERVATION
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

export const SELECT_NEW_RESERVATION = `
--SELECT_NEW_RESERVATION
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

export const SELECT_OPTIONS = `
--SELECT_OPTIONS
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

export const SELECT_TEACHER_INFO = `
--SELECT_TEACHER_INFO
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
  ) as options FROM teacher Where id=$1 GROUP BY teacher.id;
`;


export const SET_WORKSHOP_LINK = `
--SET_WORKSHOP_LINK
UPDATE Option o SET url=$2 WHERE id=$1;
`;

export type TeacherReservation = {
  reservation_id: number;
  codigo: string;
  nombre: string;
  apellido_materno: string;
  apellido_paterno: string;
  teacher_id: number;
  teacher: string;
  workshop: string;
  time: string;
  day: string;
  option_id: string;
};
export const SELECT_TEACHER_RESERVATIONS = `
--SELECT_TEACHER_RESERVATIONS
SELECT
  t.id as teacher_id,
  r.id as reservation_id,
  codigo,
  nombre,
  apellido_paterno,
  apellido_materno,
  t.id as teacher_id,
  t.name as teacher,
  w.name as workshop,
  o.time,
  o.day,
  o.url,
  o.id as option_id
FROM teacher t
INNER JOIN option o ON o.teacher_id=t.id
INNER JOIN workshop w ON o.workshop_id=w.id
INNER JOIN reservation r ON r.option_id=o.id
INNER JOIN student s ON s.id=r.student_id
WHERE t.id=$1
`;

export const SELECT_SINGLE_OPTION = `
--SELECT_SINGLE_OPTION
SELECT * FROM Option o WHERE o.id=$1;
`;

export const INSERT_RESERVATION = `
  --INSERT_RESERVATION
  INSERT INTO reservation (student_id, option_id, tutorial_reason) VALUES ($1,$2,$3) RETURNING id;
`;

export const DELETE_RESERVATIONS = `DELETE FROM reservation`;

export const UPDATE_RESERVATION_COUNT = `
--UPDATES STUDENT'S RESERVATION COUNT OR CREATES AN ENTRY IF STUDENT DOESN'T EXIST IN RESERVATIONCOUNTER TABLE
INSERT INTO ReservationCounter (student_id, reservation_count) VALUES ($1, 1)
ON CONFLICT (student_id) DO
UPDATE SET reservation_count=excluded.reservation_count+ReservationCounter.reservation_count;
`;

export const SELECT_RESERVATION_COUNT = `
--SELECTS A RESERVATION COUNT BY STUDENT_ID
SELECT reservation_count FROM ReservationCounter WHERE student_id=$1;
`;

class DatabaseAPI extends DataSource {
  db: any;
  constructor(db: any) {
    super();
    this.db = db;
  }

  async setWorkshopLink(option_id: string, url: string){
    const id = Number(option_id);
    await this.db.any(new PQ({text: SET_WORKSHOP_LINK, values: [id, url]}))
    return true;
  }
  async getOptionsByIDs(ids: string[]): Promise<Option> {
    const parsedIDs = ids.map(id => Number(id));
    const result = await this.db.any(
      new PQ({ text: SELECT_SINGLE_OPTION, values: [parsedIDs] })
    );
    return result[0];
  }
  async getAllOptions(max_reservations: number): Promise<Option[]> {
    const options: OptionModel[] = await this.db.many(SELECT_OPTIONS);
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
  getStudentReservation(id: number) {
    return this.db.oneOrNone(
      new PQ({ text: SELECT_STUDENT_RESERVATION, values: [id] })
    );
  }
  _newReservation(id: number) {
    return this.db.any(new PQ({ text: SELECT_NEW_RESERVATION, values: [id] }));
  }

  async makeReservation(
    student_id: number,
    option_id: number,
    tutorial_reason?: string
  ) {
    const normalizedTutorialReason =
      tutorial_reason === undefined ? null : tutorial_reason;
    const reservation = await this.db.one(
      new PQ({
        text: INSERT_RESERVATION,
        values: [student_id, option_id, normalizedTutorialReason]
      })
    );
    const result = await this.db.one(
      new PQ({ text: SELECT_NEW_RESERVATION, values: [reservation.id] })
    );
    return result;
  }
  async resetReservations() {
    try {
      this.db.none(DELETE_RESERVATIONS);
    } catch (e) {
      throw new ApolloError(e);
    }
    return true;
  }
  async getTeacher(id: string) {
    const parsedID = Number(id);
    const result: SimpleTeacherInfo[] = await this.db.many(
      new PQ({
        text: SIMPLE_TEACHER_INFO,
        values: [parsedID]
      })
    );
    return {
      id: result[0].id.toString(),
      name: result[0].name,
      option_ids: result[0].option_ids.map(id => id.toString()),
      options: result.map(teacher => {
        return {
          id: teacher.option_id.toString(),
          day: teacher.day,
          time: teacher.time,
          teacher_name: teacher.name,
          teacher_id: teacher.id.toString(),
          workshop_name: teacher.workshop_name,
          workshop_id: teacher.workshop_id.toString(),
          url: teacher.url
        };
      })
    };
  }
  async getAllTeachers() {
    const result: SelectTeachers = await this.db.many(SELECT_TEACHERS);
    return result.map(teacher => {
      return {
        ...teacher,
        id: teacher.id.toString(),
        option_ids: teacher.option_ids.map(id => id.toString())
      };
    });
  }
  getTeacherReservations(option_id: string) {
    const parsedOptionID = Number(option_id);
    return this.db.manyOrNone(
      new PQ({ text: GET_TEACHER_RESERVATIONS, values: [parsedOptionID] })
    );
  }
  deleteOptionReservations(option_id: string) {
    const parsedID = Number(option_id);
    return this.db.none(
      new PQ({ text: DELETE_TEACHER_RESERVATIONS, values: [parsedID] })
    );
  }
  async updateReservationCount(student_id: number): Promise<boolean> {
  const reservation = await this.db.none(
    new PQ({
      text: UPDATE_RESERVATION_COUNT,
      values: [student_id]
    })
  );
  return true;
}
async getReservationCount(student_id: number): Promise<number>{
  const result = await this.db.one(
    new PQ({ text: SELECT_RESERVATION_COUNT, values: [student_id] })
  );
  return result.reservation_count;
}

}

export const GET_TEACHER_RESERVATIONS = `
--GET_TEACHER_RESERVATIONS
SELECT
  r.id,
  w.id as workshop_id,
  w.name as workshop_name,
  o.id as option_id,
  s.codigo,
  s.nombre,
  s.apellido_paterno,
  s.apellido_materno,
  s.email,
  s.telefono,
  s.nivel,
  s.grupo,
  r.tutorial_reason
FROM reservation r
INNER JOIN option o ON r.option_id=o.id
INNER JOIN workshop w ON o.workshop_id=w.id
INNER JOIN student s ON s.id=r.student_id
WHERE o.id=$1
`;
export type SelectTeachers = {
  id: number;
  name: string;
  option_ids: number[];
}[];
export const SELECT_TEACHERS = `
--SELECT_TEACHERS
SELECT * FROM Teacher;
`;

export type SimpleTeacherInfo = {
  id: number;
  name: string;
  workshop_name: string;
  workshop_id: number;
  option_id: number;
  day: string;
  time: string;
  url: string;
  option_ids: number[];
};
export const SIMPLE_TEACHER_INFO = `
--SIMPLE_TEACHER_INFO
SELECT t.id, t.name, w.name as workshop_name, w.id as workshop_id, o.id as option_id, o.day, o.time, o.url, t.option_ids
FROM teacher t
INNER JOIN option o ON o.teacher_id=t.id
INNER JOIN workshop w ON w.id=o.workshop_id
WHERE t.id=$1
`;

export const DELETE_TEACHER_RESERVATIONS = `
  --DELETE_TEACHER_RESERVATIONS
  DELETE FROM reservation WHERE option_id=$1
`;

export default DatabaseAPI;
