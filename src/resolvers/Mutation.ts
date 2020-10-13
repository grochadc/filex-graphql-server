const { generateId, getById } = require("../utils");
const db = require("../datasources/db");
const utils = require("../utils");
const sheetsAPI = require("../sheetsAPI");

const Mutation = {
  makeReservation: async (
    _,
    { input }: { input: Reservation },
    { dataSources }
  ) => {
    const date = new Date();
    const reservation: ReservationForDb = {
      id: generateId(),
      timestamp: date.toJSON(),
      ...input
    };
    const option: Option = utils.getById(db, "options", input.option_id);
    await dataSources.firebaseAPI.makeReservation(
      option.teacher_id,
      reservation,
      option.id
    );
    return {...reservation, url: option.url, zoom_id: option.zoom_id};
  },
  saveAttendance: (_, args: { input: any[] }) => {
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
