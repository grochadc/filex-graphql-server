import testServer from "testUtils/testServer";
import mocks from "../../datasources/StudentsAPI/mocks";
import { StudentsAPI } from "../../datasources/StudentsAPI";
import { gql } from "apollo-server";

const studentsAPI = new StudentsAPI(mocks.db, {} as any);

const dataSources = () => {
  return {
    studentsAPI: studentsAPI,
  };
};

const context = () => {
  return {
    enviroment: "prod",
  };
};
const { query } = testServer(dataSources, context);

test("gets student", async () => {
  const GET_STUDENT_QUERY = gql`
    query GetStudent($codigo: ID!) {
      student(codigo: $codigo) {
        id
        codigo
        nombre
        apellido_paterno
        apellido_materno
        genero
        carrera
        ciclo
        telefono
        email
        nivel
        curso
        externo
        grupo
      }
    }
  `;

  const res = await query({
    query: GET_STUDENT_QUERY,
    variables: { codigo: "1234567890" },
  });
  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test("adds a student", async () => {
  const ADD_STUDENT_MUTATION = gql`
    mutation AddStudent($student: StudentInput!) {
      addStudent(student: $student) {
        id
        codigo
        nombre
        apellido_paterno
        apellido_materno
        genero
        carrera
        ciclo
        telefono
        email
        nivel
        curso
        externo
        grupo
      }
    }
  `;
  const student = {
    codigo: "0987654321",
    nombre: "Alberto",
    apellido_paterno: "Aguilera",
    apellido_materno: "Valadez",
    nivel: "1",
    grupo: "E1-1",
    genero: "M",
    carrera: "Abogado",
    ciclo: "2021A",
    telefono: "1234567890",
    email: "juanga@elnoanoa.mx",
    curso: "en",
    externo: false,
  };

  const res = await query({
    query: ADD_STUDENT_MUTATION,
    variables: { student },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});

test("edits a student", async () => {
  const EDIT_STUDENT_MUTATION = gql`
    mutation EditStudent($codigo: ID!, $changes: StudentChangesInput!) {
      editStudent(codigo: $codigo, changes: $changes) {
        codigo
        carrera
      }
    }
  `;

  const res = await query({
    query: EDIT_STUDENT_MUTATION,
    variables: { codigo: "0987654321", changes: { carrera: "Periodismo" } },
  });

  expect(res.errors).toBeUndefined();
  expect(res.data).toMatchSnapshot();
});
