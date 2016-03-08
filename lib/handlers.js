"use strict";

const config = require("config");
const qs = require("querystring");
const co = require("co");
const log4js = require("log4js");
log4js.configure(config.log.configure);
const logger = log4js.getLogger("system");
const Git = require("./git");

module.exports = (program)=>{
  const gitUrl = config.git.url;
  const baseUrl = `${gitUrl}`;
  const token = config.git.token;
  const git = Git.getClient(gitUrl, token);

  const getGroups = (req, res, next)=>{
    git.getGroups(req.query).then((groups)=>{
      res.locals.result = groups;
      return next();
    }).catch(next);
  };

  const getProjects = (req, res, next)=>{
    git.getProjects(req.query).then((projects)=>{
      res.locals.result = projects;
      return next();
    }).catch(next);
  };

  const getMilestones = (req, res, next)=>{
    const projectId = req.params.user ? `${req.params.user}/${req.params.repo}` : req.params.projectId;
    git.getMilestones(projectId, req.query).then((milestones)=>{
      res.locals.result = milestones;
      return next();
    }).catch(next);
  };

  const getIssues = (req, res, next)=>{
    const projectId = req.params.user ? `${req.params.user}/${req.params.repo}` : req.params.projectId;
    git.getIssues(projectId, req.query).then((issues)=>{
      res.locals.result = issues;
      return next();
    }).catch(next);
  };

  const successHandler = (req, res, next)=>{
    if(!res.locals.result) return next(new Error("result not found"));
    return res.json(res.locals.result);
  };

  const failureHandler = (err, req, res, next)=>{
    if(err.message.indexOf("getaddrinfo ENOTFOUND") > -1){
      err = new Error(`gitlab resolve address failure: ${req.url}`);
    }else if(err.message.indexOf("read ECONNRESET") > -1){
      err = new Error(`gitlab connect fail: ${req.url}`);
    }
    return res.status(500).json({error: err.message});
  };

  const notFoundHandler = (req, res, next)=>{
    res.status(404).json({error: "404 not found"});
  };

  return {
    getGroups,
    getProjects,
    getMilestones,
    getIssues,

    successHandler,
    failureHandler,
    notFoundHandler
  };
};
