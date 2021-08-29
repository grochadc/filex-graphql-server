import Database from "./databaseCreator";
const db = {
  dev: {
    schedules: ["schedule1"],
    user: {
      name: "gonzo"
    },
    deeper: {
      another: {
        level: "4"
      }
    }
  }
};

test("works!", () => {
  const database = new Database(db);
  expect(database.get("dev/user/name")).toBe("gonzo");
  expect(database.get("/dev/user/name")).toBe("gonzo");
  expect(database.get("dev/schedules/0")).toBe("schedule1");
  expect(database.get("dev/deeper.json")).toStrictEqual({
    another: { level: "4" }
  });
});
