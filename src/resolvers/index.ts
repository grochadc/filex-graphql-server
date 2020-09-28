export {};
const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const db = require("../datasources/db");
const masterlist = require("../datasources/masterlist.js");
const { firebaseQuery, getById } = require("../utils");

interface ReservationFromDb {
  code: string;
  name: string;
  timestamp: string;
  option_id: string;
}

const resolvers = {
  Query,
  Mutation,
  Workshop: {
    options: (obj) => obj.option_ids.map((id) => getById(db, "options", id)),
  },
  Reservation: {
    option: (obj) => getById(db, "options", obj.option_id),
  },
  Option: {
    workshop: (obj) => obj.workshop_id,
    teacher: (obj) => obj.teacher_id,
  },
  Teacher: {
    options: (obj) =>
      db.options.filter((option) => option.teacher_id === obj.id),
    reservations: async (obj, __, context) => {
      const data = await firebaseQuery(context, "/applicants");
      return Object.values(data).filter((reservation: ReservationFromDb) =>
        new RegExp(obj.id).test(reservation.option_id)
      );
    },
    reservations_by_day: async (obj, args, context) => {
      const { day } = args;
      const teacher = obj.id;
      const regex = new RegExp(`${teacher}${day}`);
      const data = await firebaseQuery(context, "/applicants");
      return data.filter((reservation: ReservationFromDb) =>
        regex.test(reservation.option_id)
      );
    },
  },
};

module.exports = resolvers;
