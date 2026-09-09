const { uploadSingleFile } = require("../services/fileService");
const { createCustomerService } = require("../services/customerService");
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
};
