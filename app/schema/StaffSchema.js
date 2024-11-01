const Staff = require("../models/Staff");
const {
  hashPassword,
  comparePassword,
  encodeToken,
} = require("../helpers/crypto");
const typeDefs = `#graphql

    type Staff {
        id: ID
        fullname: String
        email: String
        phoneNumber: String
        address: String
        specialist: String
    }
    input CreateStaffInput {
        fullname: String!
        email: String!
        password: String!
        phoneNumber: String!
        address: String!
        specialist: String
    }
    type LoginResponse {
        access_token: String
        message: String
    }
    type Query {
        staff(id: ID!): Staff
        staffs: [Staff]
        staffData: Staff
    }  
    type Mutation {
        createStaff(input: CreateStaffInput!): Staff
        loginStaff(email: String!, password: String!): LoginResponse!
    }
`;

const resolvers = {
  Query: {
    staff: async (_, { id }) => {
      try {
        const staff = await Staff.findById(id);
        if (!staff) {
          throw new Error("Staff not found");
        }
        return staff;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    staffData: async (_, _args, { user }) => {
      try {
        if (!user) {
          throw new Error("Staff not found");
        }
        const data = await Staff.findById(user.id);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    staffs: async () => {
      try {
        const staffs = await Staff.find({});
        return staffs;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createStaff: async (_, { input }) => {
      try {
        if (!input.email || !input.password) {
          throw new Error("Email or password is required");
        }

        const { fullname, email, password, phoneNumber, address, specialist } =
          input;
        const hashedPassword = hashPassword(password);
        const staff = new Staff({
          fullname,
          email,
          password: hashedPassword,
          phoneNumber,
          address,
          specialist,
        });
        const newStaff = await staff.save();
        return newStaff;
      } catch (error) {
        throw error;
      }
    },
    loginStaff: async (_, { email, password }) => {
      try {
        if (!email) {
          throw new Error("Email is required");
        }
        if (!password) {
          throw new Error("Password is required");
        }

        const staff = await Staff.findOne({ email });

        if (!staff) {
          throw new Error("Email or Password is wrong");
        }

        const isValidPassword = comparePassword(password, staff.password);
        if (!isValidPassword) {
          throw new Error("Email or Password is wrong");
        }

        const token = encodeToken({ id: staff.id });
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
