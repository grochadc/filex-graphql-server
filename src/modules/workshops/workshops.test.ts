import testServer from "testUtils/testServer";
import { gql } from "apollo-server";
import mocks from "../../datasources/DatabaseAPI/mocks";
import DatabaseAPI from "datasources/DatabaseAPI";
import studentMocks from "datasources/StudentsAPI/mocks";
import { StudentsAPI } from "datasources/StudentsAPI";
import Database from "testUtils/databaseCreator";
import { WorkshopsAPI } from "datasources/WorkshopsAPI";
import { SheetsAPI } from "datasources/SheetsAPI";
import { MutationSaveWorkshopsAttendanceArgs } from "generated/graphql";
import { DatabaseModel, StudentsDBModel } from "./models";

const databaseAPI = new DatabaseAPI(mocks.db);

type OptionalDatabaseModel = Partial<DatabaseModel>;
const db: { prod: OptionalDatabaseModel } = {
  prod: {
    system: {
      max_reservations: 30
    },
    workshops: {
      workshop_id1: {
        id: "workshop_id1",
        name: "Conversation",
        description: "This is the conversation workshop description.",
        levels: ["1", "2", "3", "4", "5", "6"],
        option_ids: ["option_id1", "option_id2"]
      }
    },
    teachers: {
      teacher_id1: {
        id: "teacher_id1",
        name: "Fulanito",
        option_ids: ["option_id1", "option_id2"],
        raw_reservations: {
          option_id1: {
            _randomstring1: {
              codigo: "1234567890",
              nombre: "Benito Antonio",
              apellido_paterno: "Martinez",
              apellido_materno: "Ocasio",
              nivel: "4",
              grupo: "E4-1",
              workshop_id: "workshop_id1",
              workshop_name: "Conversation",
              option_id: "option_id1",
              option_name: "why?"
            }
          }
        }
      },
      teacher_id2: {
        id: "teacher_id2",
        name: "Manganito",
        option_ids: ["option_id1"]
      }
    },
    options: {
      option_id1: {
        active: true,
        available: true,
        id: "id1",
        day: "Lunes",
        time: "1300 - 14:00",
        teacher_id: "teacher_id1",
        teacher_name: "Fulanito",
        workshop_id: "workshop_id1",
        workshop_name: "Conversation",
        url: "http://url1",
        isTutorial: false
      },
      option_id2: {
        id: "id2",
        active: true,
        available: true,
        day: "Martes",
        time: "13:00 - 14:00",
        teacher_id: "teacher_id1",
        teacher_name: "Fulanito",
        workshop_id: "workshop_id1",
        workshop_name: "Conversation",
        url: "http://url2",
        isTutorial: false
      }
    },
    availableOptions: {
      option_id1: 10
    },
    studentsReservations: {
      "1234509876": {
        option_id: "option_id1"
      }
    }
  }
};

const studentsDB = {
  prod: {
    "1234567890": {
      codigo: "1234567890",
      nombre: "Benito Antonio",
      apellido_paterno: "Martinez",
      apellido_materno: "Ocasio",
      genero: "M",
      carrera: "Abogado",
      ciclo: "2021A",
      telefono: "1234567890",
      email: "bad@bunny.pr",
      nivel: "4",
      curso: "en",
      grupo: "E4-1",
      externo: false
    },
    "1234509876": {
      codigo: "1234509876",
      nombre: "Juan",
      apellido_materno: "Preciado",
      apellido_paterno: "Paramo",
      genero: "M",
      carrera: "Abogado",
      ciclo: "2021A",
      telefono: "1234567890",
      email: "juan@lamedialuna.com",
      nivel: "5",
      curso: "en",
      grupo: "E5-1",
      externo: false
    }
  }
};
const database = new Database(db);
const workshopsAPI = new WorkshopsAPI();
workshopsAPI.isOpen = jest.fn(() => Promise.resolve(true));
workshopsAPI.getMaxStudentReservations = jest.fn(() => Promise.resolve(30));

const studentsDatabase = new Database(studentsDB);
const studentsAPI = new StudentsAPI(studentMocks.db);

const workshopsSheetsAPI = new SheetsAPI("sheetsID");
workshopsSheetsAPI.append = jest.fn(() => Promise.resolve());

const dataSources = () => {
  return {
    workshopsAPI: workshopsAPI,
    studentsAPI: studentsAPI,
    workshopsSheetsAPI: workshopsSheetsAPI,
    databaseAPI: databaseAPI
  };
};

const context = () => {
  return {
    enviroment: "prod"
  };
};
const { query } = testServer(dataSources, context);

afterEach(() => {
  databaseAPI.db.one.mockClear();
});

