const { generateId, getById } = require("../utils");
const db = require("../datasources/db");
const utils = require("../utils");
const sheetsAPI = require("../sheetsAPI");

const baseUrl = "/workshops";
const Mutation = {
  makeReservation: async (_, args, { dataSources }) => {
    await dataSources.firebaseAPI.addRegistered(args.option_id);
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
  saveAttendance: (_, args) => {
    const matrix = utils.createMatrix(args.input);
    console.log("Posting to sheet", matrix);
    sheetsAPI.update(
      "1MeP4aiVl0iIwFAjXcaGzRBKMSvDllYVW-fXhYEa4EsY",
      matrix,
      "attendance!A1"
    );
    return {
      status: 200,
      message: "Attendance saved succesfully",
    };
  },
};

export = Mutation;
