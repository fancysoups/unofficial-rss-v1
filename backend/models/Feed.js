import mongoose from 'mongoose';
import { getFeedDetails } from 'backend/lib/StitcherAPI';
import Episode from './Episode';
import eachOfLimit from 'async/eachOfLimit';
import equal from 'fast-deep-equal';

const schema = new mongoose.Schema(
  {
    stitcherID: { type: String, index: true, unique: true },
    title: String,
    description: String,
    imageURL: String,
    lastFetched: Date,
    lastModified: Date,
  },
  { timestamps: true }
);

schema.methods.getEpisodes = async function (user) {
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 1);
  if (!this.lastModified || !this.lastFetched || this.lastFetched < threshold) {
    console.log(`Fetching ${this.title}...`);
    const episodes = await getFeedDetails({
      feedID: this.stitcherID,
      user: user,
    });
    let changed = false;
    const { deletedCount } = await Episode.deleteMany({
      feedID: this._id,
      stitcherID: { $nin: episodes.map(ep => ep.id) },
    });
    if (deletedCount > 0) changed = true;
    await eachOfLimit(episodes, 10, async (episode, index) => {
      const existingQuery = { feedID: this._id, stitcherID: episode.id };
      const existingEpisode = await Episode.findOne(existingQuery)
        .select('-_id feedID stitcherID title description duration url')
        .lean();
      const updatedEpisode = {
        feedID: this._id,
        stitcherID: episode.id,
        title: episode.title,
        description: episode.description,
        duration: parseInt(episode.duration),
        url: episode.url,
      };
      if (!existingEpisode || !equal(existingEpisode, updatedEpisode)) {
        await Episode.updateOne(
          existingQuery,
          { ...updatedEpisode, published: episode.published },
          {
            upsert: true,
          }
        );
        if (!changed) changed = true;
      }
    });
    this.lastFetched = new Date();
    if (changed || !this.lastModified) {
      console.log('Feed changed, updating modified date.');
      this.lastModified = new Date();
    }
    await this.save();
  }
  const returnEpisodes = await Episode.find({ feedID: this._id })
    .sort({
      published: -1,
    })
    .lean();
  return { episodes: returnEpisodes, lastModified: this.lastModified };
};

let model;
try {
  model = mongoose.model('Feed');
} catch (error) {
  model = mongoose.model('Feed', schema);
}

module.exports = model;
