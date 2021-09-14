import { DatabaseAPI, OptionModel } from "./DatabaseAPI";

const database = new DatabaseAPI({});

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
