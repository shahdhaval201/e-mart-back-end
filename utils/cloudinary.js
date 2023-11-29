const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dwfswe89p",
  api_key: "274528344155141",
  api_secret: "CTNlpr8OZcr-MU2XJSpI_zNtJxg",
});

const cloudinaryUploadImage = async (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      resolve(
        {
          url: result.secure_url,
        },
        {
          resource_type: "auto",
        }
      );
    });
  });
};

module.exports = { cloudinaryUploadImage };
