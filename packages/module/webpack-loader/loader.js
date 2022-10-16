module.exports = function (content) {
  if (this.cacheable) {
    this.cacheable();
  }
  const { include } = this.getOptions() || {};
  if (
    include.some((dir) => !!this.resourcePath.indexOf(dir)) ||
    !/class\s+\w+\s+extends\s+ModuleRoot/.test(content)
  ) {
    return content;
  }
  const imports = [],
    requires = [];
  content.replace(/this\.create(Action|Event)\((.+?)\)/g, (m, p1, p2) => {
    imports.push(...p2.replace(/[\s\[\]]/g, "").split(","));
  });
  if (imports.length) {
    imports.forEach((name) => {
      content = content.replace(
        /import (.+) from (['"]\.\/.+['"]);?/g,
        function (m, p1, p2) {
          const keys = p1.replace(/[\s\{\}]/g, "").split(",");
          if (keys.includes(name)) {
            requires.push(
              `const ${p1} = require(${p2})` +
                (p1[0] === "{" ? ";" : ".default;")
            );
            return "";
          } else {
            return m;
          }
        }
      );
    });
  }
  if (requires.length) {
    content += "\n" + requires.join("\n");
  }
  return content;
};
