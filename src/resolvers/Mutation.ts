const { generateId } = require("../utils");

const baseUrl = "/workshops";
const Mutation = {
  makeReservation: async (_, args, context) => {
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
    context.firebaseClient
      .database()
      .ref(`${baseUrl}/applicants/${reservationId}`)
      .set(reservation);
    return reservation;
  },
};

export = Mutation;
