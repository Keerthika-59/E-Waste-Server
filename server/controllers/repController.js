const Representative = require("../models/repModel.js");
exports.getAll = (req, res) => {
  Representative.find()
    .then((oRep) => {
      console.log("entered");
      res.send(oRep);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error occurred while retrieving the Representative details",
      });
    });
};

// Find a single representative with a representativeId
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Representative.findById(id);

    res.send(data);
  } catch (error) {
    res.status(500).send({
      message: "Not Found",
    });
  }
};

// Update a Representative identified by the RepresentativeId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Representative name can not be empty",
    });
  }

  // Find representative and update it with the request body
  Representative.findByIdAndUpdate(
    req.params.repId,
    {
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      gender: req.body.gender,
      city: req.body.city,
      address: req.body.address,
      password: req.body.password,
    },
    { new: true }
  )
    .then((oRep) => {
      if (!oRep) {
        return res.status(404).send({
          message: "Representative not found with id " + req.params.repId,
        });
      }
      res.send(oRep);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Representative not found with id " + req.params.repId,
        });
      }
      return res.status(500).send({
        message: "Error updating Representative with id " + req.params.repId,
      });
    });
};

// Delete a representative with the specified representativeId in the request
exports.delete = (req, res) => {
  Representative.findByIdAndRemove(req.params.repId)
    .then((oRep) => {
      if (!oRep) {
        return res.status(404).send({
          message: "Representative not found with id " + req.params.repId,
        });
      }
      res.send({ message: "Representative deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Representative not found with id " + req.params.repId,
        });
      }
      return res.status(500).send({
        message: "Could not delete representative with id " + req.params.repId,
      });
    });
};
