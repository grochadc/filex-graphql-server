import testServer from "../testUtils/testServer";
import Database from "../testUtils/databaseCreator";
import { gql } from "apollo-server";
import { WorkshopsAPI } from "../datasources/WorkshopsAPI";
import { StudentsAPI } from "../datasources/StudentsAPI";
import { SheetsAPI } from "../datasources/SheetsAPI";
//import { StudentsAPI } from "../datasources/StudentsAPI";
import { DatabaseModel, StudentsDBModel } from "../modules/workshops/models";
import { MutationSaveWorkshopsAttendanceArgs } from "../generated/graphql";
import prodDb from "../modules/workshops/db.workshops.prod";

type OptionalDatabaseModel = Partial<DatabaseModel>;

const dbA = { prod: prodDb };

const db: { prod: OptionalDatabaseModel } = {
  prod: {
    workshops: {
      workshop_id1: {
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
        id: "id1",
        day: "Lunes",
        time: "1300 - 14:00",
        teacher_id: "teacher_id1",
        teacher_name: "Fulanito",
        workshop_id: "workshop_id1",
        workshop_name: "Conversation",
        url: "http://url1"
      },
      option_id2: {
        id: "id2",
        day: "Martes",
        time: "13:00 - 14:00",
        teacher_id: "teacher_id1",
        teacher_name: "Fulanito",
        workshop_id: "workshop_id1",
        workshop_name: "Conversation",
        url: "http://url2"
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

const studentsDB: { prod: StudentsDBModel } = {
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
workshopsAPI.get = jest.fn(url => database.get(url));
workshopsAPI.put = jest.fn((url, data) => database.put(url, data));
workshopsAPI.post = jest.fn((url, data) => database.post(url, data));
workshopsAPI.delete = jest.fn(url => database.delete(url));

const studentsDatabase = new Database(studentsDB);
const studentsAPI = new StudentsAPI();
studentsAPI.get = jest.fn(url => studentsDatabase.get(url));

const workshopsSheetsAPI = new SheetsAPI("sheetsID");
workshopsSheetsAPI.append = jest.fn(() => Promise.resolve());

const dataSources = () => {
  return {
    workshopsAPI: workshopsAPI,
    studentsAPI: studentsAPI,
    workshopsSheetsAPI: workshopsSheetsAPI
  };
};

const context = () => {
  return {
    enviroment: "prod"
  };
};
const { query } = testServer(dataSources, context);

afterEach(() => {
  workshopsAPI.get.mockClear();
  workshopsAPI.post.mockClear();
  workshopsAPI.put.mockClear();
  workshopsAPI.delete.mockClear();
  studentsAPI.get.mockClear();
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
  expect(workshopsAPI.get).not.toHaveBeenCalledWith(
    expect.stringContaining("undefined")
  );
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

describe("reservations", () => {
  const MAKE_RESERVATION = gql`
    mutation makeReservation(
      $codigo: ID!
      $option_id: ID!
      $teacher_id: ID!
      $tutorial_reason: String
    ) {
      makeWorkshopReservation(
        codigo: $codigo
        teacher_id: $teacher_id
        option_id: $option_id
        tutorial_reason: $tutorial_reason
      ) {
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
      codigo: "1234567890",
      option_id: "option_id1",
      teacher_id: "teacher_id1"
    };
    const res = await query({ query: MAKE_RESERVATION, variables });
    if (res.errors) console.log(JSON.stringify(res.errors[0]));
    expect(res.errors).toBeUndefined();
    expect(workshopsAPI.put).toHaveBeenNthCalledWith(
      1,
      `prod/studentsReservations/${variables.codigo}.json`,
      {
        option_id: variables.option_id
      }
    );
    expect(workshopsAPI.put).toHaveBeenNthCalledWith(
      2,
      `prod/availableOptions/${variables.option_id}.json`,
      11
    );
    expect(workshopsAPI.post.mock.calls[0][0]).toBe(
      `prod/teachers/${variables.teacher_id}/raw_reservations/${variables.option_id}.json`
    );
    expect(workshopsAPI.post.mock.calls[0][1]).toMatchSnapshot();
  });

  test("makes a tutorials reservation", async () => {
    const variables = {
      codigo: "1234567890",
      option_id: "option_id1",
      teacher_id: "teacher_id1",
      tutorial_reason: "negative questions"
    };
    const res = await query({ query: MAKE_RESERVATION, variables });
    expect(res.errors).toBeUndefined();
    expect(workshopsAPI.post.mock.calls[0][1]).toMatchSnapshot();
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
    const variables = { codigo: "1234509876" };
    const res = await query({ query: GET_STUDENT, variables });
    expect(res.errors).toBeUndefined();
    expect(res.data.student.reservation).toBeTruthy();
    expect(res.data).toMatchSnapshot();
  });
  test("not found", async () => {
    const variables = { codigo: "0987654321" };
    const res = await query({ query: GET_STUDENT, variables });
    expect(res.errors[0].message).toBe(
      "No se encontró ese codigo de alumno en la base de datos."
    );
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
      teacher_id: "teacher_id1"
    };
    const res = await query({ query: GET_TEACHER_DASHBOARD, variables });
    expect(res.errors).toBeUndefined();
    expect(workshopsAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
    expect(res.data).toMatchSnapshot();
  });
  test("no reservations", async () => {
    const variables = { teacher_id: "teacher_id2" };
    const res = await query({ query: GET_TEACHER_DASHBOARD, variables });
    expect(res.errors).toBeUndefined();
    expect(workshopsAPI.get).not.toHaveBeenCalledWith(
      expect.stringContaining("undefined")
    );
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
    expect(workshopsAPI.put).toHaveBeenCalledWith(
      `prod/options/${variables.option_id}/url.json`,
      variables.url
    );
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
      option_id: "option_id1",
      teacher_id: "teacher_id1"
    };

    const res = await query({ query: SAVE_ATTENDANCE, variables });

    expect(res.errors).toBeUndefined();
    expect(workshopsAPI.delete).toHaveBeenCalledWith(
      `prod/teachers/${variables.teacher_id}/raw_reservations/${variables.option_id}.json`
    );
    expect(workshopsSheetsAPI.append).toHaveBeenCalled();
    expect(res.data.saveWorkshopsAttendance).toBe(true);
  });
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
  expect(workshopsAPI.delete).toHaveBeenCalledWith(
    "prod/studentsReservations.json"
  );
  expect(workshopsAPI.delete).toHaveBeenCalledWith(
    "prod/availableOptions.json"
  );
});
