const utils = require("../utils");
const db = require("../datasources/db");
const Query = require("./Query");
const Mutation = require("./Mutation");

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
    options: (obj) =>
      obj.option_ids.map((id) =>
        utils.getById(db, "options", id, () =>
          console.log("Called by Workshop.options")
        )
      ),
  },
  Reservation: {
    option: (obj, _, { loaders }) => loaders.optionLoader.load(obj.option_id),
  },
  Option: {
    workshop: (obj) => obj.workshop_id,
    teacher: (obj) => obj.teacher_id,
  },
  Teacher: {
    options: (obj) => {
      return db.options.filter((option) => option.teacher_id === obj.id);
    },
    reservations: async (_, __, { dataSources }) => {
      const data = await dataSources.firebaseAPI.getReservations();
      return Object.values(data);
    },
  },
};

export = resolvers;
