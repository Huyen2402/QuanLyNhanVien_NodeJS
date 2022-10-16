const ApiError = require("../api-error.js");
const TaiKhoanService = require("../services/taikhoan.service.js");
const MongoDB = require("../utils/monggodb.util.js");
// exports.create = (req, res)=>{
//     res.send({message:"create handler"});

// };
// exports.create = async (req, res, next) => {
//   if (!req.body?.name) {
//     return next(new ApiError(400, "Name can not be empty"));
//   }
//   try {
//     const contactService = new ContactService(MongoDB.client);
//     const document = await contactService.create(req.body);
//     return res.send(document);
//   } catch (error) {
//     return next(
//       new ApiError(500, error.message)
//     );
//   }
// };
exports.create = async (req, res, next) => {
    if (!req.body?.username) {
      return next(new ApiError(400), "Name can not be empty");
    }
    try {
      const taikhoanService = new TaiKhoanService(MongoDB.client);
      const document = await taikhoanService.create(req.body);
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while creating the Phong")
      );
    }
  };
// exports.findAll = (req, res)=>{
//     res.send({message:"findAll handler"});
// };

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const taikhoanService = new TaiKhoanService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await taikhoanService.findByName(name);
    } else {
      documents = await taikhoanService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrierving the Phong")
    );
  }
  return res.send(documents);
};
// exports.findOne = (req, res)=>{
//     res.send({message:"findOne handler"});
// };
exports.findOne = async (req, res, next) => {
  try {
    const taikhoanService = new TaiKhoanService(MongoDB.client);
    const document = await taikhoanService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Phong not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving Phong with id=${req.params.id}`)
    );
  }
};
// exports.update = (req, res)=>{
//     res.send({message:"update handler"});
// };

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not empty"));
  }
  try {
    const taikhoanService = new TaiKhoanService(MongoDB.client);
    const document = await taikhoanService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Phong not found"));
    }
    return res.send({ message: "Phong was update successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating Phong with id=${req.params.id}`)
    );
  }
};
// exports.delete = (req, res) => {
//   res.send({ message: "delete handler" });
// };
exports.delete = async (req, res, next) => {
    try {
        const taikhoanService = new TaiKhoanService(MongoDB.client);
        const document = await taikhoanService.delete_id(req.params.id);
        if(!document){
            return next(new ApiError(404, "Phong not found"));
        }
        return res.send({ message: "Phong was delete successfully" });
    }
    catch(error){
        return next(
            new ApiError(500, `Could not delete Phong with id=${req.params.id}`)
          );
    }
}
// exports.deleteAll = (req, res) => {
//   res.send({ message: "deleteAll handler" });
// };

exports.findAllFavorite = async (req, res, next) => {
    try {
      const taikhoanService = new TaiKhoanService(MongoDB.client);
      const documents = await taikhoanService.findFavorite();
      return res.send(documents);
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while retrieving favorite Phongs")
      );
    }
  };

  // exports.deteleAll = async (req, res, next) => {
  //   try {
  //     const contactService = new ContactService(MongoDB.client);
  //     const deletedCount = await contactService.deleteAll();
  //     return res.send({
  //       message: `${deletedCount} contacts were deleted successfully`,
  //     });
  //   } catch (error) {
  //     return next(
  //       new ApiError(500, "An error occurred while removing all contacts")
  //     );
  //   }
  // };
// exports.findAllFavorite = (req, res) => {
//   res.send({ message: "findAllFavorite handler" });
// };
exports.deleteAll = async(req,res,next) => {
  try {
        const taikhoanService = new TaiKhoanService(MongoDB.client);
        const deletedCount = await taikhoanService.deleteAll();
        return res.send({
          message: `${deletedCount} Phongs were deleted successfully`,
        });
}
catch(error){
  return next(
          new ApiError(500, "An error occurred while removing all Phongs")
        );
}


}
exports.login = async(req, res, next) =>{
    const username = req.body.username;
    const password = req.body.password;
    // const { username, password} = req.query;
    const taikhoanService = new TaiKhoanService(MongoDB.client);
    const user = await taikhoanService.findByNamePass(username, password);
    if(user == null){
      
        return next(
            new ApiError(400, "Không tìm thấy user")
          );
    }
    try{
        if(user){
       
            return res.send({ message: "Thành công" });
        }
        else{
            return next(
                new ApiError(400, "Không tìm thấy user")
              );
        }

    }
    catch{
        return next(
            new ApiError(500, "An error occurred while retrieving favorite Tai Khoan")
          );
    }
}
