import {
  SAVE_RESULTS_DB,
  GET_CARRERAS,
  GET_DEFAULT_SETTINGS,
  UPDATE_LINKS,
} from "./__data__/queries";
import testServer from "../testUtils/testServer";
import { PlacementAPI, SheetsAPI } from "../datasources";
import * as utils from "../utils";

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

describe("Placement exam", () => {
  it("saves an applicant", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.addApplicant = jest.fn();
    const sheetsAPI = new SheetsAPI("somespreadsheetid");
    sheetsAPI.saveApplicant = jest.fn(() => Promise.resolve());

    const spy = jest.spyOn(utils, "generateId").mockReturnValueOnce("w924pj");

    const { mutate } = testServer(() => ({ placementAPI, sheetsAPI }));
    const res = await mutate({
      mutation: SAVE_RESULTS_DB,
      variables: applicantInfo,
    });
    if (res.errors) console.log(JSON.stringify(res.errors));
    expect(spy).toHaveBeenCalled();
    expect(sheetsAPI.saveApplicant).toHaveBeenCalled();
    expect(placementAPI.addApplicant).toHaveBeenCalledTimes(0);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("gets carreras and isClosed", async () => {
    const { query } = testServer(() => ({}));
    const res = await query({
      query: GET_CARRERAS,
    });
    if (res.errors) console.log(res.errors);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });
});

describe("Placement settings", () => {
  it("gets default settings", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.getMeetLinks = jest.fn(() => Promise.resolve(["meetlink1"]));
    const { query } = testServer(() => ({ placementAPI }));
    const res = await query({
      query: GET_DEFAULT_SETTINGS,
    });
    if (res.errors) console.log(res.errors);
    expect(res.errors).toBe(undefined);
    expect(res.data).toMatchSnapshot();
  });

  it("saves the meetLinks", async () => {
    const placementAPI = new PlacementAPI();
    placementAPI.saveMeetLinks = jest.fn();
    const { query } = testServer(() => ({ placementAPI }));
    const res = await query({
      query: UPDATE_LINKS,
      variables: {
        links: ["meetLink1"],
      },
    });
    if (res.errors) console.log(res.errors);
    expect(placementAPI.saveMeetLinks).toHaveBeenCalledWith(["meetLink1"]);
    expect(res.errors).toBe(undefined);
    expect(res.data.setMeetLinks).toBe(200);
  });
});
