const asyncHandler = require("express-async-handler");
const Note = require("../models/note");
const validateMongoDbId = require("../utils/validatemongodbId");
const User = require("../models/user");

const createNewNote = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { title, description, norder } = req.body;

  const user = await User.findById(_id);
  const newNote = await Note.create({
    title,
    description,
    norder,
    noteby: user._id,
  });

  res.status(200).json(newNote);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteNote = await Note.findByIdAndDelete(id);
    res.status(200).json(deleteNote);
  } catch (error) {
    throw new Error(error);
  }
});

const getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const findNote = await Note.findById(id);
    res.json(findNote);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllNote = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    //----- Mongoose 6.0 o less excluir campos fueera del modelo Note ------
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    //----------------------------- o ---------------------------
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Note.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // pagination

    const page = req.query.page;
    const limit = 2; // req.query.limit
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const noteCount = await Note.countDocuments();
      if (skip >= noteCount) throw new Error("This Page does not exists");
    }

    const allNote = await query;
    res.json(allNote);
  } catch (error) {
    throw new Error(error);
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updateNote = await Note.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    res.json(updateNote);
  } catch (error) {
    throw new Error(error);
  }
});

const updateNoteDone = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const taskdone = await Note.findByIdAndUpdate(id);
    taskdone.done = !taskdone.done;

    await taskdone.save();
    res.send(taskdone);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createNewNote,
  getNote,
  getAllNote,
  deleteNote,
  updateNote,
  updateNoteDone,
};
