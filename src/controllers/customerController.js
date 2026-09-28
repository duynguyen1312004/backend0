const { uploadSingleFile } = require("../services/fileService");

const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  putUpdateCustomersService,
  deleteACustomerService,
  deleteArrayCustomersService,
} = require("../services/customerService");

const postCreateCustomer = async (req, res) => {
  const { name, address, phone, email, description } = req.body;

  let imageUrl = "";

  if (req.files && req.files.image) {
    const result = await uploadSingleFile(req.files.image);
    imageUrl = result.path;
  }

  const customerData = {
    name,
    address,
    phone,
    email,
    description,
    image: imageUrl,
  };

  const customer = await createCustomerService(customerData);

  return res.status(200).json({
    EC: 0,
    data: customer,
  });
};

const postCreateArrayCustomer = async (req, res) => {
  const customers = await createArrayCustomerService(req.body.customers);

  return res.status(200).json({
    EC: 0,
    data: customers,
  });
};

const getAllCustomers = async (req, res) => {
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
};

const putUpdateCustomers = async (req, res) => {
  const { customerId, name, email, address } = req.body;

  const data = {
    name,
    email,
    address,
  };

  const result = await putUpdateCustomersService(customerId, data);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const deleteACustomer = async (req, res) => {
  const { customerId } = req.body;

  const result = await deleteACustomerService(customerId);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

const deleteArrayCustomers = async (req, res) => {
  const { customerIds } = req.body;

  const result = await deleteArrayCustomersService(customerIds);

  return res.status(200).json({
    EC: 0,
    data: result,
  });
};

module.exports = {
  postCreateCustomer,
  postCreateArrayCustomer,
  getAllCustomers,
  putUpdateCustomers,
  deleteACustomer,
  deleteArrayCustomers,
};
