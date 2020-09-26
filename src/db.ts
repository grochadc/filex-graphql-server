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
  teacher: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  workshop_id: WorkshopId;
}

export interface Applicant {
  id: string;
  code: string;
  name: string;
  workshop_id: WorkshopId;
  option_id: string;
}

const db: {
  workshops: Workshop[];
  options: WorkshopOption[];
  applicants: Applicant[];
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
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      id: "gonzalolunes",
      teacher: "gonzalo",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "conversation",
    },
    {
      id: "alondramartes",
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "sergiomartes",
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "gisselmartes",
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "martes",
      workshop_id: "conversation",
    },
    {
      id: "carlosmiercoles",
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "sergiomiercoles",
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "gisselmiercoles",
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "miercoles",
      workshop_id: "conversation",
    },
    {
      id: "gonzalojueves",
      teacher: "gonzalo",
      time: "14:00 - 15:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      id: "zulletjueves",
      teacher: "zullet",
      time: "13:00 - 14:00",
      day: "jueves",
      workshop_id: "conversation",
    },
    {
      id: "carloslunes",
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "toeflpreparation",
    },
    {
      id: "carlosmartes",
      teacher: "carlos",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "toeflpreparation",
    },
    {
      id: "jiselainemiercoles",
      teacher: "jiselaine",
      time: "11:00 - 12:00",
      day: "miercoles",
      workshop_id: "toeflpreparation",
    },
    {
      id: "jiselainejueves",
      teacher: "jiselaine",
      time: "11:00 - 12:00",
      day: "jueves",
      workshop_id: "toeflpreparation",
    },
    {
      id: "alondramiercoles",
      teacher: "alondra",
      time: "13:00 - 14:00",
      day: "miercoles",
      workshop_id: "basicreading",
    },
    {
      id: "zulletlunes",
      teacher: "zullet",
      time: "12:00 - 13:00",
      day: "lunes",
      workshop_id: "basicadvancedlistening",
    },
    {
      id: "zulletmartes",
      teacher: "zullet",
      time: "12:00 - 13:00",
      day: "martes",
      workshop_id: "basicadvancedlistening",
    },
    {
      id: "sergiolunes",
      teacher: "sergio",
      time: "14:00 - 15:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      id: "gissellunes",
      teacher: "gissel",
      time: "16:00 - 17:00",
      day: "lunes",
      workshop_id: "tutoring",
    },
    {
      id: "zulletmiercoles",
      teacher: "zullet",
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
};

export default db;
