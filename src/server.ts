const RateLimit = require("express-rate-limit");
const express = require("express");
const app = express();

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// apply rate limiter to all requests
app.use(limiter);

app.use(express.static("src"));

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => {
  console.log("Web server listening on port 8080");
});
