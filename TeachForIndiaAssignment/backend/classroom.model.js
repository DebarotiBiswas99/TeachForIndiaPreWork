const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  classroomID: { type: String, required: true },
  capacity: { type: Number, required: true },
  requirement: { type: String, required: true },
  subjects: [String],
  languageRequirement: [String],
  location: { type: String, required: true },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

module.exports = Classroom;
