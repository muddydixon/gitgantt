"use strict";

const request = require("superagent");
const qs = require("querystring");
const debug = require("debug")("gitgantt:git");
if(process.env.http_proxy){
  require("superagent-proxy")(request);
}

class Git {
  static getClient(url, token){
    if(url.indexOf("github") > -1){
      return new Github(url, token);
    }else if(url.indexOf("bitbucket") > -1){
      return new Bitbucket(url, token);
    }else{
      return new Gitlab(url, token);
    }
  }
  constructor(url, token){
    this.url = url;
    this.token = token;
  }
  createRequest(){
  }
  getGroups(){
    throw new Error(`group unimplemented`);
  }
  getProjects(){
    throw new Error(`project unimplemented`);
  }
  getMilestones(){
    throw new Error(`milestone unimplemented`);
  }
  getIssues(){
    throw new Error(`issue unimplemented`);
  }
  modifyIssue(){
    throw new Error(`issue unimplemented`);
  }
};

class Gitlab extends Git {
  constructor(url, token){
    super(url, token);
    this.headers = {
      "PRIVATE-TOKEN": this.token
    };
  }
  createRequest(method, url, data){
    debug(`url = ${url}`);
    return new Promise((resolve, reject)=>{
      const r = request[method](url);
      if(process.env.http_proxy) r.proxy(process.env.http_proxy);
      r.set(this.headers).end((err, res)=>{
        debug(err);
        if(err) return reject({err: err.message, message: res.body});
        return resolve(res.body);
      });
    });
  }
  getGroups(query){
    return this.createRequest("get", `${this.url}/groups?${qs.stringify(query)}`);
  }
  getProjects(query){
    return this.createRequest("get", `${this.url}/projects?${qs.stringify(query)}`);
  }
  getMilestones(projectId, query){
    return this.createRequest("get", `${this.url}/projects/${projectId}/milestones?${qs.stringify(query)}`);
  }
  getIssues(projectId, query){
    return this.createRequest("get", `${this.url}/projects/${projectId}/issues?${qs.stringify(query)}`);
  }
  modifyIssue(projectId, issueId, data){
    const attrs = {
      description: "",
      milestone_id: data.milestoneId
    };
    return this.createRequest("put", `${this.url}/projects/${projectId}/issues/${issueId}`, data);
  }
}

class Github extends Git {
  constructor(url, token){
    super(url, token);
    this.baseQuery = {
      "access_token": this.token
    };
  }
  createRequest(method, url){
    debug(url);
    return new Promise((resolve, reject)=>{
      const r = request[method](url);
      if(process.env.http_proxy) r.proxy(process.env.http_proxy);
      r.end((err, res)=>{
        if(err) return reject({err: err.message, message: res.body});
        return resolve(res.body);
      });
    });
  }
  getGroups(query){
    return this.createRequest("get", `${this.url}/user/orgs?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getProjects(query){
    return this.createRequest("get", `${this.url}/user/repos?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getMilestones(projectId, query){
    return this.createRequest("get", `${this.url}/repos/${projectId}/milestones?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getIssues(projectId, query){
    return this.createRequest("get", `${this.url}/repos/${projectId}/issues?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  modifyIssue(projectId, issueId, data){
    throw new Error(`issue unimplemented`);
  }
}

class Bitbucket extends Git {
}

class Gitbucket extends Git {
}

module.exports = Git;
