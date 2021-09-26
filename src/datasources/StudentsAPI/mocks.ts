import { ParameterizedQuery as PQ } from "pg-promise";
import { ADD_STUDENT, GET_STUDENT } from "./index";

export const students = [
  {
    id: 1,
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
  {
    id: 2,
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
    externo: false
  }
];

const mocks = {
  db: {
    one: jest.fn((pq: PQ) => {
      if (pq.text === ADD_STUDENT) return Promise.resolve({ id: 1 });
    }),
    none: jest.fn(pq => {
      return Promise.resolve();
    }),
    oneOrNone: jest.fn(pq => {
      if (pq.text === GET_STUDENT) {
        const student = students.find(
          student => student.codigo === pq.values[0]
        );
        return Promise.resolve(student ? student : null);
      }
    }),
    any: jest.fn(pq => {
      if (pq.text === GET_STUDENT) {
        const student = students.find(
          student => student.codigo === pq.values[0]
        );
        return Promise.resolve(student ? student : null);
      }
    })
  }
};

export default mocks;
