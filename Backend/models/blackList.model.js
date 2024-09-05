import db from '../config/db.js';

const {Schema} = db;

const blacklistSchema = new Schema({
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 86400
    },
    expiresAt: Date,
  });
  
const BlacklistModel = db.model('blacklist', blacklistSchema);

export default BlacklistModel;
  