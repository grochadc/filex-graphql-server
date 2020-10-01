const { generateId, getById } = require("../utils");
const db = require("../datasources/db");
const utils = require("../utils");

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
    };
    const teacher_endpoint = utils.getById(db, "options", args.option_id)
      .teacher_id;
    await dataSources.firebaseAPI.makeReservation(
      teacher_endpoint,
      reservation
    );
    return reservation;
  },
};

export = Mutation;
