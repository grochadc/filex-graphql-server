export {};
const getByID = (obj: any, key: string, id: string) => {
  console.log("Called getById for", key);
  return obj[key].filter((item) => item.id === id)[0];
};

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

module.exports = { getByID, generateId };
