"use strict";

const config = require("config");
const qs = require("querystring");
const request = require("superagent");
require("superagent-proxy")(request);
const log4js = require("log4js");
const debug = require("debug")("handler");
log4js.configure(config.log.configure);
const logger = log4js.getLogger("system");

module.exports = (program)=>{
  const gitUrl = config.git.url;
  const baseUrl = `${gitUrl}`;
  const token = config.git.privateToken;

  const getProjects = (req, res, next)=>{
    const headers = {
      "PRIVATE-TOKEN": token
    };
    const url = `${baseUrl}/projects?${qs.stringify(req.query)}`;
    debug(url);
    request.get(url).proxy(process.env.http_proxy).set(headers).end((err, resp)=>{
      if(err){
        console.log(err);
        return next(err);
      }
      res.locals.result = resp.body;
      return next();
    });
  };

  const getMilestones = (req, res, next)=>{
    const headers = {
      "PRIVATE-TOKEN": token
    };
    const url = `${baseUrl}/projects/${req.params.projectId}/milestones?${qs.stringify(req.query)}`;
    debug(url);
    request.get(url).proxy(process.env.http_proxy).set(headers).end((err, resp)=>{
      if(err){
        console.log(err);
        return next(err);
      }
      res.locals.result = resp.body;
      return next();
    });
  };

  const getIssues = (req, res, next)=>{
    const headers = {
      "PRIVATE-TOKEN": token
    };
    const url = `${baseUrl}/projects/${req.params.projectId}/issues?${qs.stringify(req.query)}`;
    debug(url);
    request.get(url).proxy(process.env.http_proxy).set(headers).end((err, resp)=>{
      if(err){
        console.log(err);
        return next(err);
      }
      res.locals.result = resp.body;
      return next();
    });
  };

  const successHandler = (req, res, next)=>{
    if(!res.locals.result) return next(new Error("result not found"));
    return res.json(res.locals.result);
  };

  const failureHandler = (err, req, res, next)=>{
    if(err.message.indexOf("getaddrinfo ENOTFOUND") > -1){
      err = new Error("gitlab access timeout");
    }else if(err.message.indexOf("read ECONNRESET") > -1){
      err = new Error("gitlab connect fail");
    }
    return res.status(500).json({error: err.message});
  };

  const notFoundHandler = (req, res, next)=>{
    res.status(404).json({error: "404 not found"});
  };

  return {
    getProjects,
    getMilestones,
    getIssues,

    successHandler,
    failureHandler,
    notFoundHandler
  };
};
