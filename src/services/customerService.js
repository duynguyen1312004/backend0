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
const getAllCustomersService = async () => {
  try {
    let result = await Customer.find({});
    console.log("Customers:", result);
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
module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
};
