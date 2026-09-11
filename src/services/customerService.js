const Customer = require("../models/customer");

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log("error = ", error);
    return null;
  }
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
  try {
    let filter = {};
    if (name) {
      //tìm chuỗi có chứa name & 'i' : không phân biệt chữ thường hoa
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
    //...
    let query = Customer.find(filter);

    if (limit && page) {
      let skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }
    const result = await query.exec();
    return result;
  } catch (error) {
    console.log("error: ", error);
    return null;
  }
};
const putUpdateCustomersService = async (customerId, data) => {
  try {
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
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const deleteACustomerService = async (customerId) => {
  try {
    // let result = await Customer.deleteOne({ _id: customerId });//xóa là mất tiêu luôn không còn gì
    let result = await Customer.deleteById(customerId); //đẩy biến deleted = true
    return result;
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};

const deleteArrayCustomersService = async (customerIds) => {
  try {
    // Delete multiple object, callback
    //Pet.delete({age:10}, function (err, result) { ... });
    let result = await Customer.delete({
      _id: {
        $in: customerIds, //lấy mảng customerIds trên body
      },
    });
    return result;
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
};
module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
  deleteArrayCustomersService,
};
