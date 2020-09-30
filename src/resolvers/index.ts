const utils = require("../utils");
const db = require("../datasources/db");
const Query = require("./Query");
const Mutation = require("./Mutation");

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
    reservations: async (obj, __, { dataSources }) => {
      const data = await dataSources.firebaseAPI.getReservations(obj.id);
      return Object.values(data);
    },
  },
};

export = resolvers;
