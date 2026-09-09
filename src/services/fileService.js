const path = require("path");

const uploadSingleFile = async (fileObject) => {
  // Folder lưu ảnh
  const uploadPath = path.resolve(__dirname, "../public/images/upload");

  // Lấy extension
  const extName = path.extname(fileObject.name);

  // Lấy tên file không có extension
  const baseName = path.basename(fileObject.name, extName);

  // Tạo tên file mới
  const finalName = `${baseName}-${Date.now()}${extName}`;

  // Đường dẫn đầy đủ

  const finalPath = path.join(uploadPath, finalName);
  console.log("uploadPath =", uploadPath);
  console.log("finalPath =", finalPath);
  try {
    await fileObject.mv(finalPath);

    return {
      status: "success",
      name: finalName,
      path: `/images/upload/${finalName}`,
      error: null,
    };
  } catch (err) {
    console.log(">>check err: ", err);
    return {
      status: "failed",
      path: null,
      error: JSON.stringify(err),
    };
  }
};

const uploadMultipleFiles = async (fileArray) => {
  let results = [];

  for (const fileObject of fileArray) {
    // folder lưu ảnh
    const uploadPath = path.resolve(__dirname, "../public/images/upload");

    // lấy extension
    const extName = path.extname(fileObject.name);

    // lấy tên file không có extension
    const baseName = path.basename(fileObject.name, extName);

    // tạo tên file mới
    const finalName = `${baseName}-${Date.now()}${extName}`;

    // tạo đường dẫn đầy đủ
    const finalPath = path.join(uploadPath, finalName);

    try {
      await fileObject.mv(finalPath);

      results.push({
        status: "success",
        path: finalName,
        error: null,
      });
    } catch (err) {
      results.push({
        status: "failed",
        path: null,
        error: JSON.stringify(err),
      });
    }
  }

  return results;
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
