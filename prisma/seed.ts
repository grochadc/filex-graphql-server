import { PrismaClient, Workshop } from "@prisma/client";

console.log(
  "Initializing new prisma client with url ",
  process.env.STACKHERO_POSTGRESQL_HOST
);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.STACKHERO_POSTGRESQL_HOST,
    },
  },
});

async function main() {
  //Applicants
  const benito_applicant = await prisma.applicant.create({
    data: {
      id: 1,
      codigo: "1234567890",
      nombre: "Benito Antonio",
      apellido_paterno: "Martinez",
      apellido_materno: "Ocasio",
      genero: "M",
      carrera: "Abogado (DECH)",
      cicloIngreso: "2022A",
      telefono: "0001234567",
      email: "bad@bunny.pr",
      institucionalEmail: "benito.martinez@cusur.udg.mx",
      externo: false,
    },
  });

  const juanga_applicant = await prisma.applicant.create({
    data: {
      id: 2,
      codigo: "0987654321",
      nombre: "Alberto",
      apellido_paterno: "Aguilera",
      apellido_materno: "Valadez",
      genero: "M",
      carrera: "Agrobiotecnologia (AGB)",
      cicloIngreso: "2022B",
      telefono: "0001234567",
      email: "juanga@elnoanoa.mx",
      institucionalEmail: "alberto.aguilera@alumnos.udg.mx",
      externo: false,
    },
  });

  //Teachers

  const teacher_gonzo = await prisma.teacher.create({
    data: {
      id: 1,
      nombre: "Gonzalo Rocha",
    },
  });

  //Groups
  const level3_2022A = await prisma.group.create({
    data: {
      id: 1,
      ciclo: "2022A",
      name: "E3-1",
      time: "07:00-08:00",
      aula: "F4",
      teacherId: 1,
      nivel: 3,
      registrados: 30,
      course: "en",
    },
  });

  const level4_2022B = await prisma.group.create({
    data: {
      id: 2,
      ciclo: "2022B",
      name: "E4-1",
      time: "08:00-09:00",
      aula: "F4",
      teacherId: 1,
      nivel: 4,
      registrados: 30,
      course: "en",
    },
  });

  //Students
  const benito_student_2022A = await prisma.student.create({
    data: {
      id: 1,
      ciclo_actual: "2022A",
      codigo: "1234567890",
      nivel: 3,
      situacion: "AC",
      curso: "en",
      groupId: 1,
      desertor: false,
    },
  });

  const juanga_student_2022B = await prisma.student.create({
    data: {
      id: 2,
      ciclo_actual: "2022B",
      codigo: "0987654321",
      nivel: 4,
      situacion: null,
      curso: "en",
      groupId: 2,
      desertor: false,
    },
  });

  const benito_student_2022B = await prisma.student.create({
    data: {
      id: 3,
      ciclo_actual: "2022B",
      codigo: "1234567890",
      nivel: 4,
      situacion: null,
      curso: "en",
      groupId: 2,
      desertor: false,
    },
  });

  console.log("Applicants", { benito_applicant, juanga_applicant });
  console.log("Teachers", { teacher_gonzo });
  console.log("Groups", { level3_2022A, level4_2022B });
  console.log("Students", {
    benito_student_2022A,
    juanga_student_2022B,
    benito_student_2022B,
  });
}

async function main2() {
  const workshop = await prisma.workshop.create({
    data: {
      id: 1,
      name: "Conversation",
      description: "Conversation Club",
      levels: [1,2,3,4,5,6]

    }
  })
  const option = await prisma.workshopOption.create({
    data: {
      id: 1,
      active: true,
      day: "Lunes",
      time: "13:00",
      teacher_id: 1,
      workshop_id: 1,
      url: null,
      place: "Centro de Aprendizaje Global"
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
