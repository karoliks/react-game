const Guard = {
  name: "Guard",
  message: "Good day! I am guarding this chest. Just wanted you to know.",
  answers: {
    answers: [
      "Ofc, no problem",
      "if you say so",
      "you ar not a very good guard",
      "okidoki",
    ],
    chargeAtZero: false,
  },
  storeChangeIfZero: { type: "DEFAULT", payload: true },

  className: "big-guard",
};

export { Guard };
