import { Student } from "generated/graphql";
export function sortWorkshops(options) {
  const dict = {
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4
  };

  const byDay = (a, b) => {
    const left = dict[a.day];
    const right = dict[b.day];
    return left - right;
  };
  const byTime = (a, b) => {
    return Number(a.time.substring(0, 2)) - Number(b.time.substring(0, 2));
  };
  const sortedByDay = options.slice().sort(byDay);
  const sortedByTime = sortedByDay.slice().sort(byTime);
  return sortedByTime;
}

export function sortStudents(students: any[]) {
  const byName = (
    left: { nombre: string },
    right: { nombre: string }
  ): number => {
    return left.nombre.localeCompare(right.nombre);
  };
  return students.sort(byName);
}
