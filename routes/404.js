var path = require("path");
var rootDir = path.dirname(require.main.filename);

module.exports = app => {
  app.use((req, res) => {
    res.sendFile(rootDir + "/views/404.html");
  });
};
