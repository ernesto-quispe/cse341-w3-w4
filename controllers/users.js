const mongodb = require('../db/connect');
const Objectid = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
    const result = await mongodb.getDb().db().collection('contact').find();
    result.toArray().then((users) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(users);
    });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
    const userId = new Objectid(req.params.id);
    const result  = await mongodb.getDb().db().collection('contact').find({_id: userId});
    result.toArray().then((users) => {
       res.setHeader('Content-Type', 'application/json');
       res.status(200).json(users[0]);
    });
};

const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new Objectid(req.params.id);
  const result  = await mongodb.getDb().db().collection('contact').findOneAndUpdate({ _id: userId }, { $set: req.body })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot update user with id=${userId}. Maybe user was not found!`
      });
    } else res.send({ message: "User was updated successfully." });
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + userId
    });
  });
};

const createUser = async (req, res) => {
  //#swagger.tags=['Users']  
    const userId = new Objectid(req.params.id);
    const result  = await mongodb.getDb().db().collection('contact').insertOne(req.body)
    res.send(result);
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  const userId = new Objectid(req.params.id);
  const result = await mongodb.getDb().db().collection('contact').findOneAndDelete({ _id: userId });
  res.send(result);
};

module.exports = {
    getAll,
    getSingle,
    updateUser,
    deleteUser, 
    createUser
}