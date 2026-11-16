import samplePhoto from "@/assets/sample-couple.jpg";
import { SAMPLE_MESSAGE, type Proposal } from "./proposal";

export const SAMPLE_PROPOSAL: Proposal = {
  id: "sample",
  createdAt: "2026-02-14T18:30:00.000Z",
  yourName: "Daniel",
  partnerName: "Emma",
  photo: samplePhoto,
  message: SAMPLE_MESSAGE,
  theme: "blush",
  question: "Will you be mine?",
};
