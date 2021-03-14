const { groupBy } = require("ramda");
export const getById = (
  obj: any,
  key: string,
  id: string,
  callback: () => void
) => {
  if (callback) callback();
  const data = obj[key].filter((item) => {
    return item.id === id;
  });
  if (data.length === 0) throw new Error(`Couldn't find ${id} in ${key}`);
  return data[0];
};

export const getByIds = (arr: any[], ids: string[]) => {
  return arr.filter((item) => ids.indexOf(item.id) > -1);
};

export const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

export const createMatrix = (arr) => {
  return arr.map((item) => Object.values(item));
};

type WorkshopId =
  | "conversation"
  | "toeflpreparation"
  | "basicreading"
  | "basicadvancedlistening"
  | "advancedreading"
  | "tutoring";

interface WorkshopOption {
  id: WorkshopId;
  name: string;
  description: string;
  levels: number[];
  option_ids: string[];
}
export const mapOptionIds = (options: WorkshopOption[], option_ids: string[]) =>
  option_ids.map((id) => options.filter((option) => option.id === id)[0]);

interface Option {
  id: string;
  teacher_id: string;
  time: string;
  day: string;
  workshop_id: string;
  url: string;
}

interface Teacher {
  id: string;
  name: string;
  options: string[];
}

export const mapOptionsTeacher = (options: Option[], teachers: Teacher[]) =>
  options.map(
    (option) =>
      teachers.filter((teacher) => teacher.id === option.teacher_id)[0]
  );
