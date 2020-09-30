const dB = require("../datasources/db");
const masterList = require("../datasources/masterlist.js");
const utils = require("../utils");

const query = {
  workshops: () => dB.workshops,
  workshop: (_, args) => utils.getByID(dB, "workshops", args.id),
  options: () => dB.options,
  option: (_, args) => utils.getByID(dB, "options", args.id),
  reservations: async (_, __, { dataSources }) => {
    const data = await dataSources.firebaseAPI.getReservations();
    return Object.values(data);
  },
  teachers: () => dB.teachers,
  teacher: (_, args) => utils.getByID("teachers", args.id),
  students: () => masterlist.students,
  student: (_, args) => {
    return masterlist.students.filter((item) => args.code === item.code)[0];
  },
};

module.exports = query;
