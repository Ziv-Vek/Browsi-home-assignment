import express from "express";
import { publishers } from "../server.js";

const domainsRouter = express.Router();

domainsRouter.post("/domains", (req, res) => {
  const { publisherName } = req.body;

  if (!publisherName) {
    return res.status(400).json({ errorMessage: "Publisher name is required" });
  }

  const publisher = publishers.find(p => p.publisher.toLowerCase() === publisherName.toLowerCase());

  if (publisher) {
    res.status(200).json(publisher.domains);
  } else {
    res.status(404).json({ errorMessage: "Publisher not found" });
  }
});

export default domainsRouter;
