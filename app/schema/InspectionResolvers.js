const Inspections = require("../models/Inspection");
const pdf = require("pdf-creator-node");
const fs = require("fs");
const ImageKit = require("imagekit");

const resolvers = {
  Query: {
    inspections: async () => {
      try {
        const inspections = await Inspections.find({});
        // console.log(inspections);
        return inspections;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    findInspectionByOrderId: async (_, { orderId }) => {
      try {
        const inspectionById = await Inspections.find({
          orderId: orderId,
        });
        return inspectionById;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    createInspection: async (_, { input }) => {
      try {
        const newInspection = new Inspections(input);
        var html = fs.readFileSync("./index.html", "utf-8");
        var options = {
          format: "A4",
          orientation: "portrait",
          border: "10mm",
        };

        var document = {
          html: html,
          data: {
            inspection: [newInspection.toJSON()],
          },
          path: `./pub/pdf/inspection${newInspection.orderId}.pdf`,
        };

        const pdfResult = await pdf.create(document, options);

        const imagekit = new ImageKit({
          publicKey: "public_QrGKHDrNZy1kdNXIHJ6eA1UnKJY=",
          privateKey: "private_3pqDkE1q4F8Vr0MwXsoCiUNStEs=",
          urlEndpoint: `https://ik.imagekit.io/f7cofnc56/`,
        });

        const pdfFile = fs.readFileSync(
          `./pub/pdf/inspection${newInspection.orderId}.pdf`
        );
        const uploadResult = await imagekit.upload({
          file: pdfFile, // Menyediakan buffer file
          fileName: `inspection${newInspection.orderId}.pdf`, // Mengatur nama file yang diinginkan
          folder: "/pdf", // Mengatur path folder (opsional)
        });
        newInspection.url = uploadResult.url;
        const res = await newInspection.save();
        return res;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    updateInspection: async (_, { id, input }) => {
      try {
        const updatedInspection = await Inspections.findByIdAndUpdate(
          id,
          input,
          { new: true }
        );
        return updatedInspection;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    deleteInspection: async (_, { id }) => {
      try {
        await Inspections.findByIdAndRemove(id);
        return { message: "Inspection deleted successfully" };
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
