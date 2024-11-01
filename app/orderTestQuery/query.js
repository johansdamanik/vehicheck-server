const queryAllOrder = {
  query: `query Query {
  orders {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const queryfindOrderId = {
  query: `query Query($findOrderIdId: ID!) {
  findOrderId(id: $findOrderIdId) {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const queryfindOrderByUserId = {
  query: `query FindOrderByUserId {
  findOrderByUserId {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const queryfindOrderByStaffId = {
  query: `query Query {
  findOrderByStaffId {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const queryOrdersByRegion = {
  query: `query Query($regional: String) {
  ordersByRegion(regional: $regional) {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const mutationcreateOrder = {
  query: `mutation Mutation($newOrder: NewOrder) {
  createOrder(NewOrder: $newOrder) {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

const mutationupdateStatus = {
  query: `mutation Mutation($updateStatusId: ID!, $status: String!) {
  updateStatus(id: $updateStatusId, status: $status) {
    id
    userId
    staffId
    fullName
    phoneNumber
    inspectionAddress
    price
    date
    time
    vehicle {
      type
      brand
      model
      year
      transmission
    }
    map {
      city
      regional
      longitude
      latitude
    }
    status
    payment
    paymentUrl
  }
}`,
};

module.exports = {
  queryAllOrder,
  queryfindOrderByStaffId,
  queryfindOrderByUserId,
  queryfindOrderId,
  queryOrdersByRegion,
  mutationcreateOrder,
  mutationupdateStatus,
};
