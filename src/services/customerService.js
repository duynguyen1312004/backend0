const Customer = require("../models/customer");
// const aqp = require("api-query-params");

const createCustomerService = async (customerData) => {
  const result = await Customer.create({
    name: customerData.name,
    address: customerData.address,
    phone: customerData.phone,
    email: customerData.email,
    description: customerData.description,
    image: customerData.image,
  });
  return result;
};

const createArrayCustomerService = async (arr) => {
  let result = await Customer.insertMany(arr);
  return result;
};

const getAllCustomersService = async ({
  limit,
  page,
  name,
  address,
  phone,
  email,
  city,
  age,
}) => {
  let filter = {};

  if (name) {
    filter.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (phone) {
    filter.phone = {
      $regex: phone,
      $options: "i",
    };
  }

  if (address) {
    filter.address = {
      $regex: address,
      $options: "i",
    };
  }

  if (email) {
    filter.email = {
      $regex: email,
      $options: "i",
    };
  }

  if (city) {
    filter.city = {
      $regex: city,
      $options: "i",
    };
  }

  if (age) {
    filter.age = Number(age);
  }

  let query = Customer.find(filter);

  if (limit && page) {
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
  }

  const result = await query.exec();

  return result;
};

const putUpdateCustomersService = async (customerId, data) => {
  // let result = await Customer.findByIdAndUpdate(customerId, data, {
  //   new: true,
  // });
  let result = await Customer.updateOne(
    { _id: customerId },
    {
      ...data, //hoặc bỏ đi {} chỉ còn data thôi là nó đúng
    },
  );
  return result;
};

const deleteACustomerService = async (customerId) => {
  // let result = await Customer.deleteOne({ _id: customerId });//xóa là mất tiêu luôn không còn gì
  let result = await Customer.deleteById(customerId); //đẩy biến deleted = true
  return result;
};

const deleteArrayCustomersService = async (customerIds) => {
  // Delete multiple object, callback
  //Pet.delete({age:10}, function (err, result) { ... });
  let result = await Customer.delete({
    _id: {
      $in: customerIds, //lấy mảng customerIds trên body
    },
  });
  return result;
};
module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
  deleteArrayCustomersService,
};
