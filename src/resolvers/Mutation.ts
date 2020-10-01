const { generateId, getById } = require("../utils");
const db = require("../datasources/db");

const baseUrl = "/workshops";
const Mutation = {
  makeReservation: async (_, args, { dataSources }) => {
    const date = new Date();
    const timestamp = date.toJSON();
    const reservationId = generateId();
    const reservation = {
      id: reservationId,
      code: args.code,
      name: args.name,
      timestamp,
      option_id: args.option_id,
      workshop_id: args.workshop_id,
      teacher_id: args.teacher_id,
    };
    console.log("Using datasource post");
    await dataSources.firebaseAPI.makeReservation(args.teacher_id, reservation);
    return reservation;
  },
};

export = Mutation;
