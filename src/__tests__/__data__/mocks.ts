export const reservations = [
  {
    id: "1xc345s",
    code: "1234567890",
    name: "PEDRO",
    first_last_name: "PARAMO",
    second_last_name: "DE SAN JUAN",
    level: 4,
    option_id: "alondralunes",
    timestamp: "2020-11-23T19:16:18.493Z",
    group: "E4-1",
  },
];

export const options = [
  {
    id: "alondralunes",
    teacher_id: "alondra",
    time: "13:00 - 14:00",
    day: "lunes",
    workshop_id: "conversation",
    url: "https://meet.google.com/lookup/fnms6k7cad",
    workshop: "conversation",
  },
];

export const student = {
  codigo: "1234567890",
  nombre: "Pedro",
  apellido_paterno: "Paramo",
  apellido_materno: "De San Juan",
  genero: "M",
  carrera: "Agronegocios",
  ciclo: "1965A",
  curso: "en",
  email: "elpatron@lamedialuna.com",
  telefono: "3411234567",
  externo: false,
  grupo: "E4-1",
  nivel: "4",
  nuevo_ingreso: false,
};

export const workshops = [
  {
    id: "conversation",
    name: "Conversation",
    description:
      "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
    levels: [1, 2, 3, 4, 5, 6],
    option_ids: [
      "alondralunes",
      "alondramartes",
      "sergiomartes",
      "gisselmartes",
      "carlosmiercoles",
      "sergiomiercoles",
      "gisselmiercoles",
      "gonzalojueves",
      "zulletjueves",
    ],
  },
  {
    id: "toeflpreparation",
    name: "TOEFL Preparation",
    description:
      "Ayuda a desarrollar habilidades para el examen de certificación, a partir del dominio ya adquirido del idioma. Duracion: 1 mes.",
    levels: [6],
    option_ids: [
      "carloslunes",
      "carlosmartes",
      "brendamiercoles",
      "brendajueves",
    ],
  },
  {
    id: "basicreading",
    name: "Basic Reading",
    description:
      "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
    levels: [1, 2, 3],
    option_ids: ["alondramiercoles"],
  },
  {
    id: "advancedreading",
    name: "Advanced Reading",
    description:
      "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
    levels: [4, 5, 6],
    option_ids: ["brendamartes"],
  },
  {
    id: "basicadvancedlistening",
    name: "Basic/Advanced Listening",
    description:
      "Ayuda a desarrollar la habilidad de comprensión de escucha por medio de audios. Basic: Niveles 1-3; Advanced: Niveles 4-6",
    levels: [1, 2, 3, 4, 5, 6],
    option_ids: ["zulletlunes", "zulletmartes"],
  },
  {
    id: "tutoring",
    name: "Tutoring",
    description:
      "Es un proceso de acompañamiento, aclarando dudas. El alumno deberá saber exactamente el tema a repasar.",
    levels: [1, 2, 3, 4, 5, 6],
    option_ids: ["sergiolunes", "gissellunes", "zulletmiercoles"],
  },
];

export const workshopOption = {
  id: "gonzalojueves",
  teacher_id: "gonzalo",
  time: "14:00 - 15:00",
  day: "jueves",
  workshop_id: "conversation",
  url: "https://meet.google.com/wbu-jzfw-hbs",
};
