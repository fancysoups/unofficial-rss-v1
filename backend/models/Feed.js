import mongoose from 'mongoose';
import { getFeedDetails } from 'backend/lib/StitcherAPI';
import Episode from './Episode';
import eachOfLimit from 'async/eachOfLimit';

const schema = new mongoose.Schema(
  {
    stitcherID: { type: String, index: true, unique: true },
    title: String,
    description: String,
    imageURL: String,
    lastFetched: Date,
  },
  { timestamps: true }
);

schema.methods.getEpisodes = async function (user) {
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 1);
  if (!this.lastFetched || this.lastFetched < threshold) {
    console.log(`Fetching ${this.title}...`);
    const episodes = await getFeedDetails({
      feedID: this.stitcherID,
      user: user,
    });
    await eachOfLimit(episodes, 10, async (episode, index) => {
      await Episode.findOneAndUpdate(
        { feedID: this._id, stitcherID: episode.id },
        {
          stitcherID: episode.id,
          title: episode.title,
          description: episode.description,
          published: episode.published,
          duration: episode.duration,
          url: episode.url,
        },
        { upsert: true, new: true }
      );
    });
    this.lastFetched = new Date();
    await this.save();
  }
  const returnEpisodes = await Episode.find({ feedID: this._id })
    .sort({
      published: -1,
    })
    .lean();
  return { episodes: returnEpisodes, lastFetched: this.lastFetched };
};

let model;
try {
  model = mongoose.model('Feed');
} catch (error) {
  model = mongoose.model('Feed', schema);
}

module.exports = model;
