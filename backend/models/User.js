const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const JWT_SECRET = process.env.JWT_SECRET;
const { getSubscriptionStatus } = require('backend/lib/StitcherAPI');

const schema = new mongoose.Schema(
  {
    stitcherID: { type: String, index: true, unique: true },
    expiration: Date,
    privateID: { type: Number, index: true },
    privateKey: { type: Number, index: true },
  },
  { timestamps: true }
);

schema.methods.verifyStitcherPremiumSubscription = async function () {
  const threshold = new Date();
  threshold.setHours(threshold.getHours() - 2);
  if (this.updatedAt > threshold) return this.expiration > new Date();
  console.log("Checking user's subscription status...");
  const status = await getSubscriptionStatus({ userID: this.stitcherID });
  if (status.subscriptionExpiration)
    this.expiration = new Date(status.subscriptionExpiration + '-08:00');
  else this.expiration = null;
  this.updatedAt = new Date();
  await this.save();
  return this.expiration > new Date();
};

schema.methods.generatePrivateLogin = async function () {
  this.privateID = generateRandomKey();
  this.privateKey = generateRandomKey();
  await this.save();
};

schema.methods.generateToken = function () {
  return jwt.encode({ _id: this._id }, JWT_SECRET);
};

schema.statics.verifyToken = async sessionToken => {
  try {
    const decoded = jwt.decode(sessionToken, JWT_SECRET);
    return await mongoose.model('User').findOne({ _id: decoded._id });
  } catch (error) {
    return false;
  }
};

let model;
try {
  model = mongoose.model('User');
} catch (error) {
  model = mongoose.model('User', schema);
}

module.exports = model;

function generateRandomKey() {
  return Math.floor(Math.random() * 90000) + 10000;
}
