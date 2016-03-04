"use strict";

const http = require("http");
const config = require("config");
const express = require("express");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const ServeStatic = require("serve-static");
const commander = require("commander");
const log4js = require("log4js");
log4js.configure(config.log.configure);
const logger = log4js.getLogger("system");

const program = commander
        .option("-p,--port <PORT>", "PORT", Number, config.port || 6100)
        .parse(process.argv);

const handlers = require("./handlers")(program);

const app = express();

app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());
app.use(CookieParser());
app.use(ServeStatic("public", {"index": ["index.html"]}));
app.use(ServeStatic("node_modules"));

app.route("/api/project")
  .get(handlers.getProjects);

app.route("/api/project/:projectId/milestone")
  .get(handlers.getMilestones);

app.route("/api/project/:projectId/issue")
  .get(handlers.getIssues);

app
  .use(handlers.successHandler)
  .use(handlers.failureHandler)
  .use(handlers.notFoundHandler);

const server = http.createServer(app);
server.listen(program.port);
server.on("listening", ()=>{
  logger.info(`start on ${program.port}`);
});
server.on("error", (err)=>{
  logger.error(`${err.stack}`);
});
