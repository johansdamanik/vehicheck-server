const createApolloServer = require("../config/connection");
const request = require("supertest");
const User = require("../models/User");
const { hashPassword } = require("../helpers/crypto");
const { encodeToken } = require("../helpers/crypto");

const mutationRegister = {
  query: `mutation Mutation($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    fullname
    email
    phoneNumber
    address
  }
}`,
};

const mutationLogin = {
  query: `mutation Mutation($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    access_token
    message
  }
}`,
};

const queryAllUser = {
  query: `query Query {
  users {
    id
    fullname
    email
    phoneNumber
    address
  }
}`,
};

const queryUserById = {
  query: `query Query($userId: ID!) {
  user(id: $userId) {
    id
    fullname
    email
    phoneNumber
    address
  }
}`,
};

const queryUserData = {
  query: `query Query {
  userData {
    id
    fullname
    email
    phoneNumber
    address
  }
}`,
};

describe("Login & Register User", () => {
  let server, url;
  let userIdGlobal;
  let userToken;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
    const users = await User.create({
      email: "user1@mail.com",
      password: hashPassword("123456"),
      fullname: "user1",
      phoneNumber: "1234567890",
      address: "Indonesia",
    });
    userToken = encodeToken({ id: users.id });
    userIdGlobal = users.id;
  });

  afterAll(async () => {
    await User.deleteMany();
    await server?.stop();
  });

  it("return new user", async () => {
    mutationRegister.variables = {
      input: {
        email: "user2@mail.com",
        password: "123456",
        fullname: "user2",
        phoneNumber: "1234567890",
        address: "Indonesia",
      },
    };
    const response = await request(url).post("/").send(mutationRegister);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("createUser");
    expect(response.body.data.createUser).toHaveProperty("id");
    expect(response.body.data.createUser).toHaveProperty("fullname", "user2");
    expect(response.body.data.createUser).toHaveProperty(
      "email",
      "user2@mail.com"
    );
    expect(response.body.data.createUser).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.createUser).toHaveProperty(
      "address",
      "Indonesia"
    );
  });

  it("login user", async () => {
    mutationLogin.variables = {
      email: "user2@mail.com",
      password: "123456",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("loginUser");
    expect(response.body.data.loginUser).toHaveProperty("access_token");
    expect(response.body.data.loginUser).toHaveProperty(
      "message",
      "Login successful"
    );
  });

  it("return all User", async () => {
    const response = await request(url).post("/").send(queryAllUser);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("users");
    expect(response.body.data.users).toHaveLength(2);
    expect(response.body.data.users[0]).toHaveProperty("id");
    expect(response.body.data.users[0]).toHaveProperty("fullname", "user1");
    expect(response.body.data.users[0]).toHaveProperty(
      "email",
      "user1@mail.com"
    );
    expect(response.body.data.users[0]).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.users[0]).toHaveProperty("address", "Indonesia");
  });

  it("return user by Id", async () => {
    queryUserById.variables = {
      userId: userIdGlobal,
    };
    const response = await request(url).post("/").send(queryUserById);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("user");
    expect(response.body.data.user).toHaveProperty("id");
    expect(response.body.data.user).toHaveProperty("fullname", "user1");
    expect(response.body.data.user).toHaveProperty("email", "user1@mail.com");
    expect(response.body.data.user).toHaveProperty("phoneNumber", "1234567890");
    expect(response.body.data.user).toHaveProperty("address", "Indonesia");
  });

  it("return userData from authentication", async () => {
    const response = await request(url)
      .post("/")
      .set("access_token", userToken)
      .send(queryUserData);
    expect(response.errors).toBeUndefined();
    expect(response.body.data).toHaveProperty("userData");
    expect(response.body.data.userData).toHaveProperty("id");
    expect(response.body.data.userData).toHaveProperty("fullname", "user1");
    expect(response.body.data.userData).toHaveProperty(
      "email",
      "user1@mail.com"
    );
    expect(response.body.data.userData).toHaveProperty(
      "phoneNumber",
      "1234567890"
    );
    expect(response.body.data.userData).toHaveProperty("address", "Indonesia");
  });

  it("should return error User not found", async () => {
    queryUserById.variables = {
      userId: "647eccf2f25105d2411efb9a",
    };
    const response = await request(url).post("/").send(queryUserById);
    expect(response.body.errors).toBeDefined();
    expect(response.body.data).toHaveProperty("user", null);
    expect(response.body.data.user).toBeNull();
    expect(response.body.errors[0].message).toBe("User not found");
  });

  it("should retur error whent userData not found", async () => {
    const response = await request(url).post("/").send(queryUserData);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0]).toHaveProperty("message", "User not found");
  });

  it("should return error Users not found", async () => {
    const invalidQueryAllUser = {
      query: `query Query {
      users {
        id
        fullname
        email
        phoneNumber
        address
        invalidProperty
      }
    }`,
    };
    const response = await request(url).post("/").send(invalidQueryAllUser);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe(
      `Cannot query field \"invalidProperty\" on type \"User\".`
    );
  });

  it("should return error when creating new User", async () => {
    mutationRegister.variables = {
      input: {
        fullname: "Anto Klewang",
        email: "",
        password: "",
        phoneNumber: "08123455",
        address: "Jl. Cut Nyak Dhien",
      },
    };
    const response = await request(url).post("/").send(mutationRegister);
    expect(response.body.errors[0].message).toBe(
      "Email or password is required"
    );
  });

  it("should return error when login User with invalid email", async () => {
    mutationLogin.variables = {
      email: "user1@mail.co",
      password: "123454",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0].message).toBe("Email or Password is wrong");
  });

  it("should return error when login User with invalid password", async () => {
    mutationLogin.variables = {
      email: "user1@mail.com",
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
      email: "user1@mail.com",
      password: "",
    };
    const response = await request(url).post("/").send(mutationLogin);
    expect(response.body.errors).toBeDefined();
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message");
  });
});

describe("Error Find Users", () => {
  let server, url;
  beforeAll(async () => {
    ({ server, url } = await createApolloServer());
  });

  afterAll(async () => {
    await User.deleteMany();
    await server?.stop();
  });
  it("Should be return error when hit findAll", async () => {
    jest.spyOn(User, "find").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryAllUser);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message");
  });

  it("Should be return error when failed find User by Id", async () => {
    jest.spyOn(User, "findById").mockRejectedValue("Internal Server Error");
    const response = await request(url).post("/").send(queryUserById);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors[0]).toHaveProperty("message");
  });
});