test("gets all workshops", async () => {
  const GET_WORKSHOPS = gql`
    query getWorkshops {
      workshops {
        name
        description
        levels
        options {
          id
          day
          time
          teacher_name
          workshop_name
          url
          zoom_id
          available
        }
      }
    }
  `;
  const res = await query({
    query: GET_WORKSHOPS
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

describe("reservations", () => {
  const MAKE_RESERVATION = gql`
    mutation makeReservation(
      $student_id: ID!
      $option_id: ID!
      $tutorial_reason: String
    ) {
      makeWorkshopReservation(
        student_id: $student_id
        option_id: $option_id
        tutorial_reason: $tutorial_reason
      ) {
        id
        day
        time
        teacher_id
        teacher_name
        workshop_name
        workshop_id
        url
        zoom_id
      }
    }
  `;
  test("makes a reservation", async () => {
    const variables = {
      student_id: "1",
      option_id: "1"
    };
    const res = await query({ query: MAKE_RESERVATION, variables });
    expect(res.errors).toBeUndefined();
    expect(databaseAPI.db.one.mock.calls[0][0].values).toMatchSnapshot();
    expect(res.data).toMatchSnapshot();
  });

  test("makes a tutorials reservation", async () => {
    const variables = {
      student_id: "1",
      option_id: "1",
      tutorial_reason: "negative questions"
    };
    const res = await query({ query: MAKE_RESERVATION, variables });
    expect(res.errors).toBeUndefined();
    expect(databaseAPI.db.one.mock.calls[0][0].values).toMatchSnapshot();
    expect(res.data).toMatchSnapshot();
  });

  test("resets reservations", async () => {
    const RESET_RESERVATIONS = gql`
      mutation reset {
        resetReservations
      }
    `;
    const res = await query({ query: RESET_RESERVATIONS });
    expect(res.errors).toBeUndefined();
    expect(res.data.resetReservations).toBe(true);
  });

  test("errors when student already has a reservation", async () => {
    const variables = {
      student_id: "2",
      option_id: "2"
    };
    const res = await query({ query: MAKE_RESERVATION, variables });
    expect(res.errors[0].extensions.code).toBe("RESERVATION_FORBIDDEN");
  });
});

describe("student data", () => {
  const GET_STUDENT = gql`
    query getStudent($codigo: ID!) {
      student(codigo: $codigo) {
        nombre
        reservation {
          day
          time
          teacher_name
          workshop_name
          url
        }
      }
    }
  `;

  test("normal not registered", async () => {
    const variables = { codigo: "1234567890" };
    const res = await query({ query: GET_STUDENT, variables });
    expect(res.errors).toBeUndefined();
    expect(res.data.student.reservation).toBeNull();
    expect(res.data).toMatchSnapshot();
  });
  test("already registered", async () => {
    const variables = { codigo: "0987654321" };
    const res = await query({ query: GET_STUDENT, variables });
    expect(res.errors).toBeUndefined();
    expect(res.data.student.reservation).toBeTruthy();
    expect(res.data).toMatchSnapshot();
  });
  test("not found", async () => {
    const variables = { codigo: "1234509876" };
    const res = await query({ query: GET_STUDENT, variables });
    expect(res.errors[0].message).toBe("404: Alumno inexistente");
  });
});

describe("teacher dashboard", () => {
  const GET_TEACHER_DASHBOARD = gql`
    query getTeacherDashboard($teacher_id: ID!) {
      teacher(id: $teacher_id) {
        id
        name
        options {
          id
          day
          time
          url
          reservations {
            codigo
            nombre
            apellido_paterno
            apellido_materno
            nivel
            grupo
          }
        }
      }
    }
  `;

  test("normal", async () => {
    const variables = {
      teacher_id: "1"
    };
    const res = await query({ query: GET_TEACHER_DASHBOARD, variables });
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
  test("no reservations", async () => {
    const variables = { teacher_id: "2" };
    const res = await query({ query: GET_TEACHER_DASHBOARD, variables });
    if (res.errors) console.log(JSON.stringify(res.errors));
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });

  test("set workshop link", async () => {
    const SET_WORKSHOP_LINK = gql`
      mutation setLink($option_id: ID!, $url: String!) {
        setWorkshopLink(option_id: $option_id, url: $url)
      }
    `;
    const variables = { option_id: "option_id1", url: "https://newurl" };
    const res = await query({ query: SET_WORKSHOP_LINK, variables });
    expect(res.errors).toBeUndefined();
    expect(res.data.setWorkshopLink).toBe(true);
  });
  test("saves workshop attendance", async () => {
    const SAVE_ATTENDANCE = gql`
      mutation saveAttendance(
        $input: [AttendingStudent!]!
        $option_id: ID!
        $teacher_id: ID!
      ) {
        saveWorkshopsAttendance(
          input: $input
          option_id: $option_id
          teacher_id: $teacher_id
        )
      }
    `;

    const variables: MutationSaveWorkshopsAttendanceArgs = {
      input: [
        {
          codigo: "1234567890",
          nombre: "Benito Antonio",
          apellido_paterno: "Martinez",
          apellido_materno: "Ocasio",
          nivel: "4",
          grupo: "E4-1",
          workshop: "conversation",
          teacher: "Fulanito",
          attended: true
        }
      ],
      option_id: "1",
      teacher_id: "1"
    };

    const res = await query({ query: SAVE_ATTENDANCE, variables });

    expect(res.errors).toBeUndefined();
    expect(databaseAPI.db.none).toHaveBeenCalled();
    expect(workshopsSheetsAPI.append).toHaveBeenCalled();
    expect(res.data.saveWorkshopsAttendance).toBe(true);
  });
});

describe("teacher links page", () => {
  test("names and ids", async () => {
    const GET_TEACHERS_PAGE = gql`
      query getTeacherLinks {
        teachers {
          id
          name
        }
      }
    `;
    const res = await query({
      query: GET_TEACHERS_PAGE
    });
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });

  test("dashboard", async () => {
    const QUERY_GET_TEACHERS_DASHBOARD = gql`
      query TeacherDashboard {
        teacher(id: "4") {
          id
          name
          options {
            id
            workshop_name
            time
            day
            reservations {
              codigo
              nombre
            }
          }
        }
      }
    `;
    const res = await query({ query: QUERY_GET_TEACHERS_DASHBOARD });
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
