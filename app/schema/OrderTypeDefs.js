const typeDefs = `#graphql

type Order {
  id: ID,
  userId: String,
  staffId: String,
  fullName: String,
  phoneNumber: String,
  inspectionAddress: String,
  price: Int,
  date: String,
  time: String,
  vehicle: Vehicle,
  map: Map,
  status: String,
  payment: String,
  paymentUrl: String
}

type Vehicle {
  type: String,
  brand: String,
  model: String,
  year: Int,
  transmission: String
}

type Map {
  city: String,
  regional: String,
  longitude: String,
  latitude: String
}

input NewOrder {
  fullName: String,
  phoneNumber: String,
  inspectionAddress: String,
  price: Int,
  date: String,
  time: String,
  vehicle: newVehicle,
  map: newMap,
  payment: String,
  status: String
}

input newVehicle {
  type: String,
  brand: String,
  model: String,
  year: Int,
  transmission: String
}

input newMap {
  city: String,
  regional: String,
  longitude: String,
  latitude: String
}

type Query {
  orders: [Order]
  ordersByRegion(regional: String): [Order]
  findOrderId(id: ID!): Order!
  findOrderByUserId: [Order]
  findOrderByStaffId: [Order]
  inspections: [Inspection]
  inspection(id: ID): Inspection
}

type Mutation {
  createOrder(NewOrder: NewOrder): Order
  updateStatus(id: ID!, status: String!): Order
}
`;

module.exports = typeDefs;
