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
