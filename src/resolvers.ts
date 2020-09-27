export {};
const db = require("./db");

const baseUrl = "/workshops";

const getById = (key: string, id: string) =>
  db[key].filter((item) => item.id === id)[0];

const generateId = () => {
  let str = Math.random().toString(36).substring(7);
  return str;
};

const firebaseQuery = (context: { firebaseClient }, endpoint: string) => {
  const finalEndpoint =
    endpoint.charAt(0) === "/" ? endpoint : "/".concat(endpoint);
  const baseUrl = "/workshops";
  return context.firebaseClient
    .database()
    .ref(`${baseUrl}${finalEndpoint}`)
    .once("value")
    .then((snapshot) => snapshot.val());
};

const resolvers = {
  Query: {
    workshops: () => db.workshops,
    workshop: (_, args) => getById("workshops", args.id),
    options: () => db.options,
    option: (_, args) => getById("options", args.id),
    applicants: async (_, __, context) => {
      const data = await firebaseQuery(context, "/applicants");
      return Object.values(data);
    },
    applicant: async (_, args, context) => {
      const data = await firebaseQuery(context, `/applicants/${args.id}`);
      return data;
    },
    teachers: () => db.teachers,
    teacher: (_, args) => getById("teachers", args.id),
  },
  Mutation: {
    makeReservation: async (_, args, context) => {
      const reservationId = generateId();
      const reservation = {
        id: reservationId,
        code: args.code,
        name: args.name,
        option_id: args.option_id,
        workshop_id: args.workshop_id,
      };
      context.firebaseClient
        .database()
        .ref(`${baseUrl}/applicants/${reservationId}`)
        .set(reservation);
      return reservation;
    },
  },
  Applicant: {
    option: (obj) => getById("options", obj.option_id),
  },
  Option: {
    workshop: (obj) => getById("workshops", obj.workshop_id),
    teacher: (obj) => obj.teacher_id,
  },
  Teacher: {
    options: (obj) =>
      db.options.filter((option) => option.teacher_id === obj.id),
    reservations: async (obj, __, context) => {
      const data = await firebaseQuery(context, "/applicants");
      return Object.values(data).filter((applicant) =>
        new RegExp(obj.id).test(applicant.option_id)
      );
    },
    reservations_by_day: async (obj, args, context) => {
      const { day } = args;
      const teacher = obj.id;
      const regex = new RegExp(`${teacher}${day}`);
      const data = await firebaseQuery(context, "/applicants");
      return data.filter((applicant) => regex.test(applicant.option_id));
    },
  },
};

module.exports = resolvers;
