const express = require("express");

const { fetchuser } = require("../middleware/fetchuser");
const {
  addNotes,
  updateNotes,
  getNotes,
} = require("../controllers/notesController");
const router = express.Router();
// Notes routes
router
  .route("/")
  .post(fetchuser, addNotes) // To add notes
  .get(fetchuser, getNotes); // To get notes

router.route("/:id").put(fetchuser, updateNotes); // To update notes

module.exports = router;
