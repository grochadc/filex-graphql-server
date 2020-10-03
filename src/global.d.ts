interface Student {
  code: string;
  name: string;
  first_last_name: string;
  second_last_name: string;
  gender: string;
  ciclo: string;
  career: string;
  telephone: string;
  email: string;
  level: number;
  group: string;
  id: string;
}

type Option = {
  id: string;
  teacher_id: string;
  time: string;
  day: "lunes" | "martes" | "miercoles" | "jueves";
  url: string;
  workshop_id: "conversation" | "toeflpreparation" | "basicreading" | "basicadvancedlistening" | "tutoring";
  zoom_id?: string;
}

type Teacher = {
  id: string;
  name: string;
  options: string[];
};
