export {};
const getById = (obj: any, key: string, id: string) =>
  obj[key].filter((item) => item.id === id)[0];

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

const firebaseQuery = (context: { firebaseClient }, endpoint: string) => {
  const finalEndpoint =
    endpoint.charAt(0) === "/" ? endpoint : "/".concat(endpoint);
  const baseUrl = "/workshops";
  return context.firebaseClient
    .database()
    .ref(`${baseUrl}${finalEndpoint}`)
    .once("value")
    .then((snapshot) => snapshot.val());
};

module.exports = { getById, generateId, firebaseQuery };
