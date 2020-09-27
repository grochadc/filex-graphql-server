export {};
const db = require("./db");

const getById = (key: string, id: string) =>
  db[key].filter((item) => item.id === id)[0];

module.exports = {
  Query: {
    workshops: () => db.workshops,
    workshop: (_, args) => getById("workshops", args.id),
    options: () => db.options,
    option: (_, args) => getById("options", args.id),
    applicants: () => db.applicants,
    applicant: (_, args) => getById("applicants", args.id),
    teachers: () => db.teachers,
    teacher: (_, args) => getById("teachers", args.id),
  },
  Applicant: {
    option: (obj) => getById("options", obj.option_id),
  },
  Option: {
    workshop: (obj) => getById("workshops", obj.workshop_id),
  },
  Teacher: {
    options: (obj) =>
      db.options.filter((option) => option.teacher_id === obj.id),
    reservations: (obj) =>
      db.applicants.filter((applicant) =>
        new RegExp(obj.id).test(applicant.option_id)
      ),
    reservations_by_day: (obj, args) => {
      const { day } = args;
      const teacher = obj.id;
      const regex = new RegExp(`${teacher}${day}`);
      return db.applicants.filter((applicant) =>
        regex.test(applicant.option_id)
      );
    },
  },
};
