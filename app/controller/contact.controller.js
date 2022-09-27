const ApiError = require("../api-error.js");
const ContactService = require("../services/contact.service.js");
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
    if (!req.body?.name) {
      return next(new ApiError(400), "Name can not be empty");
    }
    try {
      const contactService = new ContactService(MongoDB.client);
      const document = await contactService.create(req.body);
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while creating the contact")
      );
    }
  };
// exports.findAll = (req, res)=>{
//     res.send({message:"findAll handler"});
// };

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const contactService = new ContactService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await contactService.findByName(name);
    } else {
      documents = await contactService.find({});
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrierving the contact")
    );
  }
  return res.send(documents);
};
// exports.findOne = (req, res)=>{
//     res.send({message:"findOne handler"});
// };
exports.findOne = async (req, res, next) => {
  try {
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
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
    const contactService = new ContactService(MongoDB.client);
    const document = await contactService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was update successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};
// exports.delete = (req, res) => {
//   res.send({ message: "delete handler" });
// };
exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete_id(req.params.id);
        if(!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was delete successfully" });
    }
    catch(error){
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
          );
    }
}
// exports.deleteAll = (req, res) => {
//   res.send({ message: "deleteAll handler" });
// };

exports.findAllFavorite = async (req, res, next) => {
    try {
      const contactService = new ContactService(MongoDB.client);
      const documents = await contactService.findFavorite();
      return res.send(documents);
    } catch (error) {
      return next(
        new ApiError(500, "An error occurred while retrieving favorite contacts")
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
        const contactService = new ContactService(MongoDB.client);
        const deletedCount = await contactService.deleteAll();
        return res.send({
          message: `${deletedCount} contacts were deleted successfully`,
        });
}
catch(error){
  return next(
          new ApiError(500, "An error occurred while removing all contacts")
        );
}
}
