const path = require('path');

module.exports = {
  build: ({ repoPath }) => ({
    entryPoints: [`${repoPath}/src/index.ts`],
    outfile: `${repoPath}/build/server.js`,
    bundle: true,
    platform: "node",
    target: "node16",
  }),
  functions: {
    start: ({ shell, repoPath }) => {
      if (process.env.ENV === "LOCAL")
        shell.exec("yarn run watch:start:project-grpc");
      else shell.exec(`modulify build repositories/project-grpc && node ${repoPath}/build/server.js`);
    },
  },
};