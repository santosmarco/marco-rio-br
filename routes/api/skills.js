var path = require("path");
var rootDir = path.dirname(require.main.filename);

module.exports = app => {
  app.route("/api/skills").get((req, res) => {
    res.sendFile(rootDir + "/data/skills/skills.json");
  });
};
