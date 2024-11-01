const createApolloServer = require("../config/connection");
const request = require("supertest");
const Order = require("../models/Order");
const Staff = require("../models/Staff");
const User = require("../models/User");
const { encodeToken } = require("../helpers/crypto");
const { hashPassword } = require("../helpers/crypto");

const {
  queryAllOrder,
  queryfindOrderByStaffId,
  queryfindOrderByUserId,
  queryfindOrderId,
  queryOrdersByRegion,
  mutationcreateOrder,
  mutationupdateStatus,
} = require("../orderTestQuery/query");

describe("Order testing", () => {
  let server, url;
  let userToken;
  let staffToken;
  let staffId;
  let orderGlobalId;
  let orderRegion;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
    const staffs = await Staff.create({
      email: "admin1@mail.com",
      password: hashPassword("123456"),
      fullname: "admin1",
      phoneNumber: "1234567890",
      address: "Indonesia",
      specialist: "cars",
    });
    staffId = staffs.id;
    staffToken = encodeToken({ id: staffs.id });
    const users = await User.create({
      email: "user1@mail.com",
      password: hashPassword("123456"),
      fullname: "user1",
      phoneNumber: "1234567890",
      address: "Indonesia",
    });
    userToken = encodeToken({ id: users.id });
    const orders = await Order.create({
      date: "2023/12/12",
      fullName: "user1",
      inspectionAddress: "Indonesia",
      map: {
        city: "Kecamatan Pasar Rebo",
        latitude: "106.85657758265734",
        longitude: "-6.30381324119981",
        regional: "Daerah Khusus Ibukota Jakarta",
      },
      payment: "pending",
      phoneNumber: "1234567890",
      price: 200000,
      status: "pending",
      time: "09.00 pm",
      vehicle: {
        brand: "Toyota",
        model: "Avanza",
        transmission: "Manual",
        type: "Car",
        year: 2020,
      },
    });
    orderGlobalId = orders.id;
    orderRegion = orders.map.regional;
  });

  afterAll(async () => {
    await Staff.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    await server?.stop();
  });

  it("return new order", async () => {
    mutationcreateOrder.variables = {
      newOrder: {
        date: "2023/10/12",
        fullName: "user1",
        inspectionAddress: "Indonesia",
        map: {
          city: "Kecamatan Pasar Rebo",
          latitude: "106.85657758265734",
          longitude: "-6.30381324119981",
          regional: "Daerah Khusus Ibukota Jakarta",
        },
        payment: "pending",
        phoneNumber: "1234567890",
        price: 200000,
        status: "pending",
        time: "09.00 pm",
        vehicle: {
          brand: "Toyota",
          model: "Avanza",
          transmission: "Manual",
          type: "Car",
          year: 2020,
        },
      },
    };
    const response = await request(url)
      .post("/")
      .set("access_token", userToken)
      .send(mutationcreateOrder);

    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createOrder");
    expect(response.body.data.createOrder).toHaveProperty("id");
    expect(response.body.data.createOrder).toHaveProperty("date", "2023/10/12");
    expect(response.body.data.createOrder).toHaveProperty("fullName", "user1");
    expect(response.body.data.createOrder).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.createOrder).toHaveProperty("map");
    expect(response.body.data.createOrder.map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.createOrder.map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.createOrder.map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.createOrder.map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.createOrder).toHaveProperty("payment", "unpaid");
    expect(response.body.data.createOrder).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.createOrder).toHaveProperty("price", 200000);
    expect(response.body.data.createOrder).toHaveProperty("status", "pending");
    expect(response.body.data.createOrder).toHaveProperty("time", "09.00 pm");
    expect(response.body.data.createOrder).toHaveProperty("vehicle");
    expect(response.body.data.createOrder.vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.createOrder.vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.createOrder.vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.createOrder.vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.createOrder.vehicle).toHaveProperty("year", 2020);
  });
  it("update order status", async () => {
    mutationupdateStatus.variables = {
      status: "on-progress",
      updateStatusId: orderGlobalId,
    };
    const response = await request(url)
      .post("/")
      .set("access_token", staffToken)
      .send(mutationupdateStatus);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("updateStatus");
    expect(response.body.data.updateStatus).toHaveProperty("id");
    expect(response.body.data.updateStatus).toHaveProperty("staffId", staffId);
    expect(response.body.data.updateStatus).toHaveProperty(
      "date",
      "2023/12/12"
    );
    expect(response.body.data.updateStatus).toHaveProperty("fullName", "user1");
    expect(response.body.data.updateStatus).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.updateStatus).toHaveProperty("map");
    expect(response.body.data.updateStatus.map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.updateStatus.map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.updateStatus.map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.updateStatus.map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.updateStatus).toHaveProperty(
      "payment",
      "pending"
    );
    expect(response.body.data.updateStatus).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.updateStatus).toHaveProperty("price", 200000);
    expect(response.body.data.updateStatus).toHaveProperty(
      "status",
      "on-progress"
    );
    expect(response.body.data.updateStatus).toHaveProperty("time", "09.00 pm");
    expect(response.body.data.updateStatus).toHaveProperty("vehicle");
    expect(response.body.data.updateStatus.vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.updateStatus.vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.updateStatus.vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.updateStatus.vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.updateStatus.vehicle).toHaveProperty(
      "year",
      2020
    );
  });
  it("show all order", async () => {
    const response = await request(url).post("/").send(queryAllOrder);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("orders");
    expect(response.body.data.orders).toHaveLength(2);
    expect(response.body.data.orders[0]).toHaveProperty("id");
    expect(response.body.data.orders[0]).toHaveProperty("userId");
    expect(response.body.data.orders[0]).toHaveProperty("staffId");
    expect(response.body.data.orders[0]).toHaveProperty("fullName", "user1");
    expect(response.body.data.orders[0]).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.orders[0]).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.orders[0]).toHaveProperty("map");
    expect(response.body.data.orders[0].map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.orders[0].map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.orders[0].map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.orders[0].map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.orders[0]).toHaveProperty("payment", "pending");
    expect(response.body.data.orders[0]).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.orders[0]).toHaveProperty("price", 200000);
    expect(response.body.data.orders[0]).toHaveProperty(
      "status",
      "on-progress"
    );
    expect(response.body.data.orders[0]).toHaveProperty("time", "09.00 pm");
    expect(response.body.data.orders[0]).toHaveProperty("vehicle");
    expect(response.body.data.orders[0].vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.orders[0].vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.orders[0].vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.orders[0].vehicle).toHaveProperty("type", "Car");
    expect(response.body.data.orders[0].vehicle).toHaveProperty("year", 2020);
  });
  it("show order by userId", async () => {
    const response = await request(url)
      .post("/")
      .set("access_token", userToken)
      .send(queryfindOrderByUserId);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("findOrderByUserId");
    expect(response.body.data.findOrderByUserId).toHaveLength(1);
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty("id");
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty("staffId");
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty("userId");
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "date",
      "2023/10/12"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "fullName",
      "user1"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty("map");
    expect(response.body.data.findOrderByUserId[0].map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.findOrderByUserId[0].map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.findOrderByUserId[0].map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.findOrderByUserId[0].map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "payment",
      "unpaid"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "price",
      200000
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "status",
      "pending"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty(
      "time",
      "09.00 pm"
    );
    expect(response.body.data.findOrderByUserId[0]).toHaveProperty("vehicle");
    expect(response.body.data.findOrderByUserId[0].vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.findOrderByUserId[0].vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.findOrderByUserId[0].vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.findOrderByUserId[0].vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.findOrderByUserId[0].vehicle).toHaveProperty(
      "year",
      2020
    );
  });
  it("show order by staffId", async () => {
    const response = await request(url)
      .post("/")
      .set("access_token", staffToken)
      .send(queryfindOrderByStaffId);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("findOrderByStaffId");
    expect(response.body.data.findOrderByStaffId).toHaveLength(1);
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty("id");
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty("staffId");
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty("userId");
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "date",
      "2023/12/12"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "fullName",
      "user1"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty("map");
    expect(response.body.data.findOrderByStaffId[0].map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.findOrderByStaffId[0].map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.findOrderByStaffId[0].map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.findOrderByStaffId[0].map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "payment",
      "pending"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "price",
      200000
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "status",
      "on-progress"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty(
      "time",
      "09.00 pm"
    );
    expect(response.body.data.findOrderByStaffId[0]).toHaveProperty("vehicle");
    expect(response.body.data.findOrderByStaffId[0].vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.findOrderByStaffId[0].vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.findOrderByStaffId[0].vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.findOrderByStaffId[0].vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.findOrderByStaffId[0].vehicle).toHaveProperty(
      "year",
      2020
    );
  });
  it("show order by Id", async () => {
    queryfindOrderId.variables = {
      findOrderIdId: orderGlobalId,
    };
    const response = await request(url).post("/").send(queryfindOrderId);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("findOrderId");
    expect(response.body.data.findOrderId).toHaveProperty("id");
    expect(response.body.data.findOrderId).toHaveProperty("staffId", staffId);
    expect(response.body.data.findOrderId).toHaveProperty("date", "2023/12/12");
    expect(response.body.data.findOrderId).toHaveProperty("fullName", "user1");
    expect(response.body.data.findOrderId).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.findOrderId).toHaveProperty("map");
    expect(response.body.data.findOrderId.map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.findOrderId.map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.findOrderId.map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.findOrderId.map).toHaveProperty(
      "regional",
      "Daerah Khusus Ibukota Jakarta"
    );
    expect(response.body.data.findOrderId).toHaveProperty("payment", "pending");
    expect(response.body.data.findOrderId).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.findOrderId).toHaveProperty("price", 200000);
    expect(response.body.data.findOrderId).toHaveProperty(
      "status",
      "on-progress"
    );
    expect(response.body.data.findOrderId).toHaveProperty("time", "09.00 pm");
    expect(response.body.data.findOrderId).toHaveProperty("vehicle");
    expect(response.body.data.findOrderId.vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.findOrderId.vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.findOrderId.vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.findOrderId.vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.findOrderId.vehicle).toHaveProperty("year", 2020);
  });
  it("show order by regional", async () => {
    queryOrdersByRegion.variables = {
      regional: orderRegion,
    };
    const response = await request(url).post("/").send(queryOrdersByRegion);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("ordersByRegion");
    expect(response.body.data.ordersByRegion[0]).toHaveProperty("id");
    expect(response.body.data.ordersByRegion[0]).toHaveProperty("staffId");
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "date",
      "2023/12/12"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "fullName",
      "user1"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "inspectionAddress",
      "Indonesia"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty("map");
    expect(response.body.data.ordersByRegion[0].map).toHaveProperty(
      "city",
      "Kecamatan Pasar Rebo"
    );
    expect(response.body.data.ordersByRegion[0].map).toHaveProperty(
      "latitude",
      "106.85657758265734"
    );
    expect(response.body.data.ordersByRegion[0].map).toHaveProperty(
      "longitude",
      "-6.30381324119981"
    );
    expect(response.body.data.ordersByRegion[0].map).toHaveProperty(
      "regional",
      orderRegion
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "payment",
      "pending"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "price",
      200000
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "status",
      "on-progress"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty(
      "time",
      "09.00 pm"
    );
    expect(response.body.data.ordersByRegion[0]).toHaveProperty("vehicle");
    expect(response.body.data.ordersByRegion[0].vehicle).toHaveProperty(
      "brand",
      "Toyota"
    );
    expect(response.body.data.ordersByRegion[0].vehicle).toHaveProperty(
      "model",
      "Avanza"
    );
    expect(response.body.data.ordersByRegion[0].vehicle).toHaveProperty(
      "transmission",
      "Manual"
    );
    expect(response.body.data.ordersByRegion[0].vehicle).toHaveProperty(
      "type",
      "Car"
    );
    expect(response.body.data.ordersByRegion[0].vehicle).toHaveProperty(
      "year",
      2020
    );
  });
  it("show update order status error unaunthenticate", async () => {
    mutationupdateStatus.variables = {
      status: "on-progress",
      updateStatusId: orderGlobalId,
    };
    const response = await request(url).post("/").send(mutationupdateStatus);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: { message: "you not logging in. Login first" }'
    );
  });
  it("show order create error unauthenticate", async () => {
    mutationcreateOrder.variables = {
      newOrder: {
        date: "2023/10/12",
        fullName: "user1",
        inspectionAddress: "Indonesia",
        map: {
          city: "Kecamatan Pasar Rebo",
          latitude: "106.85657758265734",
          longitude: "-6.30381324119981",
          regional: "Daerah Khusus Ibukota Jakarta",
        },
        payment: "pending",
        phoneNumber: "1234567890",
        price: 200000,
        status: "pending",
        time: "09.00 pm",
        vehicle: {
          brand: "Toyota",
          model: "Avanza",
          transmission: "Manual",
          type: "Car",
          year: 2020,
        },
      },
    };
    const response = await request(url).post("/").send(mutationcreateOrder);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: { message: "you not logging in. Login first" }'
    );
  });
  it("show findByUserId error unauthenticate", async () => {
    const response = await request(url).post("/").send(queryfindOrderByUserId);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: { message: "you not logging in. Login first" }'
    );
  });
  it("show findByStaffId error unauthenticate", async () => {
    const response = await request(url).post("/").send(queryfindOrderByStaffId);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: { message: "you not logging in. Login first" }'
    );
  });
  it("show order by Id error id null", async () => {
    queryfindOrderId.variables = {
      findOrderIdId: null,
    };
    const response = await request(url).post("/").send(queryfindOrderId);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Variable "$findOrderIdId" of non-null type "ID!" must not be null.'
    );
  });
  it("show order by Id error id not found", async () => {
    queryfindOrderId.variables = {
      findOrderIdId: 10,
    };
    const response = await request(url).post("/").send(queryfindOrderId);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Cast to ObjectId failed for value "10" (type string) at path "_id" for model "Order"'
    );
  });
  it("Should be return error when hit find", async () => {
    jest.spyOn(Order, "find").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryAllOrder);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("Should be return error when hit find from regional", async () => {
    jest.spyOn(Order, "find").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryOrdersByRegion);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: "Internal Server Error"'
    );
  });
  it("Should be return error when hit find by Id", async () => {
    jest.spyOn(Order, "findById").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryAllOrder);
    expect(response.body.errors).toBeDefined();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      'Unexpected error value: "Internal Server Error"'
    );
  });
});
