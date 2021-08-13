import { getOddItem } from "./getOddItem";

const serverLinks = [
  { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
  { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
  { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
];

test("returns the odd item index 1", () => {
  const localLinks = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "newteacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
  ];
  expect(getOddItem(serverLinks, localLinks)).toStrictEqual({
    id: "b",
    link: "newteacher2url",
    teacher: "teacher2",
    active: true,
  });
});

test("a single new link was added", () => {
  const localLinks = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
    { id: "d", link: "teacher4url", teacher: "teacher4", active: true },
  ];
  expect(getOddItem(serverLinks, localLinks)).toStrictEqual({
    id: "d",
    link: "teacher4url",
    teacher: "teacher4",
    active: true,
  });
});

test("two links were modified", () => {
  const localLinks = [
    { id: "a", link: "newteacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: false },
  ];
  expect(getOddItem(serverLinks, localLinks)).toStrictEqual([
    { id: "a", link: "newteacher1url", teacher: "teacher1", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: false },
  ]);
});

test("two new links were added", () => {
  const localLinks = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
    { id: "d", link: "teacher4url", teacher: "teacher4", active: true },
    { id: "e", link: "teacher5url", teacher: "teacher5", active: true },
  ];
  expect(getOddItem(serverLinks, localLinks)).toStrictEqual([
    { id: "d", link: "teacher4url", teacher: "teacher4", active: true },
    { id: "e", link: "teacher5url", teacher: "teacher5", active: true },
  ]);
});
