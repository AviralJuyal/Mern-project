const mongoose = require("mongoose");
const notesModel = require("../models/NotesModel");

exports.addNotes = async (req, res) => {
  try {
    await notesModel.create({ ...req.body, userId: req.user.id });
    res.json({ success: true, msg: "Note added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const noteId = req.params;
    const objectId = new mongoose.Types.ObjectId(noteId);
    await notesModel.findByIdAndUpdate(objectId, req.body);

    res.json({ success: true, msg: "Note updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({ userId: req.user.id });
    const data = notes.map((e) => ({
      text: e.text,
      userId: e.userId,
      id: e.id,
    }));
    res.json({ success: true, notes: data });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};
