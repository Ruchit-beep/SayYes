import { describe, expect, it } from "vitest";
import { EMPTY_DRAFT, firstInvalidStep, isComplete, validateProposal, validateStep } from "./proposal";

const valid = {
  ...EMPTY_DRAFT,
  yourName: "Daniel",
  partnerName: "Emma",
  message: "You make every ordinary day feel like a holiday.",
};

describe("proposal validation", () => {
  it("requires your name", () => {
    expect(validateProposal({ ...valid, yourName: "  " }).yourName).toBeDefined();
  });

  it("requires the partner's name", () => {
    expect(validateProposal({ ...valid, partnerName: "" }).partnerName).toBeDefined();
  });

  it("requires a love message of at least 20 characters", () => {
    expect(validateProposal({ ...valid, message: "" }).message).toBeDefined();
    expect(validateProposal({ ...valid, message: "I love you so much" }).message).toBeDefined();
  });

  it("requires a main question", () => {
    expect(validateProposal({ ...valid, question: "" }).question).toBeDefined();
  });

  it("does not require a photo", () => {
    expect(validateProposal({ ...valid, photo: null }).photo).toBeUndefined();
    expect(isComplete(valid)).toBe(true);
  });

  it("only reports errors for the current step", () => {
    const errors = validateStep({ ...EMPTY_DRAFT }, 0);
    expect(Object.keys(errors).sort()).toEqual(["partnerName", "yourName"]);
  });

  it("points to the first step with a problem", () => {
    expect(firstInvalidStep({ ...valid, message: "" })).toBe(2);
    expect(firstInvalidStep(valid)).toBe(-1);
  });
});
