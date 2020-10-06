const db = require("../datasources/db");
const masterlist = require("../datasources/masterlist");
const utils = require("../utils");

const Query = {
  workshops: () => db.workshops,
  workshop: (_, args) =>
    utils.getById(db, "workshops", args.id, () =>
      console.log("Called by Query.workshop")
    ),
  options: (_, args) => {
    if (args.workshop_id)
      return db.options.filter(
        (option: Option) => option.workshop_id === args.workshop_id
      );
    return db.options;
  },
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
  student: (_, args) => utils.getById(masterlist, "students", args.code),
};

export = Query;
