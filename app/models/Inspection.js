const { model, Schema } = require("mongoose");

const inspectionSchema = new Schema(
  {
    orderId: String,
    vehicle: {
      type: { type: String },
      brand: String,
      model: String,
      year: Number,
      transmission: String,
    },
    exterior: {
      bemperDepan: {
        status: String,
        title: { type: String, default: "Bemper Depan" },
      },
      bemperBelakang: {
        status: String,
        title: { type: String, default: "Bemper Belakang" },
      },
      kapMesin: {
        status: String,
        title: { type: String, default: "Kap Mesin" },
      },
      pintuDepan: {
        status: String,
        title: { type: String, default: "Pintu Depan" },
      },
      pintuBelakang: {
        status: String,
        title: { type: String, default: "Pintu Belakang" },
      },
      kapBagasi: {
        status: String,
        title: { type: String, default: "Kap Bagasi" },
      },
      photo: Array,
    },
    interior: {
      kameraMundur: {
        status: String,
        title: { type: String, default: "Kamera Mundur" },
      },
      pemutarAudio: {
        status: String,
        title: { type: String, default: "Pemutar Audio" },
      },
      speaker: {
        status: String,
        title: { type: String, default: "Jok Driver" },
      },
      jokDriver: {
        status: String,
        title: { type: String, default: "Jok Driver" },
      },
      laciDashboard: {
        status: String,
        title: { type: String, default: "Laci Dashboard" },
      },
      ac: {
        status: String,
        title: { type: String, default: "Air Conditioner" },
      },
      photo: Array,
    },
    components: {
      belts: {
        status: String,
        title: { type: String, default: "Belt Mesin" },
      },
      engine: {
        status: String,
        title: { type: String, default: "Mesin" },
      },
      mesinAkselerasi: {
        status: String,
        title: { type: String, default: "Mesin Akselereasi" },
      },
      engineIdling: {
        status: String,
        title: { type: String, default: "Mesin Idle" },
      },
      engineStarling: {
        status: String,
        title: { type: String, default: "Mesin Starling" },
      },
      suaraMesin: {
        status: String,
        title: { type: String, default: "Suara Mesin" },
      },
      aki: {
        status: String,
        title: { type: String, default: "Aki" },
      },
      dinamo: {
        status: String,
        title: { type: String, default: "Dinamo" },
      },
      moutingTransmisi: {
        status: String,
        title: { type: String, default: "Mounting Transmisi" },
      },
      radiator: {
        status: String,
        title: { type: String, default: "Radiator" },
      },
      tangkiRadiator: {
        status: String,
        title: { type: String, default: "Tangki Radiator" },
      },
      kipasRadiator: {
        status: String,
        title: { type: String, default: "Kipas Radiator" },
      },
      tutupRadiator: {
        status: String,
        title: { type: String, default: "Tutup Radiator" },
      },
      photo: Array,
    },
    tesJalan: {
      bunyiTransisi: {
        status: String,
        title: { type: String, default: "Bunyi Transimis" },
      },
      rodaPenggerak: {
        status: String,
        title: { type: String, default: "Roda Penggerak" },
      },
      sistemKopling: {
        status: String,
        title: { type: String, default: "Sistem Kopling" },
      },
      sistemTuasRem: {
        status: String,
        title: { type: String, default: "Sistem Tuas Rem" },
      },
      perpindahanTransmisi: {
        status: String,
        title: { type: String, default: "Perpindahan Transmisi" },
      },
      photo: Array,
    },
    url: String,
  },
  { collection: "Inspectiondb" }
);

module.exports = model("Inspection", inspectionSchema);
