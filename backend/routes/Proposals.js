

const express = require("express");
const crypto = require("crypto");
const Proposal = require("../models/Proposal");

const router = express.Router();

// CREATE A NEW PROPOSAL
router.post("/", async (req, res) => {
  try {
    const {
      proposerName,
      partnerName,
      message,
      question,
      theme,
      photoUrl
    } = req.body;

    // Validate required fields
    if (!proposerName || !partnerName || !message) {
      return res.status(400).json({
        success: false,
        message: "Please enter both names and your message."
      });
    }

    // Generate a unique sharing ID
    const slug = crypto.randomBytes(6).toString("hex");

    // Save proposal in MongoDB
    const proposal = await Proposal.create({
      proposerName,
      partnerName,
      message,
      question,
      theme,
      photoUrl,
      slug
    });

    return res.status(201).json({
      success: true,
      message: "Proposal created successfully!",
      proposal,
      shareUrl: `${process.env.CLIENT_URL || "https://sayeyes.lovable.app"}/p/${slug}`
    });

  } catch (error) {
    console.error("Create proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the proposal."
    });
  }
});


// GET A PROPOSAL USING ITS UNIQUE LINK
router.get("/:slug", async (req, res) => {
  try {
    const proposal = await Proposal.findOne({
      slug: req.params.slug
    });

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found."
      });
    }

    return res.status(200).json({
      success: true,
      proposal
    });

  } catch (error) {
    console.error("Get proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve proposal."
    });
  }
});


// MARK A PROPOSAL AS ACCEPTED
router.patch("/:slug/accept", async (req, res) => {
  try {
    const proposal = await Proposal.findOneAndUpdate(
      { slug: req.params.slug },
      { accepted: true },
      { new: true }
    );

    if (!proposal) {
      return res.status(404).json({
        success: false,
        message: "Proposal not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Proposal accepted!",
      proposal
    });

  } catch (error) {
    console.error("Accept proposal error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to update proposal."
    });
  }
});

module.exports = router;
