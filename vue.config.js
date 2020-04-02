var path = require("path");

var projectName = process.env.PROJECT_NAME;
var projectPath = path.resolve(__dirname, "apps", projectName);

module.exports = {
  configureWebpack: config => {
    config.entry.app = [path.resolve(projectPath, "src/main.js")];
    config.context = __dirname;
    config.resolve.alias["@"] = path.resolve(projectPath, "src");
    config.resolve.extensions.push(".css", ".scss");
  },

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = path.resolve(projectPath, "public/index.html");
      return args;
    });

    config.plugin("copy").tap(() => {
      return [
        [
          {
            from: path.resolve(projectPath, "public"),
            to: path.resolve(projectPath, "dist"),
            toType: "dir",
            ignore: ["index.html", ".DS_Store"]
          }
        ]
      ];
    });
  },

  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/common";`
      }
    }
  },

  outputDir: path.resolve(projectPath, "dist"),

  //publicPath: process.env.NODE_ENV === "production" ? `/${projectName}/` : "/",
  //baseUrl: process.env.NODE_ENV === "production" ? `/${projectName}/` : "/",

  lintOnSave: false
};
