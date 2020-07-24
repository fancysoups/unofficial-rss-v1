import mongoose from 'mongoose';
import { getFeedDetails } from 'backend/lib/StitcherAPI';

const schema = new mongoose.Schema(
  {
    stitcherID: { type: String, index: true, unique: true },
    title: String,
    description: String,
    imageURL: String,
    lastFetched: Date,
    episodes: [
      {
        stitcherID: { type: String, index: true, unique: true },
        title: String,
        description: String,
        published: Date,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

schema.methods.getXML = async function (user) {
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 1);
  if (!this.episodes.length || this.lastFetched < threshold) {
    console.log(`Fetching ${this.title}...`);
    const episodes = await getFeedDetails({
      feedID: this.stitcherID,
      user: user,
    });
    this.episodes = episodes.map(episode => ({
      stitcherID: episode.id,
      title: episode.title,
      description: episode.description,
      date: episode.published,
      url: episode.url,
    }));
    this.lastFetched = new Date();
    await this.save();
  }
  return { episodes: this.episodes, lastFetched: this.lastFetched };
};

let model;
try {
  model = mongoose.model('Feed');
} catch (error) {
  model = mongoose.model('Feed', schema);
}

module.exports = model;
