import { WorkshopsAPI } from "../../WorkshopsAPI";
import { StudentsAPI } from "../../StudentsAPI";
import { prismaMock } from "../../testutils/prisma/singleton";
import {
  WorkshopReservation,
  Student,
  Workshop,
  WorkshopOption,
  Teacher,
} from "@prisma/client";

type MakeReservationResult = WorkshopReservation & {
  student: Student;
  option: WorkshopOption & {
    teacher: Teacher;
    workshop: Workshop;
  };
};

const dataSources: { workshopsAPI: WorkshopsAPI; studentsAPI: StudentsAPI } =
  {} as any;

beforeAll(() => {
  dataSources.workshopsAPI = new WorkshopsAPI(prismaMock);
  dataSources.studentsAPI = new StudentsAPI({} as any, prismaMock);
});

const option_1: WorkshopOption = {
        id: 1,
        active: true,
        day: "Lunes",
        time: "13:00",
        teacher_id: 1,
        workshop_id: 1,
        url: null,
        place: "Centro de Aprendizaje Global",
      };

      const teacher_1: Teacher = {
          id: 1,
          nombre: "Gonzalo Rocha",
      };

      const workshop_1: Workshop = {
          id: 1,
          name: "Conversation",
          description: "Conversation Club",
          levels: [1, 2, 3, 4, 5, 6],
        };

describe("api.makeReservation", () => {
  test("makes a reservation", async () => {
    const student_id = 1;
    const option_id = 1;
    
    type MakeReservationResult = WorkshopReservation & {
      student: Student;
      option: WorkshopOption & {
        teacher: Teacher;
        workshop: Workshop;
      };
    };

    const mockResVal: MakeReservationResult = {
      id: 1,
      create_time: new Date(),
      student_id: Number(student_id),
      student: {
        id: 1,
        applicantId: 1,
        ciclo_actual: "2022A",
        codigo: "1234567890",
        nivel: 3,
        situacion: "AC",
        curso: "en",
        groupId: 1,
        desertor: false,
      },
      option_id: Number(option_id),
      option: {
        ...option_1,
        teacher: teacher_1,
        workshop: workshop_1,
      },
      attended: false,
    };

    //@ts-ignore
    prismaMock.workshopReservation.create.mockResolvedValue(mockResVal);

    let reservation = await dataSources.workshopsAPI.makeReservation(
      student_id,
      option_id
    );

    expect(reservation.option.id).toBe(Number(option_id));
    expect(reservation.student.id).toBe(Number(student_id));
    expect(reservation).toMatchSnapshot({
      create_time: expect.any(Date),
    });
  });

  it("fails on a null student_id", async () => {
    await expect(
      //@ts-ignore
      dataSources.workshopsAPI.makeReservation(null, null)
    ).rejects.toThrow("No student_id");
  });

  it("fails on null option_id", async () => {
    await expect(
      //@ts-ignore
      dataSources.workshopsAPI.makeReservation("1", null)
    ).rejects.toThrow("No option_id");
  });
});

describe("api.getStudentReservation", () => {
  type ReservationForStudent = WorkshopReservation & {
    student: Student;
    option: WorkshopOption & { workshop: Workshop; teacher: Teacher };
  };
  test("gets a reservation", async () => {
    const student_id = "1";
    
    const mockValue: ReservationForStudent = {
      id: 1,
      create_time: new Date(2022,9,15),
      student_id: 1, 
      student: {
        id: 3,
        applicantId: 1,
        ciclo_actual: '2022B',
        codigo: "1234567890",
        nivel: 4,
        situacion: null,
        curso: "en",
        groupId: 2,
        desertor: false
      },
      option_id: 1,
      option: {
        ...option_1,
        teacher: teacher_1,
        workshop: workshop_1
      },
      attended: false
    };

    //@ts-ignore
    prismaMock.workshopReservation.findFirst.mockResolvedValue(mockValue);

    const reservation = await dataSources.workshopsAPI.getStudentReservation(1);

    expect(reservation?.student_id).toBe(1);
    expect(reservation).toMatchSnapshot({
      create_time: expect.any(Date),
    });
  });
});

describe("student", () => {
  const applicantObj = {
    id: 1,
    codigo: "1234567890",
    nombre: "Benito Antonio",
    apellido_paterno: "Martinez",
    apellido_materno: "Ocasio",
    genero: "M",
    carrera: "Abogado (DECH)",
    ciclo_ingreso: "2022B",
    telefono: "0001234567",
    email: "bad@bunny.pr",
    institutional_email: "benito.martinez@alumnos.udg.mx",
    externo: false,
  };

  const groupObject = {
    id: 2,
    ciclo: "2022B",
    name: "E4-1",
    time: "08:00-09:00",
    aula: "F4",
    nivel: 4,
    registrados: 30,
    course: "en",
    teacherId: 1,
  };

  const student_mock = {
    id: 3,
    codigo: "1234567890",
    nivel: 4,
    curso: "en",
    situacion: null,
    desertor: false,
    applicantId: 1,
    ciclo_actual: "2022B",
    groupId: 2,
  };

  it("gets a student with all applicant info", async () => {
    const codigo = "1234567890";
    const ciclo_actual = "2022B";

    const mockedValue: Awaited<ReturnType<StudentsAPI["getStudent"]>> = {
      ...student_mock,
      applicant: applicantObj,
      groupObject: groupObject,
    };
    //@ts-ignore
    prismaMock.student.findFirst.mockResolvedValue(mockedValue);

    const student = await dataSources.studentsAPI.getStudent(
      codigo,
      ciclo_actual
    );

    expect(student.codigo).toBe(codigo);
    expect(student.applicant.nombre).toBe("Benito Antonio");
    expect(student).toMatchSnapshot();
  });

  it("prisma returns a null applicant", async () => {
    //@ts-ignore
    prismaMock.student.findFirst.mockResolvedValue(student_mock);

    await expect(
      dataSources.studentsAPI.getStudent("1234567890", "2022B")
    ).rejects.toThrow("Applicant info is missing on database");
  });

  it("fails on null codigo", async () => {
    await expect(
      //@ts-ignore
      dataSources.studentsAPI.getStudent(null, null)
    ).rejects.toThrow("Codigo not provided on studentsAPI.getStudent");
  });

  it("fails on null ciclo_actual", async () => {
    await expect(
      //@ts-ignore
      dataSources.studentsAPI.getStudent("1234567890", null)
    ).rejects.toThrow("ciclo_actual not provided on studentsAPI.getStudent");
  });
});
