if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { appAuthentication } = require("../middleware/authentication");
const [UserTypeDefs, UserResolvers] = require("../schema/UserSchema");
const [StaffTypeDefs, StaffResolvers] = require("../schema/StaffSchema");
const OrderTypeDefs = require("../schema/OrderTypeDefs");
const OrderResolvers = require("../schema/OrderResolvers");
const InspectionTypeDefs = require("../schema/InpectionTypeDefs");
const InspectionResolvers = require("../schema/InspectionResolvers");
const mongoose = require("mongoose");

const dbName = process.env.DB_NAME;

const createApolloServer = async () => {
  try {
    mongoose
      .connect(dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Mongoose berhasil terhubung ke MongoDB");
      })
      .catch((error) => {
        console.error("Mongoose gagal terhubung ke MongoDB:", error);
        throw error
      });

    const server = new ApolloServer({
      typeDefs: [
        UserTypeDefs,
        StaffTypeDefs,
        InspectionTypeDefs,
        OrderTypeDefs,
      ],
      resolvers: [
        UserResolvers,
        StaffResolvers,
        InspectionResolvers,
        OrderResolvers,
      ],
      introspection: true,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
      context: async ({ req }) => {
        const token = req.headers.access_token || "";
        let user;
        if (token) {
          user = await appAuthentication(token);
        }

        return { user };
      },
    });
    return { url, server };
  } catch (error) {
    console.log("dari config/connection>>", error);
    throw error
  }
};

module.exports = createApolloServer;
