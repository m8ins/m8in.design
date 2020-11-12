const sortByDisplayOrder = require("./src/utils/sort-by-display-order");
const rssPlugin = require("@11ty/eleventy-plugin-rss");

// Filters
const dateFilter = require("./src/filters/date-filter");
const w3DateFilter = require("./src/filters/w3-date-filter");

//Transforms
const htmlMinTransform = require("./src/transforms/html-min-transform");

const isProduction = process.env.NODE_ENV === "production";

module.exports = (config) => {
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Returns work items, sorted by display order
  config.addCollection("work", (collection) => {
    return sortByDisplayOrder(collection.getFilteredByGlob("./src/work/*.md"));
  });

  // Plugins
  config.addPlugin(rssPlugin);

  // Returns featured work items, sorted by display order
  config.addCollection("featuredWork", (collection) => {
    return sortByDisplayOrder(
      collection.getFilteredByGlob("./src/work/*.md")
    ).filter((x) => x.data.featured);
  });

  // Returns a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Returns a list of people ordered by filename
  config.addCollection("people", (collection) => {
    return collection.getFilteredByGlob("./src/people/*.md").sort((a, b) => {
      return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
    });
  });

  config.setUseGitIgnore(false);

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
