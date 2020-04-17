var path = require("path");
var rootDir = path.dirname(require.main.filename);

module.exports = app => {
  app.route("/").get((req, res) => {
    res.sendFile(rootDir + "/views/index.html");
  });
};
