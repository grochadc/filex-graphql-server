import { MeetLink } from "../types/index";
import { getIndexToModify } from "../utils";

function setSingleMeetLink(link: MeetLink, meetLinks: MeetLink[]): MeetLink[] {
  const insertAtIndex = getIndexToModify(
    link,
    meetLinks,
    (iteration, actual) => iteration.id === actual.id
  );
  const newMeetLinks = [
    ...meetLinks.slice(0, insertAtIndex),
    link,
    ...meetLinks.slice(insertAtIndex + 1),
  ];
  return newMeetLinks;
}

const meetLinks = [
  { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
  { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
  { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
];

test("it modifies the link array correctly", () => {
  const link = {
    id: "b",
    link: "somenewurl",
    teacher: "teacher2",
    active: false,
  };

  const result = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    {
      id: "b",
      link: "somenewurl",
      teacher: "teacher2",
      active: false,
    },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
  ];
  expect(setSingleMeetLink(link, meetLinks)).toStrictEqual(result);
});

test("it modifies the first item in the array correctly", () => {
  const link = { id: "a", link: "someurl", teacher: "teacher1", active: true };

  const result = [
    { id: "a", link: "someurl", teacher: "teacher1", active: true },
    { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
  ];
  expect(setSingleMeetLink(link, meetLinks)).toStrictEqual(result);
});

test("it adds a new link if it doesnt find the one", () => {
  const link = { id: "d", link: "someurl", teacher: "teacher3", active: true };

  const result = [
    { id: "a", link: "teacher1url", teacher: "teacher1", active: true },
    { id: "b", link: "teacher2url", teacher: "teacher2", active: true },
    { id: "c", link: "teacher3url", teacher: "teacher3", active: true },
    { id: "d", link: "someurl", teacher: "teacher3", active: true },
  ];
  expect(setSingleMeetLink(link, meetLinks)).toStrictEqual(result);
});

test("use real links from db", () => {
  const realMeetLinks = [
    {
      active: true,
      id: "rh57ho",
      link: "https://meet.google.com/qjg-xpth-drm",
      teacher: "Gissel",
    },
    {
      active: true,
      id: "4aeutc",
      link: "https://meet.google.com/osm-imjb-kcp",
      teacher: "Sergio",
    },
    {
      active: true,
      id: "rrtz1",
      link: "https://meet.google.com/moh-ngxa-fqh",
      teacher: "Chuck",
    },
    {
      active: true,
      id: "iieeaa",
      link: "https://meet.google.com/sme-acua-sfd",
      teacher: "Ericka",
    },
    {
      active: false,
      id: "fv4e7k",
      link: "https://meet.google.com/awi-zmrw-mra?authuser=0",
      teacher: "Alondra ",
    },
    {
      active: false,
      id: "0qfizb",
      link: "https://meet.google.com/jry-jpex-hqr",
      teacher: "Felipe",
    },
    {
      active: false,
      id: "i8o0b",
      link: "https://meet.google.com/ojz-ffhg-tze",
      teacher: "Jessica",
    },
    {
      active: false,
      id: "r8r3do",
      link: "https://notareallink",
      teacher: "Brenda",
    },
  ];

  const link = {
    id: "r8r3do",
    teacher: "Gonzo",
    link: "https://notareallink",
    active: false,
  };

  const result = [
    {
      active: true,
      id: "rh57ho",
      link: "https://meet.google.com/qjg-xpth-drm",
      teacher: "Gissel",
    },
    {
      active: true,
      id: "4aeutc",
      link: "https://meet.google.com/osm-imjb-kcp",
      teacher: "Sergio",
    },
    {
      active: true,
      id: "rrtz1",
      link: "https://meet.google.com/moh-ngxa-fqh",
      teacher: "Chuck",
    },
    {
      active: true,
      id: "iieeaa",
      link: "https://meet.google.com/sme-acua-sfd",
      teacher: "Ericka",
    },
    {
      active: false,
      id: "fv4e7k",
      link: "https://meet.google.com/awi-zmrw-mra?authuser=0",
      teacher: "Alondra ",
    },
    {
      active: false,
      id: "0qfizb",
      link: "https://meet.google.com/jry-jpex-hqr",
      teacher: "Felipe",
    },
    {
      active: false,
      id: "i8o0b",
      link: "https://meet.google.com/ojz-ffhg-tze",
      teacher: "Jessica",
    },
    {
      id: "r8r3do",
      teacher: "Gonzo",
      link: "https://notareallink",
      active: false,
    },
  ];

  expect(setSingleMeetLink(link, realMeetLinks)).toStrictEqual(result);
});
