const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

//CRUD function to get all users:
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

//CRUD function to get a user by ID:
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};


//CRUD function to update a user by ID:
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          bio: req.body.bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


//CRUD function to delete a user by ID:
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};


//CRUD function for follow:
module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow))
      return res.status(400).send('Unknown ID : ' + req.params.id)
  try {
      // add to the follower list
      await UserModel.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { following: req.body.idToFollow } },
          { new: true, upsert: true },
          (err, docs) => {
              if (!err) res.status(201).json(docs);
              else return res.status(400).json(err);
          }
      );

      // add to the following list
      await UserModel.findByIdAndUpdate(
          req.body.idToFollow,
          { $addToSet: { followers: req.params.id } },
          { new: true, upsert: true },
          (err, docs) => {
              if (err) return res.status(400).json(err);
          }
      )

  } catch (err) {
      return res.status(500).json({ message: err });
  }
}

//CRUD function for unfollow:
module.exports.unfollow = async (req, res) => {
  if (
      !ObjectID.isValid(req.params.id) ||
      !ObjectID.isValid(req.body.idToUnfollow)
      )
      return res.status(400).send('Unknown ID : ' + req.params.id)

  try {

      await UserModel.findByIdAndUpdate(
          req.params.id,
          { $pull: { following: req.body.idToUnfollow } },
          { new: true, upsert: true },
          (err, docs) => {
              if (!err) res.status(201).json(docs);
              else return res.status(400).json(err);
          }
      );

      // remove from the following list
      await UserModel.findByIdAndUpdate(
          req.body.idToUnfollow,
          { $pull: { followers: req.params.id } },
          { new: true, upsert: true },
          (err, docs) => {
              if (err) return res.status(400).json(err);
          }
      )

  } catch (err) {
      return res.status(500).json({ message: err });
  }
}