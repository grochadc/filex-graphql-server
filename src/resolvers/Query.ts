const db = require("../datasources/db");
const masterlist = require("../datasources/masterlist.js");
const getById = (key: string, id: string) =>
  db[key].filter((item) => item.id === id)[0];

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

const Query = {
  workshops: () => db.workshops,
  workshop: (_, args) => getById("workshops", args.id),
  options: () => db.options,
  option: (_, args) => getById("options", args.id),
  reservations: async (_, __, context) => {
    try {
      const data = await firebaseQuery(context, "/applicants");
      return Object.values(data);
    } catch (error) {
      console.log(error);
    }
  },
  reservation: async (_, args, context) => {
    const data = await firebaseQuery(context, `/applicants/${args.id}`);
    return data;
  },
  teachers: () => db.teachers,
  teacher: (_, args) => getById("teachers", args.id),
  students: () => masterlist.students,
  student: (_, args) => {
    return masterlist.students.filter((item) => args.code === item.code)[0];
  },
};

module.exports = { Query };
