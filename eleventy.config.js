module.exports = function (eleventyConfig) {
  // Copy assets
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("app");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("pdf");

  // Set template formats
  eleventyConfig.setTemplateFormats(["njk", "html"]); // Include njk for Nunjucks

  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob("src/projects/*.njk").sort((a, b) => {
      // Sort by 'order' first (lower numbers come first)
      const aOrder = a.data.order !== undefined ? a.data.order : Infinity;
      const bOrder = b.data.order !== undefined ? b.data.order : Infinity;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      // Then, sort by 'year' (newer years come first)
      const aYear = a.data.year !== undefined ? a.data.year : -Infinity;
      const bYear = b.data.year !== undefined ? b.data.year : -Infinity;

      return bYear - aYear; // newer years first
    });
  });

  // Add index filter
  eleventyConfig.addFilter("index", function (array, value) {
    return array.indexOf(value);
  });

  // Add filter for adjacent projects
  eleventyConfig.addFilter(
    "getAdjacentProjects",
    (projects, currentProject) => {
      const currentIndex = projects.findIndex(
        (project) => project.fileSlug === currentProject.fileSlug
      );
      const previous = projects[currentIndex - 1] || null;
      const next = projects[currentIndex + 1] || null;
      return { previous, next };
    }
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_templates",
    },
    templateFormats: ["njk", "html"],
    data: {
      siteUrl: "https://zamortega.com",
    },
  };
};
