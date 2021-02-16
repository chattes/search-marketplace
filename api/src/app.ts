import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { getAds, saveQuery } from "./modules/marketplace/services/controllers";
import makeCallback from "./modules/marketplace/services/express-callback";

let appInsights = require("applicationinsights");
appInsights.setup().start();
let client = appInsights.defaultClient;

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello Kijiji Express Watcher");
});
app.get("/ads/search", makeCallback(getAds));
app.post("/ads/search", makeCallback(saveQuery));
// app.post("/ads/search/result", (req, res) => {
//   req.body.forEach((element: any) => {
//     if (element.eventType === "Microsoft.EventGrid.SubscriptionValidationEvent"){
//       console.log("Validation Handshake!!!")
//       return res.send({ validationResponse: element.data.validationCode });
//     }
//     if(element.eventType === "Microsoft.Storage.BlobCreated"){
//       return console.log("Blob Created Event Received", req.body[0])
//     }
//     console.log("Some other Event Received", req.body.eventType)
//   });
// });
app
  .listen(port, () => {
    client.trackEvent({ name: "Server has Started", properties: { port } });
    return console.log(`Server Listening on ${port}`);
  })
  .on("error", (err) => {
    client.trackException({ exception: err });
    return console.log(err);
  });
