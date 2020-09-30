const db = require("../datasources/db");
const masterlist = require("../datasources/masterlist.js");
const utils = require("../utils");

const Query = {
  workshops: () => db.workshops,
  workshop: (_, args) =>
    utils.getById(db, "workshops", args.id, () =>
      console.log("Called by Query.workshop")
    ),
  options: () => db.options,
  option: (_, args) =>
    utils.getById(db, "options", args.id, () =>
      console.log("Called by Query.option")
    ),
  reservations: async (_, __, { dataSources }) => {
    const data = await dataSources.firebaseAPI.getReservations();
    return Object.values(data);
  },
  teachers: () => db.teachers,
  teacher: (_, args) =>
    utils.getById(db, "teachers", args.id, () =>
      console.log("Called by Query.teacher")
    ),
  students: () => masterlist.students,
  student: (_, args) => {
    return masterlist.students.filter((item) => args.code === item.code)[0];
  },
};

export = Query;
