type WorkshopId =
  | "conversation"
  | "toeflpreparation"
  | "basicreading"
  | "basicadvancedlistening"
  | "tutoring";

interface Workshop {
  id: WorkshopId;
  name: string;
  description: string;
}

interface WorkshopOption {
  id: string;
  teacher_id: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  workshop_id: WorkshopId;
}

interface Applicant {
  id: string;
  code: string;
  name: string;
  workshop_id: WorkshopId;
  option_id: string;
}

type Teacher = {
  id: string;
  name: string;
  options: string[];
};

const db: {
  workshops: Workshop[];
  options: WorkshopOption[];
  applicants: Applicant[];
  teachers: Teacher[];
} = {
  workshops: [
    {
      id: "conversation",
      name: "Conversation",
      description:
        "El alumno se expresa oralmente utilizando las funciones comunicativas y vocabulario adquirido, mejorar la fluidez, y perder el temor a hablar.",
    },
    {
      id: "toeflpreparation",
      name: "TOEFL Preparation",
      description:
        "Ayuda a desarrollar habilidades para el examen de certificación, a partir del dominio ya adquirido del idioma. Duracion: 1 mes.",
    },
    {
      id: "basicreading",
      name: "Basic Reading",
      description:
        "Lectura de textos e historias sencillas para trabajar con vocabulario y lectura de comprensión. Niveles 1-3",
    },
    {
      id: "basicadvancedlistening",
      name: "Basic/Advanced Listening",
      description:
        "Ayuda a desarrollar la habilidad de comprensión de escucha por medio de audios. Basic: Niveles 1-3; Advanced: Niveles 4-6",
    },
    {
      id: "tutoring",
      name: "Tutoring",
      description:
        "Es un proceso de acompañamiento, aclarando dudas. El alumno deberá saber exactamente el tema a repasar.",
    },
  ],
  options: [
    {
      id: "alondralunes",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      id: "gonzalolunes",
      teacher_id: "gonzalo",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      id: "alondramartes",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "sergiomartes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "gisselmartes",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "carlosmiercoles",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "sergiomiercoles",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "gisselmiercoles",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "gonzalojueves",
      teacher_id: "gonzalo",
      time: "14:00 - 15:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      id: "zulletjueves",
      teacher_id: "zullet",
      time: "13:00 - 14:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      id: "carloslunes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "toeflpreparation",
    },
    {
      id: "carlosmartes",
      teacher_id: "carlos",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "toeflpreparation",
    },
    {
      id: "jiselainemiercoles",
      teacher_id: "jiselaine",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "toeflpreparation",
    },
    {
      id: "jiselainejueves",
      teacher_id: "jiselaine",
      time: "11:00 - 12:00",
      day: "jueves",
      workshop_id: "toeflpreparation",
    },
    {
      id: "alondramiercoles",
      teacher_id: "alondra",
      time: "13:00 - 14:00",
      day: "miercoles",
      workshop_id: "basicreading",
    },
    {
      id: "zulletlunes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "basicadvancedlistening",
    },
    {
      id: "zulletmartes",
      teacher_id: "zullet",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "basicadvancedlistening",
    },
    {
      id: "sergiolunes",
      teacher_id: "sergio",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      id: "gissellunes",
      teacher_id: "gissel",
      time: "16:00 - 17:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      id: "zulletmiercoles",
      teacher_id: "zullet",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "tutoring",
    },
  ],
  applicants: [
    {
      id: "4kmlkb",
      code: "52841",
      name: "Juan Gabriel",
      workshop_id: "conversation",
      option_id: "alondralunes",
    },
    {
      id: "qaveis",
      code: "12345",
      name: "Pedro Paramo",
      workshop_id: "conversation",
      option_id: "alondramartes",
    },
    {
      id: "rww626",
      code: "54321",
      name: "Lenin",
      workshop_id: "conversation",
      option_id: "alondralunes",
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
      id: "jiselaine",
      name: "Jiselaine",
      options: ["jiselainemiercoles", "jiselainejueves"],
    },
  ],
};

module.exports = db;
