
const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema({
  proposerName: {
    type: String,
    required: true,
    trim: true
  },
  partnerName: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  question: {
    type: String,
    default: "Will you be mine?"
  },
  theme: {
    type: String,
    default: "romantic-pink"
  },
  photoUrl: {
    type: String,
    default: ""
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  accepted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Proposal = mongoose.model("Proposal", proposalSchema);

module.exports = Proposal;
