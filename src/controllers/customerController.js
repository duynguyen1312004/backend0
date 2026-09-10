const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
} = require("../services/customerService");
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
    let result = await getAllCustomersService();
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
    console.log("check customerId = ", customerId);
    const result = await deleteACustomerService(customerId);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
