/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: [".*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  appDirectory: "app",
  browserBuildDirectory: "public/s2ap",
  publicPath: "/s2ap/",
  serverBuildDirectory: "api/_build",
};
