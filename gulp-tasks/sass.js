const { dest, src } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sassProcessor = require("gulp-sass");

sassProcessor.compiler = require("sass");

const isProduction = process.env.NODE_ENV === "production";

const criticalStyles = [
  "critical.scss",
  "home.scss",
  "page.scss",
  "work-item.scss",
];

// Take the arguments by `dest` and look where to put it
const calculateOutput = ({ history }) => {
  let response = "./dist/css";

  // Get everything after the last slash
  const sourceFileName = /[^/]*$/.exec(history[0])[0];

  if (criticalStyles.includes(sourceFileName)) {
    response = "./src/_includes/css";
  }

  return response;
};

// The main Sass method grabs all root Sass files,
// processes them, then sends them to the output calculator
const sass = () => {
  return src("./src/scss/*.scss")
    .pipe(sassProcessor().on("error", sassProcessor.logError))
    .pipe(
      cleanCSS(
        isProduction
          ? {
              level: 2,
            }
          : {}
      )
    )
    .pipe(dest(calculateOutput, { sourceMaps: !isProduction }));
};

module.exports = sass;
