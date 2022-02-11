# Modulify demo project
Project consists of 2 services: rest and grpc.

These projects has common files such as proto files or TS types.

We will setup modulify scripts and docker-compose to up and run all services in local environment.

1. Clone the project `git clone https://github.com/Linbop/modulify-example.git`

2. Run `yarn install` command for the root and repo projects.

```bash
yarn
```

```bash
cd repositories/project-rest && yarn
```

```bash
cd repositories/project-grpc && yarn
```

3. Run docker compose command


```bash
docker-compose -f ./deploy/configs/docker-compose.yml up --build
```

4. After the gRPC service has started, open `http://localhost:3001` on browser.

5. You should see the following response

```javascript
{
  "title": "Message",
  "content": "Lorem ipsum dolor sit amet"
}
```

6. Now you can change ENV=LOCAL variable in docker-compose file, and up again. You will see that, services will be started without nodemon and --watch option.

The example of the start function:

```javascript
module.exports = {
  ...
  functions: {
    start: ({ shell, repoPath }) => {
      if (process.env.ENV === "LOCAL")
        shell.exec("yarn run watch:start:project-grpc");
      else shell.exec(`modulify build repositories/project-grpc && node ${repoPath}/build/server.js`);
    },
  },
};
```

There is a check for the ENV variable and depending on the value, we run watch or start command. 

`watch:start:project-grpc` and `watch:start:project-rest` scripts are defined in the root configuration.

```javascript
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

```

You can also up docker compose by the `modulify call up:local` command.


