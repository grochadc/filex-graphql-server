import { generateId } from "../index";
import { addIDsToLinks as linksToReturn } from "../index";

//Typescript is yelling about different types of MeetLink defined here and in /types
type MeetLink = any;

function getLinksWithID(): MeetLink[] {
  return [
    { id: "1", teacher: "teacher 1", link: "url1", active: false },
    { id: "2", teacher: "teacher 2", link: "url2", active: false },
  ];
}

function getLinksWithoutID(): MeetLink[] {
  return [
    { teacher: "teacher 1", link: "url1", active: false },
    { teacher: "teacher 2", link: "url2", active: false },
  ];
}

function getLinksWithSomeIDs(): MeetLink[] {
  return [
    { teacher: "teacher 1", link: "url1", active: false },
    { id: "2", teacher: "teacher 2", link: "url2", active: false },
    { teacher: "teacher 3", link: "url3", active: false },
  ];
}

function addIDsToLinks(links: MeetLink[]): MeetLink[] {
  const anyUndefined = links.some((link) => link.id === undefined);
  if (anyUndefined) {
    return links.map((link) =>
      link.id === undefined ? { ...link, id: generateId() } : link
    );
  }
  return links;
}

test("make sure all links have id", () => {
  const hasID = (link) => typeof link.id === "string";
  const linksWithSomeIDs = linksToReturn(getLinksWithSomeIDs());
  const linksWithIDs = linksToReturn(getLinksWithID());

  expect(linksWithSomeIDs.every(hasID)).toBe(true);
  expect(getLinksWithSomeIDs()[1]).toStrictEqual(linksWithSomeIDs[1]);

  expect(linksToReturn(getLinksWithoutID()).every(hasID)).toBe(true);
  expect(linksWithIDs).toStrictEqual(getLinksWithID());
});
