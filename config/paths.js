const path = require("path");
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => (path.resolve(appDirectory, relativePath));



const nodePaths = (process.env.NODE_PATH || "")
  .split(process.platform === "win32" ? ";" : ":")
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

module.exports = {
  appRoot: resolveApp(""),
  appPublic: resolveApp("app/public"),
  appHtml: resolveApp("app/public/index.html"),
  appIndexJs: resolveApp("app/index.jsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("app/")
};
