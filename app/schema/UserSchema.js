const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  encodeToken,
} = require("../helpers/crypto");

const typeDefs = `#graphql
    type User {
        id: ID
        fullname: String
        email: String
        phoneNumber: String
        address: String
    }
    input CreateUserInput {
        fullname: String!
        email: String!
        password: String!
        phoneNumber: String!
        address: String!
    }
    type LoginResponse {
        access_token: String
        message: String
    }
    type DeleteResult {
        message: String
    }
    type Query {
        user(id: ID!): User
        users: [User]
        userData: User
    }
    type Mutation {
        createUser(input: CreateUserInput!): User
        loginUser(email: String!, password: String!): LoginResponse!
    }
`;

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw error;
      }
    },
    userData: async (_, __, { user }) => {
      try {
        if (!user) {
          throw new Error("User not found");
        }
        const data = await User.findById(user.id);
        return data;
      } catch (error) {
        throw error;
      }
    },
    users: async () => {
      try {
        const users = await User.find({});
        return users;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        if (!input.email || !input.password) {
          throw new Error("Email or password is required");
        }

        const { fullname, email, password, phoneNumber, address } = input;
        const hashedPassword = hashPassword(password);
        const user = new User({
          fullname,
          email,
          password: hashedPassword,
          phoneNumber,
          address,
        });
        const newUser = await user.save();
        return newUser;
      } catch (error) {
        throw error;
      }
    },
    loginUser: async (_, { email, password }) => {
      try {
        if (!email) {
          throw new Error("Email is required");
        }
        if (!password) {
          throw new Error("Password is required");
        }

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Email or Password is wrong");
        }

        const isValidPassword = comparePassword(password, user.password);
        if (!isValidPassword) {
          throw new Error("Email or Password is wrong");
        }
        const token = encodeToken({ id: user.id });
        return {
          access_token: token,
          message: "Login successful",
        };
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = [typeDefs, resolvers];
