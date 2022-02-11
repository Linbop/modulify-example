const { commandBuilder: cb } = require('@linbop/modulify');

module.exports = {
  functions: {
    "up:local": async ({ shell }) => {
      await shell.exec(
        "docker-compose -f ./deploy/configs/docker-compose.yml up --build"
      );
    }
  }, 
  scripts: {
    "watch:start:bff": cb().add([
      "modulify build repositories/project-rest --watch",
      cb()
        .waitOn("repositories/project-rest/build/server.js ")
        .add("nodemon repositories/project-rest/build/server.js"),
    ]),

    "watch:start:project-grpc": cb().add([
      "modulify build repositories/project-grpc --watch",
      cb()
        .waitOn("repositories/project-grpc/build/server.js ")
        .add("nodemon repositories/project-grpc/build/server.js"),
    ]),
  },
};
