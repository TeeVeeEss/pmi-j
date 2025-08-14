const express = require("express");
const app = express();

app.use(express.static("src"));

app.get("/", (req: any, res: any) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => {
  console.log("Web server listening on port 8080");
});
