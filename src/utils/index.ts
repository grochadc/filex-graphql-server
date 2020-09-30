const { groupBy } = require("ramda");
const getById = (obj: any, key: string, id: string, callback: () => void) => {
  console.log("Called getById for", key);
  if (callback) callback();
  return obj[key].filter((item) => item.id === id)[0];
};

const getByIds = (arr: any[], ids: string[], callback: () => void) => {
  if (callback) callback();
  return arr.filter((item) => ids.indexOf(item.id) > -1);
};

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

export = { getById, getByIds, generateId };
