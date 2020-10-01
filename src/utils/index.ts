const { groupBy } = require("ramda");
const getById = (obj: any, key: string, id: string, callback: () => void) => {
  if (callback) callback();
  const data = obj[key].filter((item) => {
    return item.id === id;
  });
  if (data.length === 0) throw new Error(`Couldn't find ${id} in ${key}`);
  return data[0];
};

const getByIds = (arr: any[], ids: string[], callback: () => void) => {
  if (callback) callback();
  return arr.filter((item) => ids.indexOf(item.id) > -1);
};

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

const createMatrix = (arr) => {
  return arr.map((item) => Object.values(item));
};

export = { getById, getByIds, generateId, createMatrix };
