const Orders = require("../models/Order");
const midtransClient = require("midtrans-client");

const resolvers = {
  Query: {
    orders: async () => {
      try {
        const orders = await Orders.find({});
        return orders;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    ordersByRegion: async (_, args) => {
      try {
        const { regional } = args;
        const orders = await Orders.find({ "map.regional": regional });
        return orders;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    findOrderId: async (_, { id }) => {
      try {
        const order = await Orders.findById(id).exec();
        return order;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    findOrderByUserId: async (_, __, { user }) => {
      try {
        if (!user) {
          throw { message: "you not logging in. Login first" };
        }
        const orders = await Orders.find({
          userId: user._id.toString(),
        }).exec();
        return orders;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    findOrderByStaffId: async (_, __, { user }) => {
      try {
        if (!user) {
          throw { message: "you not logging in. Login first" };
        }
        const orders = await Orders.find({
          staffId: user._id.toString(),
        }).exec();
        return orders;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createOrder: async (_, args, { user }) => {
      try {
        if (!user) {
          throw { message: "you not logging in. Login first" };
        }

        const snap = new midtransClient.Snap({
          isProduction: false,
          serverKey: "SB-Mid-server-_VjX9WL8vfQLWT4sYAZ0mGH_",
        });

        const createdOrder = new Orders({
          userId: user._id,
          staffId: "",
          ...args.NewOrder,
          status: "pending",
          payment: "unpaid",
          price: 200000,
        });

        const res = await createdOrder.save();
        // console.log(res.price);

        const transactionDetails = {
          order_id: res.id,
          gross_amount: 200000,
        };

        const midtransParams = {
          transaction_details: transactionDetails,
        };

        const { redirect_url, token } = await snap.createTransaction(
          midtransParams
        );

        // console.log(redirect_url, token);

        return {
          id: res.id,
          paymentUrl: redirect_url,
          ...res._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateStatus: async (_, { id, status }, { user }) => {
      try {
        if (!user) {
          throw { message: "you not logging in. Login first" };
        }
        const updatedOrder = await Orders.findByIdAndUpdate(
          id,
          { status: status, staffId: user._id },
          { new: true }
        );
        return {
          id: updatedOrder.id,
          ...updatedOrder._doc,
        };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
