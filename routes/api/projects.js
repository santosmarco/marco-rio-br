var path = require("path");
var rootDir = path.dirname(require.main.filename);

module.exports = (app) => {
  app.route("/api/projects").get((req, res) => {
    res.sendFile(rootDir + "/data/projects/projects.json");
  });
};
