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
  options: Option[];
  teachers: Teacher[];
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
  ],
  options: [
    {
      id: "alondralunes",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
      url: "https://meet.google.com/lookup/fnms6k7cad",
    },
    {
      id: "alondramartes",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "martes",
      workshop_id: "conversation",
      url: "https://meet.google.com/lookup/fnms6k7cad",
    },
    {
      id: "sergiomartes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "martes",
      workshop_id: "conversation",
      url: "https://meet.google.com/psr-adqx-ebv",
    },
    {
      id: "gisselmartes",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "martes",
      workshop_id: "conversation",
      url: "meet.google.com/ujd-dwfz-hpp",
    },
    {
      id: "carlosmiercoles",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "miercoles",
      workshop_id: "conversation",
      url:
        "https://us02web.zoom.us/j/86845226720?pwd=dTVmbllvaXpDLzJneDV1TEVVVU83Zz09",
      zoom_id: "3175",
    },
    {
      id: "sergiomiercoles",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "miercoles",
      workshop_id: "conversation",
      url: "https://meet.google.com/psr-adqx-ebv",
    },
    {
      id: "gisselmiercoles",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "miercoles",
      workshop_id: "conversation",
      url: "meet.google.com/ujd-dwfz-hpp",
    },
    {
      id: "gonzalojueves",
      teacher_id: "gonzalo",
      time: "14:00 - 15:00",
      day: "jueves",
      workshop_id: "conversation",
      url: "https://meet.google.com/wbu-jzfw-hbs",
    },
    {
      id: "zulletjueves",
      teacher_id: "zullet",
      time: "13:00 - 14:00",
      day: "jueves",
      workshop_id: "conversation",
      url: "https://meet.google.com/lookup/hajdogn5gm",
    },
    {
      id: "carloslunes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "toeflpreparation",
      url:
        "https://us02web.zoom.us/j/86597209094?pwd=cHRQQkZsQmVnamtXYVJqQ0V2L1dFZz09",
      zoom_id: "3175",
    },
    {
      id: "carlosmartes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "toeflpreparation",
      url:
        "https://us02web.zoom.us/j/86597209094?pwd=cHRQQkZsQmVnamtXYVJqQ0V2L1dFZz09",
      zoom_id: "3175",
    },
    {
      id: "brendamiercoles",
      teacher_id: "brenda",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MTgyNjAyMjUzMjU1?cjc=to7s5ow",
    },
    {
      id: "brendajueves",
      teacher_id: "brenda",
      time: "11:00 - 12:00",
      day: "jueves",
      workshop_id: "toeflpreparation",
      url: "https://classroom.google.com/c/MTgyNjAyMjUzMjU1?cjc=to7s5ow",
    },
    {
      id: "brendamartes",
      teacher_id: "brenda",
      time: "11:00 - 12:00",
      day: "martes",
      workshop_id: "advancedreading",
      url: "https://meet.google.com/bdo-ejjr-uwv",
    },
    {
      id: "alondramiercoles",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "miercoles",
      workshop_id: "basicreading",
      url: "https://classroom.google.com/c/MTc4NjI5MDcxMDM4?cjc=i464gik",
    },
    {
      id: "zulletlunes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "basicadvancedlistening",
      url: "https://classroom.google.com/c/MTM5MTQxNjg1Mjkw?cjc=p2hpkdw",
    },
    {
      id: "zulletmartes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "basicadvancedlistening",
      url: "https://classroom.google.com/c/MTM5MTQxNjg1Mjkw?cjc=p2hpkdw",
    },
    {
      id: "sergiolunes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "tutoring",
      url: "https://meet.google.com/mxs-brnf-mug",
    },
    {
      id: "gissellunes",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "lunes",
      workshop_id: "tutoring",
      url: "meet.google.com/nbn-vcnq-wpo",
    },
    {
      id: "zulletmiercoles",
      teacher_id: "zullet",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "tutoring",
      url: "https://meet.google.com/lookup/f72kstl6px",
    },
  ],
  teachers: [
    {
      id: "alondra",
      name: "Alondra",
      options: ["alondralunes", "alondramartes", "alondramiercoles"],
    },
    {
      id: "gonzalo",
      name: "Gonzalo",
      options: ["gonzalolunes", "gonzalojueves"],
    },
    {
      id: "sergio",
      name: "Sergio",
      options: ["sergiolunes", "sergiomartes", "sergiomiercoles"],
    },
    {
      id: "gissel",
      name: "Gissel",
      options: ["gissellunes", "gisselmartes", "gisselmiercoles"],
    },
    {
      id: "carlos",
      name: "Carlos",
      options: ["carloslunes", "carlosmartes", "carlosmiercoles"],
    },
    {
      id: "zullet",
      name: "Zullet",
      options: [
        "zulletlunes",
        "zulletmartes",
        "zulletmiercoles",
        "zulletjueves",
      ],
    },
    {
      id: "brenda",
      name: "Brenda",
      options: ["brendamiercoles", "brendajueves"],
    },
  ],
};

module.exports = database;
