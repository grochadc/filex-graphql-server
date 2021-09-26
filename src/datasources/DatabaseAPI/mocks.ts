import { ParameterizedQuery as PQ } from "pg-promise";
import { students } from "datasources/StudentsAPI/mocks";
import {
  SELECT_STUDENT,
  SELECT_STUDENT_RESERVATION,
  SELECT_NEW_RESERVATION,
  SELECT_OPTIONS,
  DELETE_RESERVATIONS,
  SELECT_TEACHER_INFO,
  SELECT_TEACHER_RESERVATIONS,
  SELECT_SINGLE_OPTION,
  INSERT_RESERVATION,
  GET_TEACHER_RESERVATIONS,
  SELECT_TEACHERS,
  SIMPLE_TEACHER_INFO,
  DELETE_TEACHER_RESERVATIONS
} from "./index";

const teacher_reservations = [
  {
    workshop_id: 2,
    workshop_name: "Conversation",
    option_id: 2,
    codigo: "1234509876",
    nombre: "Benito Antonio",
    apellido_paterno: "Martinez",
    apellido_materno: "Ocasio",
    nivel: 4,
    grupo: "E4-1"
  }
];

const reservations = [
  {
    id: 1,
    student_id: 2,
    option_id: 2,
    day: "Lunes",
    time: "1300 - 14:00",
    teacher_id: 1,
    teacher_name: "Fulanito",
    workshop_id: "workshop_id1",
    workshop_name: "Conversation",
    url: "http://url1"
  }
];
const teachersOptions = [
  {
    teacher_id: 1,
    options: [
      {
        day: "Miercoles",
        id: 4,
        name: "Gonzalo",
        option_id: 7,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Jueves",
        id: 4,
        name: "Gonzalo",
        option_id: 8,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Martes",
        id: 4,
        name: "Gonzalo",
        option_id: 22,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/kux-jhii-eyi",
        workshop_id: 4,
        workshop_name: "Tutoring"
      }
    ]
  },
  {
    teacher_id: 2,
    options: [
      {
        day: "Lunes",
        id: 3,
        name: "Sutanito",
        option_id: 5,
        option_ids: [5, 6, 21],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/sutanitolink1",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Martes",
        id: 3,
        name: "Sutanito",
        option_id: 6,
        option_ids: [5, 6, 21],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/sutanitolink2",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Viernes",
        id: 3,
        name: "Sutanito",
        option_id: 21,
        option_ids: [5, 6, 21],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/sutanitolink3",
        workshop_id: 4,
        workshop_name: "Tutoring"
      }
    ]
  },
  {
    teacher_id: 4,
    options: [
      {
        day: "Miercoles",
        id: 4,
        name: "Gonzalo",
        option_id: 7,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Jueves",
        id: 4,
        name: "Gonzalo",
        option_id: 8,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Martes",
        id: 4,
        name: "Gonzalo",
        option_id: 22,
        option_ids: [7, 8, 22],
        time: "13:00 - 14:00",
        url: "https://meet.google.com/kux-jhii-eyi",
        workshop_id: 4,
        workshop_name: "Tutoring"
      }
    ]
  }
];

type Mocks = {
  db: {
    [method: string]: jest.Mock<Promise<any>>;
  };
};
type MyCallback = (args: PQ) => any;
const promisedMock = (callback: MyCallback): jest.Mock<Promise<any>> => {
  return jest.fn(args => {
    return Promise.resolve(callback(args));
  });
};
const mocks: Mocks = {
  db: {
    manyOrNone: promisedMock(args => {
      if (args.text === GET_TEACHER_RESERVATIONS) {
        const option_id = args.values[0];
        return getTeacherReservationsByOptionId(option_id);
      }
      console.log(
        "no more mocked responses for manyOrNone returning null",
        args
      );
      return null;
    }),
    one: promisedMock(args => {
      if (args.text === INSERT_RESERVATION) return Promise.resolve({ id: 1 });
      if (args.text === SELECT_NEW_RESERVATION)
        return {
          id: 1,
          student_id: 2,
          option_id: 2,
          day: "Lunes",
          time: "1300 - 14:00",
          teacher_id: "teacher_id1",
          teacher_name: "Fulanito",
          workshop_id: "workshop_id1",
          workshop_name: "Conversation",
          url: "http://url1"
        };
      console.log("called one", args);
    }),
    none: promisedMock(args => {
      console.log("called none", args);
      return null;
    }),
    oneOrNone: promisedMock(args => {
      if (args.text === SELECT_STUDENT_RESERVATION) {
        const result = reservations.find(
          reservation => reservation.student_id === args.values[0]
        );
        return result;
      }
      console.log("no more mocked responses for any", args);
    }),
    many: promisedMock(args => {
      //@ts-ignore
      if (args === SELECT_TEACHERS) {
        return [
          { id: 1, name: "Fulanito", option_ids: [1, 2] },
          { id: 2, name: "Menganito", option_ids: [3, 4] }
        ];
      }
      //@ts-ignore
      if (args === SELECT_OPTIONS) {
        return [
          {
            id: 1,
            workshop_name: "Conversation",
            day: "Lunes",
            time: "1300 - 14:00",
            teacher_name: "Fulanito",
            url: "http://url1",
            teacher_id: 1,
            workshop_id: 1,
            workshop_description:
              "This is the conversation workshop description.",
            workshop_levels: [1, 2, 3, 4, 5, 6],
            reservations: 0
          },
          {
            id: 2,
            workshop_name: "Conversation",
            day: "Martes",
            time: "13:00 - 14:00",
            teacher_name: "Fulanito",
            url: "http://url2",
            teacher_id: 1,
            workshop_id: 1,
            workshop_description:
              "This is the conversation workshop description.",
            workshop_levels: [1, 2, 3, 4, 5, 6],
            reservations: 0
          }
        ];
      }
      if (args.text === SIMPLE_TEACHER_INFO) {
        const teacher_id = args.values[0];
        const options = teachersOptions.find(
          teacherOptions => teacherOptions.teacher_id === teacher_id
        ).options;
        if (options === undefined) {
          throw new Error("Couldn't find a teacher with id " + teacher_id);
        }
        return options;
      }
      console.log("no more mocked responses for many", args);
    })
  }
};

function getTeacherReservationsByOptionId(option_id: number) {
  const teacher_reservations = [
    {
      option_id: 7,
      reservations: [
        {
          workshop_id: 2,
          workshop_name: "Conversation",
          option_id: 2,
          codigo: "1234509876",
          nombre: "Benito Antonio",
          apellido_paterno: "Martinez",
          apellido_materno: "Ocasio",
          nivel: 4,
          grupo: "E4-1"
        }
      ]
    },
    {
      option_id: 8,
      reservations: [
        {
          workshop_id: 2,
          workshop_name: "Conversation",
          option_id: 2,
          codigo: "1234509876",
          nombre: "Benito Antonio",
          apellido_paterno: "Martinez",
          apellido_materno: "Ocasio",
          nivel: 4,
          grupo: "E4-1"
        }
      ]
    },
    {
      option_id: 22,
      reservations: [
        {
          workshop_id: 2,
          workshop_name: "Conversation",
          option_id: 2,
          codigo: "1234509876",
          nombre: "Benito Antonio",
          apellido_paterno: "Martinez",
          apellido_materno: "Ocasio",
          nivel: 4,
          grupo: "E4-1"
        }
      ]
    }
  ];
  const result = teacher_reservations.find(
    option => option.option_id === option_id
  );
  return result ? result.reservations : null;
}

export default mocks;
