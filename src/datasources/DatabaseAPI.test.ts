import DatabaseAPI, {
  OptionModel,
  SIMPLE_TEACHER_INFO,
  SimpleTeacherInfo
} from "./DatabaseAPI";

const database = new DatabaseAPI({});

test("getTeacher", async () => {
  database._getTeacher = jest.fn(() => {
    return Promise.resolve([
      {
        day: "Miercoles",
        id: 4,
        name: "Gonzalo",
        option_id: 7,
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Jueves",
        id: 4,
        name: "Gonzalo",
        option_id: 8,
        time: "13:00 - 14:00",
        url: "https://meet.google.com/ukv-avjt-qiy",
        workshop_id: 3,
        workshop_name: "Conversation"
      },
      {
        day: "Martes",
        id: 4,
        name: "Gonzalo",
        option_id: 22,
        time: "13:00 - 14:00",
        url: "https://meet.google.com/kux-jhii-eyi",
        workshop_id: 4,
        workshop_name: "Tutoring"
      }
    ]);
  });

  const res = await database.getTeacher("4");
  console.log(res);
  expect(0).toBe(0);
});

test("works", async () => {
  database.db.many = jest.fn(() => {
    const result: OptionModel[] = [
      {
        id: 1,
        workshop_name: "Conversation",
        teacher_name: "Fulanito",
        day: "Lunes",
        time: "13:00 - 14:00",
        url: "https://.com",
        workshop_description: "Some description",
        workshop_levels: [1, 2, 3, 4, 5, 6],
        teacher_id: 1,
        workshop_id: 1,
        reservations: 0
      },
      {
        id: 2,
        workshop_name: "Tutorials",
        teacher_name: "Fulanito",
        day: "Lunes",
        time: "13:00 - 14:00",
        url: "https://.com",
        workshop_description: "Some description",
        workshop_levels: [1, 2, 3, 4, 5, 6],
        teacher_id: 1,
        workshop_id: 2,
        reservations: 0
      },
      {
        id: 2,
        workshop_name: "Tutorials",
        teacher_name: "Fulanito",
        day: "Lunes",
        time: "13:00 - 14:00",
        url: "https://.com",
        workshop_description: "Some description",
        workshop_levels: [1, 2, 3, 4, 5, 6],
        teacher_id: 1,
        workshop_id: 3,
        reservations: 0
      }
    ];
    return Promise.resolve(result);
  });
  const workshops = await database.getAllWorkshops(30);
  expect(workshops).toHaveLength(3);
});
