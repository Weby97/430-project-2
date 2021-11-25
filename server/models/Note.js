const mongoose = require('mongoose');
const _ = require('underscore');

let NoteModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  note: {
    type: String,
    required: true,
  },

  //   owner: {
  //     type: mongoose.Schema.ObjectId,
  //     required: true,
  //     ref: 'Account',
  //   },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  note: doc.note,
});

NoteSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return NoteModel.find(search).select('name note').lean().exec(callback);
};

NoteSchema.statics.findRandom = (callback) => {
  // aggregate with $sample size of 1 allows us to pick a random document from our collection!
  NoteModel.aggregate([{ $sample: { size: 1 } }]).exec(callback);
};

NoteModel = mongoose.model('Note', NoteSchema);
module.exports.NoteModel = NoteModel;
module.exports.NoteSchema = NoteSchema;
