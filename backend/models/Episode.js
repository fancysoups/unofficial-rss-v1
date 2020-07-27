import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    feedID: { type: mongoose.Schema.Types.ObjectId, ref: 'Feed' },
    stitcherID: { type: String, index: true, unique: true },
    title: String,
    description: String,
    published: Date,
    duration: Number,
    url: String,
  },
  { timestamps: true }
);

let model;
try {
  model = mongoose.model('Episode');
} catch (error) {
  model = mongoose.model('Episode', schema);
}

module.exports = model;
