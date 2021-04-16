type WorkshopId =
  | "conversation"
  | "toeflpreparation"
  | "basicreading"
  | "basicadvancedlistening"
  | "advancedreading"
  | "tutoring";

interface Workshop {
  id: WorkshopId;
  name: string;
  description: string;
  levels: number[];
  option_ids: string[];
}

interface Carrera {
  name: string;
}

const database: {
  carreras: Carrera[];
  workshops: Workshop[];
  options: any[];
  teachers: any[];
} = {
  carreras: [
    { name: "Academico" },
    { name: "Administrativo" },
    { name: "Abogado" },
    { name: "Administración de Negocios" },
    { name: "Agrobiotecnología" },
    { name: "Agronegocios" },
    { name: "Carrera en Enfermería (ENFE)" },
    {
      name:
        "Ciencia del Comportamiento con Orientación en Alimentación y Nutrición",
    },
    {
      name:
        "Ciencia del Comportamiento con orientación en Alimentación y Nutrición",
    },
    { name: "Cultura Física y Deportes" },
    { name: "Derecho" },
    { name: "Desarrollo Turístico Sustentable" },
    { name: "Enfermería" },
    { name: "Enfermería Semiescolarizada" },
    { name: "Estudios Socioterritoriales" },
    { name: "Ingeniería en Geofísica" },
    { name: "Ingeniería en Sistemas Biológicos" },
    { name: "Ingeniería en Telemática" },
    { name: "Letras Hispánicas" },
    { name: "Médico Cirujano y Partero" },
    { name: "Médico Veterinario y Zootecnista" },
    { name: "Negocios Internacionales" },
    { name: "Nivelación en Licenciatura en Enfermería" },
    { name: "Nutrición" },
    { name: "Periodismo" },
    { name: "Protección Civil y Emergencias" },
    { name: "Psicología" },
    { name: "Psicología con Orientación en Calidad de Vida y Salud" },
    { name: "Psicología con Orientación en Calidad de Vida y Salud" },
    { name: "Salud Pública" },
    { name: "Seguridad Laboral" },
    { name: "Tecnologías para el Aprendizaje" },
    { name: "Trabajo Social" },
  ],
  workshops: [
    {
      id: "conversation",
      name: "Conversation",
      description:
        "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
      levels: [1, 2, 3, 4, 5, 6],
      option_ids: [
        "brendalunes",
        "erickalunes",
        "erickamartes",
        "sergiomartes",
        "jessicamartes",
        "carlosmiercoles",
        "sergiomiercoles",
        "gonzalojueves",
        "jessicajueves",
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
      option_ids: ["erickamiercoles"],
    },
    {
      id: "advancedreading",
      name: "Advanced Reading",
      description:
        "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
      levels: [4, 5, 6],
      option_ids: ["gisselmartes", "gisselmiercoles"],
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
      option_ids: ["sergiolunes", "jessicamiercoles", "gisseljueves"],
    },
  ],
  options: [
    {
      id: "carloslunes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MTU0NzM2MzkzOTY3?cjc=txkvhcl",
    },
    {
      id: "brendalunes",
      teacher_id: "brenda",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "conversation",
      url:
        "https://us04web.zoom.us/j/77370162343?pwd=VFpCS2xqejF1blJvY2t4OWk1c3RtQT09",
    },
    {
      id: "zulletlunes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "basicadvancedlistening",
      url: "https://classroom.google.com/c/MjI0NzkzNjM4NjU2?cjc=3pqkhy4",
    },
    {
      id: "erickalunes",
      teacher_id: "ericka",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
      url: "https://udg-mx.zoom.us/u/kdPy130e6a",
    },
    {
      id: "sergiolunes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "tutoring",
      url: "https://meet.google.com/yvi-qirh-gbs",
    },
    {
      id: "gisselmartes",
      teacher_id: "gissel",
      time: "11:00 - 12:00",
      day: "martes",
      workshop_id: "advancedreading",
      url: "https://classroom.google.com/u/1/c/MjcwMzg3ODY3MjM4",
    },
    {
      id: "carlosmartes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MTU0NzM2MzkzOTY3?cjc=txkvhcl",
    },
    {
      id: "zulletmartes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "basicadvancedlistening",
      url: "https://classroom.google.com/c/MjI0NzkzNjM4NjU2?cjc=3pqkhy4",
    },
    {
      id: "erickamartes",
      teacher_id: "ericka",
      time: "13:00 - 14:00",
      day: "martes",
      workshop_id: "conversation",
      url: "https://udg-mx.zoom.us/u/kdPy130e6a",
    },
    {
      id: "sergiomartes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "martes",
      workshop_id: "conversation",
      url: "https://meet.google.com/yvi-qirh-gbs",
    },
    {
      id: "jessicamartes",
      teacher_id: "jessica",
      time: "16:00 - 17:00",
      day: "martes",
      workshop_id: "conversation",
      url:
        "https://us04web.zoom.us/j/5461493724?pwd=djBZZFVSUWJuNG5kSVhkSGVUWnA1QT09",
    },
    {
      id: "gisselmiercoles",
      teacher_id: "gissel",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "advancedreading",
      url: "https://classroom.google.com/u/1/c/MjcwMzg3ODY3MjM4",
    },
    {
      id: "brendamiercoles",
      teacher_id: "brenda",
      time: "11:00 - 12:00",
      day: "miercole",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MjczODExMzE2NzEw?cjc=puxzawj",
    },
    {
      id: "jessicamiercoles",
      teacher_id: "jessica",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "tutoring",
      url:
        "https://us04web.zoom.us/j/5461493724?pwd=djBZZFVSUWJuNG5kSVhkSGVUWnA1QT09",
    },
    {
      id: "carlosmiercoles",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "miercoles",
      workshop_id: "conversation",
      url:
        "https://us02web.zoom.us/j/86845226720?pwd=dTVmbllvaXpDLzJneDV1TEVVVU83Zz09",
    },
    {
      id: "erickamiercoles",
      teacher_id: "ericka",
      time: "13:00 - 14:00",
      day: "miercoles",
      workshop_id: "basicreading",
      url: "classroom",
      zoom_id: "4ty4g44",
    },
    {
      id: "sergiomiercoles",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "miercoles",
      workshop_id: "conversation",
      url: "https://meet.google.com/yvi-qirh-gbs",
    },
    {
      id: "brendajueves",
      teacher_id: "brenda",
      time: "11:00 - 12:00",
      day: "jueves",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MjczODExMzE2NzEw?cjc=puxzawj",
    },
    {
      id: "gonzalojueves",
      teacher_id: "gonzalo",
      time: "15:00 - 16:00",
      day: "jueves",
      workshop_id: "conversation",
      url: "http://meet.google.com/lookup/gonzaloconversation",
    },
    {
      id: "gisseljueves",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "jueves",
      workshop_id: "tutoring",
      url: "https://meet.google.com/nrb-bdav-hru",
    },
    {
      id: "jessicajueves",
      teacher_id: "jessica",
      time: "16:00 - 17:00",
      day: "jueves",
      workshop_id: "conversation",
      url:
        "https://us04web.zoom.us/j/5461493724?pwd=djBZZFVSUWJuNG5kSVhkSGVUWnA1QT09",
    },
  ],
  teachers: [
    {
      id: "jessica",
      name: "Jessica",
      options: ["jessicamartes", "jessicamiercoles", "jessicajueves"],
    },
    {
      id: "ericka",
      name: "Ericka",
      options: ["erickalunes", "erickamartes", "erickamiercoles"],
    },
    {
      id: "gonzalo",
      name: "Gonzalo",
      options: ["gonzalojueves"],
    },
    {
      id: "sergio",
      name: "Sergio",
      options: ["sergiolunes", "sergiomartes", "sergiomiercoles"],
    },
    {
      id: "gissel",
      name: "Gissel",
      options: ["gisselmartes", "gisseljueves", "gisselmiercoles"],
    },
    {
      id: "carlos",
      name: "Carlos",
      options: ["carloslunes", "carlosmartes", "carlosmiercoles"],
    },
    {
      id: "zullet",
      name: "Zullet",
      options: ["zulletlunes", "zulletmartes"],
    },
    {
      id: "brenda",
      name: "Brenda",
      options: ["brendalunes", "brendamiercoles", "brendajueves"],
    },
  ],
};

export default database;
