import express from "express";
import bodyParser from "body-parser";
import { getAds } from "./services/controllers";
import makeCallback from "./services/express-callback";
import dotenv from "dotenv";

dotenv.config();

let appInsights = require("applicationinsights");
appInsights.setup().start();
let client = appInsights.defaultClient;

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello Kijiji Express Watcher");
});
app.get("/ads/search");
app.use("/ads/search", makeCallback(getAds));
app
  .listen(port, () => {
    client.trackEvent({ name: "Server has Started", properties: { port } });
    return console.log(`Server Listening on ${port}`);
  })
  .on("error", (err) => {
    client.trackException({ exception: err });
    return console.log(err);
  });
