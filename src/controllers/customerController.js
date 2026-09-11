const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
  deleteArrayCustomersService,
} = require("../services/customerService");

const aqp = require("api-query-params");
//1 cách khác để viết API
//{key : value}
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    let imageUrl = "";
    //image: String
    if (!req.files || req.files.length === 0) {
      //   return res.status(400).json({ error: "Vui lòng chọn ít nhất một file!" });
      //do nothing
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  getAllCustomers: async (req, res) => {
    const { limit, page, name, address, phone, email, city, age } = req.query;
    const result = await getAllCustomersService({
      limit: Number(limit),
      page: Number(page),
      name,
      address,
      phone,
      email,
      city,
      age,
    });

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  putUpdateCustomers: async (req, res) => {
    let { customerId, name, email, address } = req.body;
    const data = {
      name,
      email,
      address,
    };
    let result = await putUpdateCustomersService(customerId, data);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteACustomer: async (req, res) => {
    let customerId = req.body.id;

    const result = await deleteACustomerService(customerId);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteArrayCustomers: async (req, res) => {
    let customerIds = req.body.customerIds;
    let result = await deleteArrayCustomersService(customerIds);
    console.log("check customerIds = ", customerIds);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
