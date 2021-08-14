const { groupBy } = require("ramda");
const { Option } = require("../datasources/db");
type MatcherFn = (iteration: any, actual: any) => boolean;
import { MeetLink } from "../types/index";

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
}
export const mapOptionIds = (options: Option[], option_ids: string[]) =>
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

export function getIndexToModify(
  item: any,
  array: any[],
  matcher: MatcherFn = (iteration, actual) => iteration === actual
): number {
  const reducedIndex = array.reduce(
    (acc, curr, index) => (matcher(curr, item) ? index : acc + 0),
    -1
  );
  return reducedIndex > -1 ? reducedIndex : array.length;
}

export function addIDsToLinks(links: MeetLink[]): MeetLink[] {
  const anyUndefined = links.some((link) => link.id === undefined);
  if (anyUndefined) {
    return links.map((link) =>
      link.id === undefined ? { ...link, id: generateId() } : link
    );
  }
  return links;
}
