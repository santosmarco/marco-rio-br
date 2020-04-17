require("dotenv").config();
var express = require("express");
var helmet = require("helmet");
var bodyParser = require("body-parser");

var routes = [
  ["/", require("./routes/root")],
  ["/contact", require("./routes/contact")],
  ["/api/projects", require("./routes/api/projects")],
  ["/api/skills", require("./routes/api/skills")],
  ["404", require("./routes/404")]
];

var app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.static("data/projects/thumbnails"));

routes.forEach(route => route[1](app));

const listener = app.listen(process.env.PORT || 8080, () => {
  console.log("> marco.rio.br is listening on port " + listener.address().port);
});
