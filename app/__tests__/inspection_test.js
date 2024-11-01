const createApolloServer = require("../config/connection");
const request = require("supertest");
const Inspection = require("../models/Inspection");

const mutationCreateInspection = require("../inspectionTestQuery/mutationCreateInspection");
const mutationupdateInspection = require("../inspectionTestQuery/mutationUpdateInspection");
const queryInspections = require("../inspectionTestQuery/queryInpections");
const queryInspectionById = require("../inspectionTestQuery/queryInspectionById");
const variableInputInspection = require("../inspectionTestQuery/variableInputInspection");
const dataBefore = require("../inspectionTestQuery/beforeInspectionCreate");
const ImageKit = require("imagekit");
const mutationDeleteInspection = {
  query: `
    mutation Mutation($deleteInspectionId: ID!) {
        deleteInspection(id: $deleteInspectionId) {
            message
        }
    }
    `,
};

describe("Inspection Order", () => {
  let server, url;
  let inspectionGlobalId;
  let inspectionOrderId;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
    const inspections = await Inspection.create(dataBefore);
    inspectionGlobalId = inspections.id;
    inspectionOrderId = inspections.orderId;
  });
  afterAll(async () => {
    await Inspection.deleteMany();
    await server?.stop();
  });

  it("return new inspection", async () => {
    mutationCreateInspection.variables = {
      input: variableInputInspection,
    };
    const response = await request(url)
      .post("/")
      .send(mutationCreateInspection);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createInspection");
    expect(response.body.data.createInspection).toHaveProperty("id");
    expect(response.body.data.createInspection).toHaveProperty(
      "orderId",
      "6479fcf9d233ac75951184b3"
    );

    // Vehicle
    expect(response.body.data.createInspection).toHaveProperty("vehicle");
    expect(response.body.data.createInspection.vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.createInspection.vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.createInspection.vehicle).toHaveProperty(
      "model",
      "Avaza"
    );
    expect(response.body.data.createInspection.vehicle).toHaveProperty(
      "year",
      2020
    );
    expect(response.body.data.createInspection.vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );

    // Exterior
    expect(response.body.data.createInspection).toHaveProperty("exterior");
    expect(response.body.data.createInspection.exterior).toHaveProperty(
      "bemperDepan"
    );
    expect(
      response.body.data.createInspection.exterior.bemperDepan
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.createInspection.exterior.bemperDepan
    ).toHaveProperty("title", null);

    // Interior
    expect(response.body.data.createInspection).toHaveProperty("interior");
    expect(response.body.data.createInspection.interior).toHaveProperty(
      "kameraMundur"
    );
    expect(
      response.body.data.createInspection.interior.kameraMundur
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.createInspection.interior.kameraMundur
    ).toHaveProperty("title", null);

    // Components
    expect(response.body.data.createInspection).toHaveProperty("components");
    expect(response.body.data.createInspection.components).toHaveProperty(
      "belts"
    );
    expect(response.body.data.createInspection.components.belts).toHaveProperty(
      "status",
      "oke"
    );
    expect(response.body.data.createInspection.components.belts).toHaveProperty(
      "title",
      null
    );

    // Tes Jalan
    expect(response.body.data.createInspection).toHaveProperty("tesJalan");
    expect(response.body.data.createInspection.tesJalan).toHaveProperty(
      "bunyiTransisi"
    );
    expect(
      response.body.data.createInspection.tesJalan.bunyiTransisi
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.createInspection.tesJalan.bunyiTransisi
    ).toHaveProperty("title", null);
  });
  it("update inspection", async () => {
    mutationupdateInspection.variables = {
      updateInspectionId: inspectionGlobalId,
      input: variableInputInspection,
    };
    const response = await request(url)
      .post("/")
      .send(mutationupdateInspection);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("updateInspection");
    expect(response.body.data.updateInspection).toHaveProperty("id");
    expect(response.body.data.updateInspection).toHaveProperty(
      "orderId",
      "6479fcf9d233ac75951184b3"
    );

    // Vehicle
    expect(response.body.data.updateInspection).toHaveProperty("vehicle");
    expect(response.body.data.updateInspection.vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.updateInspection.vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.updateInspection.vehicle).toHaveProperty(
      "model",
      "Avaza"
    );
    expect(response.body.data.updateInspection.vehicle).toHaveProperty(
      "year",
      2020
    );
    expect(response.body.data.updateInspection.vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );

    // Exterior
    expect(response.body.data.updateInspection).toHaveProperty("exterior");
    expect(response.body.data.updateInspection.exterior).toHaveProperty(
      "bemperDepan"
    );
    expect(
      response.body.data.updateInspection.exterior.bemperDepan
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.updateInspection.exterior.bemperDepan
    ).toHaveProperty("title", null);

    // Interior
    expect(response.body.data.updateInspection).toHaveProperty("interior");
    expect(response.body.data.updateInspection.interior).toHaveProperty(
      "kameraMundur"
    );
    expect(
      response.body.data.updateInspection.interior.kameraMundur
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.updateInspection.interior.kameraMundur
    ).toHaveProperty("title", null);

    // Components
    expect(response.body.data.updateInspection).toHaveProperty("components");
    expect(response.body.data.updateInspection.components).toHaveProperty(
      "belts"
    );
    expect(response.body.data.updateInspection.components.belts).toHaveProperty(
      "status",
      "oke"
    );
    expect(response.body.data.updateInspection.components.belts).toHaveProperty(
      "title",
      null
    );

    // Tes Jalan
    expect(response.body.data.updateInspection).toHaveProperty("tesJalan");
    expect(response.body.data.updateInspection.tesJalan).toHaveProperty(
      "bunyiTransisi"
    );
    expect(
      response.body.data.updateInspection.tesJalan.bunyiTransisi
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.updateInspection.tesJalan.bunyiTransisi
    ).toHaveProperty("title", null);
  });
  it("return all inspection", async () => {
    const response = await request(url).post("/").send(queryInspections);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("inspections");
    expect(response.body.data.inspections[0]).toHaveProperty("id");
    expect(response.body.data.inspections[0]).toHaveProperty(
      "orderId",
      "6479fcf9d233ac75951184b3"
    );

    // Vehicle
    expect(response.body.data.inspections[0]).toHaveProperty("vehicle");
    expect(response.body.data.inspections[0].vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.inspections[0].vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.inspections[0].vehicle).toHaveProperty(
      "model",
      "Avaza"
    );
    expect(response.body.data.inspections[0].vehicle).toHaveProperty(
      "year",
      2020
    );
    expect(response.body.data.inspections[0].vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );

    // Exterior
    expect(response.body.data.inspections[0]).toHaveProperty("exterior");
    expect(response.body.data.inspections[0].exterior).toHaveProperty(
      "bemperDepan"
    );
    expect(
      response.body.data.inspections[0].exterior.bemperDepan
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.inspections[0].exterior.bemperDepan
    ).toHaveProperty("title", null);

    // Interior
    expect(response.body.data.inspections[0]).toHaveProperty("interior");
    expect(response.body.data.inspections[0].interior).toHaveProperty(
      "kameraMundur"
    );
    expect(
      response.body.data.inspections[0].interior.kameraMundur
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.inspections[0].interior.kameraMundur
    ).toHaveProperty("title", null);

    // Components
    expect(response.body.data.inspections[0]).toHaveProperty("components");
    expect(response.body.data.inspections[0].components).toHaveProperty(
      "belts"
    );
    expect(response.body.data.inspections[0].components.belts).toHaveProperty(
      "status",
      "oke"
    );
    expect(response.body.data.inspections[0].components.belts).toHaveProperty(
      "title",
      null
    );

    // Tes Jalan
    expect(response.body.data.inspections[0]).toHaveProperty("tesJalan");
    expect(response.body.data.inspections[0].tesJalan).toHaveProperty(
      "bunyiTransisi"
    );
    expect(
      response.body.data.inspections[0].tesJalan.bunyiTransisi
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.inspections[0].tesJalan.bunyiTransisi
    ).toHaveProperty("title", null);
  });
  it("return inspection by orderId", async () => {
    queryInspectionById.variables = {
      orderId: inspectionOrderId,
    };
    const response = await request(url).post("/").send(queryInspectionById);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("findInspectionByOrderId");
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty("id");
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "orderId",
      inspectionOrderId
    );

    // Vehicle
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "vehicle"
    );
    expect(
      response.body.data.findInspectionByOrderId[0].vehicle
    ).toHaveProperty("type", "Car");
    expect(
      response.body.data.findInspectionByOrderId[0].vehicle
    ).toHaveProperty("brand", "Toyota");
    expect(
      response.body.data.findInspectionByOrderId[0].vehicle
    ).toHaveProperty("model", "Avaza");
    expect(
      response.body.data.findInspectionByOrderId[0].vehicle
    ).toHaveProperty("year", 2020);
    expect(
      response.body.data.findInspectionByOrderId[0].vehicle
    ).toHaveProperty("transmission", "Manual");

    // Exterior
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "exterior"
    );
    expect(
      response.body.data.findInspectionByOrderId[0].exterior
    ).toHaveProperty("bemperDepan");
    expect(
      response.body.data.findInspectionByOrderId[0].exterior.bemperDepan
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.findInspectionByOrderId[0].exterior.bemperDepan
    ).toHaveProperty("title", null);

    // Interior
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "interior"
    );
    expect(
      response.body.data.findInspectionByOrderId[0].interior
    ).toHaveProperty("kameraMundur");
    expect(
      response.body.data.findInspectionByOrderId[0].interior.kameraMundur
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.findInspectionByOrderId[0].interior.kameraMundur
    ).toHaveProperty("title", null);

    // Components
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "components"
    );
    expect(
      response.body.data.findInspectionByOrderId[0].components
    ).toHaveProperty("belts");
    expect(
      response.body.data.findInspectionByOrderId[0].components.belts
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.findInspectionByOrderId[0].components.belts
    ).toHaveProperty("title", null);

    // Tes Jalan
    expect(response.body.data.findInspectionByOrderId[0]).toHaveProperty(
      "tesJalan"
    );
    expect(
      response.body.data.findInspectionByOrderId[0].tesJalan
    ).toHaveProperty("bunyiTransisi");
    expect(
      response.body.data.findInspectionByOrderId[0].tesJalan.bunyiTransisi
    ).toHaveProperty("status", "oke");
    expect(
      response.body.data.findInspectionByOrderId[0].tesJalan.bunyiTransisi
    ).toHaveProperty("title", null);
  });
  it("delete inpection", async () => {
    mutationDeleteInspection.variables = {
      deleteInspectionId: inspectionGlobalId,
    };
    const response = await request(url)
      .post("/")
      .send(mutationDeleteInspection);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("deleteInspection");
    expect(response.body.data.deleteInspection).toHaveProperty(
      "message",
      "Inspection deleted successfully"
    );
  });
  it("should show error when hit create Inspection", async () => {
    const errorMessage = "Internal Server Error";
    jest
      .spyOn(Inspection.prototype, "save")
      .mockRejectedValue(new Error(errorMessage));

    const response = await request(url)
      .post("/")
      .send(mutationCreateInspection);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe(errorMessage);
  });
  it("should show error when hit findByIdAndUpdate Inspection", async () => {
    jest
      .spyOn(Inspection, "findByIdAndUpdate")
      .mockRejectedValue("Internal Server Error");

    const response = await request(url)
      .post("/")
      .send(mutationupdateInspection);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe(
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("should show error when hit findByIdAndRemove inspection", async () => {
    jest
      .spyOn(Inspection, "findByIdAndRemove")
      .mockRejectedValue("Internal Server Error");

    const response = await request(url)
      .post("/")
      .send(mutationDeleteInspection);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe(
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("should show error when hit find inspection", async () => {
    jest.spyOn(Inspection, "find").mockRejectedValue("Internal Server Error");

    const response = await request(url).post("/").send(queryInspections);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe(
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("should show error when hit findById inspection", async () => {
    jest.spyOn(Inspection, "find").mockRejectedValue("Internal Server Error");

    const response = await request(url).post("/").send(queryInspectionById);

    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].message).toBe(
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("should show error when id input update null", async () => {
    mutationupdateInspection.variables = {
      updateInspectionId: null,
      input: variableInputInspection,
    };
    const response = await request(url)
      .post("/")
      .send(mutationupdateInspection);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Variable "$updateInspectionId" of non-null type "ID!" must not be null.'
    );
  });
  it("should show error when id input delete null", async () => {
    mutationDeleteInspection.variables = {
      deleteInspectionId: null,
    };
    const response = await request(url)
      .post("/")
      .send(mutationDeleteInspection);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Variable "$deleteInspectionId" of non-null type "ID!" must not be null.'
    );
  });
  it("should show error when id input findById null", async () => {
    queryInspectionById.variables = {
      orderId: null,
    };
    const response = await request(url).post("/").send(queryInspectionById);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Variable "$orderId" of non-null type "String!" must not be null.'
    );
  });
});
