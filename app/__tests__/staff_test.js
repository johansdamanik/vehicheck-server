const createApolloServer = require("../config/connection");
const request = require("supertest");
const Staff = require("../models/Staff");
const { hashPassword, encodeToken } = require("../helpers/crypto");

const mutationRegister = {
  query: `mutation Mutation($input: CreateStaffInput!) {
  createStaff(input: $input) {
    id
    fullname
    email
    phoneNumber
    address
    specialist
  }
}`,
};

const mutationLogin = {
  query: `mutation Mutation($email: String!, $password: String!) {
  loginStaff(email: $email, password: $password) {
    access_token
    message
  }
}`,
};

const queryAllStaff = {
  query: `query Query {
  staffs {
    id
    fullname
    email
    phoneNumber
    address
    specialist
  }
}`,
};

const queryStaffById = {
  query: `query Query($staffId: ID!) {
  staff(id: $staffId) {
    id
    fullname
    email
    phoneNumber
    address
    specialist
  }
}`,
};

const queryStaffData = {
  query: `query Query {
  staffData {
    id
    fullname
    email
    phoneNumber
    address
    specialist
  }
}`,
};

describe("Login & Register Staff", () => {
  let server, url;
  let staffIdGlobal;
  let staffToken;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
    const staffs = await Staff.create({
      email: "admin20@mail.com",
      password: hashPassword("123456"),
      fullname: "admin20",
      phoneNumber: "203948203984",
      address: "Indonesia",
      specialist: "cars",
    });
    staffIdGlobal = staffs.id;
    staffToken = encodeToken({ id: staffs.id });
  });

  afterAll(async () => {
    await Staff.deleteMany();
    await server?.stop();
  });

  it("return new staff", async () => {
    mutationRegister.variables = {
      input: {
        email: "admin100@mail.com",
        password: "123456",
        fullname: "admin100",
        phoneNumber: "203948203984",
        address: "Indonesia",
        specialist: "cars",
      },
    };
    const response = await request(url).post("/").send(mutationRegister);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createStaff");
    expect(response.body.data.createStaff).toHaveProperty("id");
    expect(response.body.data.createStaff).toHaveProperty(
      "fullname",
      "admin100"
    );
    expect(response.body.data.createStaff).toHaveProperty(
      "email",
      "admin100@mail.com"
    );
    expect(response.body.data.createStaff).toHaveProperty(
      "phoneNumber",
      "203948203984"
    );
    expect(response.body.data.createStaff).toHaveProperty(
      "address",
      "Indonesia"
    );
    expect(response.body.data.createStaff).toHaveProperty("specialist", "cars");
  });

  it("login staff", async () => {
    mutationLogin.variables = {
      email: "admin20@mail.com",
      password: "123456",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("loginStaff");
    expect(response.body.data.loginStaff).toHaveProperty("access_token");
    expect(response.body.data.loginStaff).toHaveProperty(
      "message",
      "Login successful"
    );
  });

  it("return all staff", async () => {
    const response = await request(url).post("/").send(queryAllStaff);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("staffs");
    expect(response.body.data.staffs).toHaveLength(2);
    expect(response.body.data.staffs[0]).toHaveProperty("id");
    expect(response.body.data.staffs[0]).toHaveProperty("fullname", "admin20");
    expect(response.body.data.staffs[0]).toHaveProperty(
      "email",
      "admin20@mail.com"
    );
    expect(response.body.data.staffs[0]).toHaveProperty(
      "phoneNumber",
      "203948203984"
    );
    expect(response.body.data.staffs[0]).toHaveProperty("address", "Indonesia");
    expect(response.body.data.staffs[0]).toHaveProperty("specialist", "cars");
  });

  it("return staff by Id", async () => {
    queryStaffById.variables = {
      staffId: staffIdGlobal,
    };
    const response = await request(url).post("/").send(queryStaffById);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("staff");
    expect(response.body.data.staff).toHaveProperty("id");
    expect(response.body.data.staff).toHaveProperty("fullname", "admin20");
    expect(response.body.data.staff).toHaveProperty(
      "email",
      "admin20@mail.com"
    );
    expect(response.body.data.staff).toHaveProperty(
      "phoneNumber",
      "203948203984"
    );
    expect(response.body.data.staff).toHaveProperty("address", "Indonesia");
    expect(response.body.data.staff).toHaveProperty("specialist", "cars");
  });

  it("return staffData", async () => {
    const response = await request(url)
      .post("/")
      .set("access_token", staffToken)
      .send(queryStaffData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("staffData");
    expect(response.body.data.staffData).toHaveProperty("id");
    expect(response.body.data.staffData).toHaveProperty("fullname", "admin20");
    expect(response.body.data.staffData).toHaveProperty(
      "email",
      "admin20@mail.com"
    );
    expect(response.body.data.staffData).toHaveProperty(
      "phoneNumber",
      "203948203984"
    );
    expect(response.body.data.staffData).toHaveProperty("address", "Indonesia");
    expect(response.body.data.staffData).toHaveProperty("specialist", "cars");
  });

  it("should return error Staff not found", async () => {
    queryStaffById.variables = {
      staffId: "647eccf2f25105d2411efb9a",
    };
    const response = await request(url).post("/").send(queryStaffById);
    expect(response.body.errors).toBeDefined();
    expect(response.body.data).toHaveProperty("staff", null);
    expect(response.body.data.staff).toBeNull();
    expect(response.body.errors[0].message).toBe("Staff not found");
  });

  it("should return error Staffs not found", async () => {
    const invalidQueryAllStaff = {
      query: `query Query {
      staffs {
        id
        fullname
        email
        phoneNumber
        address
        specialist
        invalidProperty
      }
    }`,
    };
    const response = await request(url).post("/").send(invalidQueryAllStaff);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe(
      `Cannot query field \"invalidProperty\" on type \"Staff\".`
    );
  });

  it("should retur error whent staffData not found", async () => {
    const response = await request(url).post("/").send(queryStaffData);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty(
      "message",
      "Staff not found"
    );
  });

  it("should return error when creating new staff", async () => {
    mutationRegister.variables = {
      input: {
        fullname: "Anto Klewang",
        email: "",
        password: "",
        phoneNumber: "08123455",
        address: "Jl. Cut Nyak Dhien",
        specialist: "cars",
      },
    };
    const response = await request(url).post("/").send(mutationRegister);
    // console.log(response.body);
    expect(response.body.errors[0].message).toBe(
      "Email or password is required"
    );
  });

  it("should return error when login staff with invalid email", async () => {
    mutationLogin.variables = {
      email: "admin20@mail.co",
      password: "123454",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("Email or Password is wrong");
  });

  it("should return error when login staff with invalid password", async () => {
    mutationLogin.variables = {
      email: "admin20@mail.com",
      password: "12345444",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("Email or Password is wrong");
  });

  it("should return error when email is not provided", async () => {
    mutationLogin.variables = {
      email: "",
      password: "12345",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message");
  });

  it("should return error when password is not provided", async () => {
    mutationLogin.variables = {
      email: "admin@mail.com",
      password: "",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message");
  });
});

describe("Error Find Staffs", () => {
  let server, url;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
  });

  afterAll(async () => {
    await Staff.deleteMany();
    await server?.stop();
  });
  it("Should be return error when hit findAll", async () => {
    jest.spyOn(Staff, "find").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryAllStaff);
    // console.log(response.body);
  });

  it("Should be return error when failed find Staff by Id", async () => {
    jest.spyOn(Staff, "findById").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryStaffById);
    // console.log(response.body);
  });
});
