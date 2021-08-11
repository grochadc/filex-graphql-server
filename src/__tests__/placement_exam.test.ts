import {
  SAVE_RESULTS_DB,
  GET_CARRERAS,
  GET_DEFAULT_SETTINGS,
  UPDATE_LINKS,
} from "./__data__/queries";
import testServer from "../testUtils/testServer";
import { PlacementAPI, PlacementSheetsAPI } from "../datasources";
import * as utils from "../utils";
import Carousel from "../utils/Carousel";

const applicantInfo = {
  code: "",
  nombre: "Iker",
  apellido_paterno: "Mamarre",
  apellido_materno: "Martinez",
  genero: "M",
  ciclo: "",
  carrera: "",
  telefono: "3411234567",
  email: "m@marre.com",
  externo: true,
  reubicacion: false,
  nivel_escrito: 4,
  curso: "en",
};

const meetLinks = [
  { teacher: "someTeacher", link: "link2", active: true },
  { teacher: "someTeacher", link: "link3", active: true },
];

describe("Placement exam", () => {
  it("saves an applicant", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.logOutUser = jest.fn(() => Promise.resolve(1));
    placementAPI.getMeetLinks = jest.fn(() => Promise.resolve(meetLinks));
    placementAPI.addApplicant = jest.fn(() => Promise.resolve());
    const placementSheetsAPI = new PlacementSheetsAPI("somespreadsheetid");
    placementSheetsAPI.saveApplicant = jest.fn(() => Promise.resolve());

    const spy = jest.spyOn(utils, "generateId").mockReturnValueOnce("w924pj");

    const { mutate } = testServer(
      () => ({ placementAPI, placementSheetsAPI }),
      () => ({ carousel: new Carousel() })
    );
    const res = await mutate({
      mutation: SAVE_RESULTS_DB,
      variables: applicantInfo,
    });
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
    expect(placementSheetsAPI.saveApplicant).toHaveBeenCalled();
    //make sure sheets completed successfully and applicant wasn´t saved on firebase
    expect(placementAPI.addApplicant).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalled();
  });

  it("gets carreras and isClosed", async () => {
    const { query } = testServer(() => ({}));
    const res = await query({
      query: GET_CARRERAS,
    });
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });
});

describe("Placement settings", () => {
  it("gets default settings", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.getMeetLinks = jest.fn(() =>
      Promise.resolve([{ teacher: "someTeacher", link: "meetlink1" }])
    );
    const { query } = testServer(() => ({ placementAPI }));
    const res = await query({
      query: GET_DEFAULT_SETTINGS,
    });
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("saves the meetLinks", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.saveMeetLinks = jest.fn(() => Promise.resolve());
    const { query } = testServer(() => ({ placementAPI }));
    const res = await query({
      query: UPDATE_LINKS,
      variables: {
        links: [{ teacher: "someTeacher", link: "meetLink1" }],
      },
    });
    expect(res.data).toMatchSnapshot();
    expect(placementAPI.saveMeetLinks).toHaveBeenCalledWith([
      { teacher: "someTeacher", link: "meetLink1" },
    ]);
  });
});
