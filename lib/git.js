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
};

class Gitlab extends Git {
  constructor(url, token){
    super(url, token);
    this.headers = {
      "PRIVATE-TOKEN": this.token
    };
  }
  createRequest(url){
    debug(`url = ${url}`);
    return new Promise((resolve, reject)=>{
      const r = request.get(url);
      if(process.env.http_proxy) r.proxy(process.env.http_proxy);
      r.set(this.headers).end((err, res)=>{
        debug(err);
        if(err) return reject({err: err.message, message: res.body});
        return resolve(res.body);
      });
    });
  }
  getGroups(query){
    return this.createRequest(`${this.url}/groups?${qs.stringify(query)}`);
  }
  getProjects(query){
    return this.createRequest(`${this.url}/projects?${qs.stringify(query)}`);
  }
  getMilestones(id, query){
    return this.createRequest(`${this.url}/projects/${id}/milestones?${qs.stringify(query)}`);
  }
  getIssues(id,query){
    return this.createRequest(`${this.url}/projects/${id}/issues?${qs.stringify(query)}`);
  }
}

class Github extends Git {
  constructor(url, token){
    super(url, token);
    this.baseQuery = {
      "access_token": this.token
    };
  }
  createRequest(url){
    debug(url);
    return new Promise((resolve, reject)=>{
      const r = request.get(url);
      if(process.env.http_proxy) r.proxy(process.env.http_proxy);
      r.end((err, res)=>{
        if(err) return reject({err: err.message, message: res.body});
        return resolve(res.body);
      });
    });
  }
  getGroups(query){
    return this.createRequest(`${this.url}/user/orgs?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getProjects(query){
    return this.createRequest(`${this.url}/user/repos?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getMilestones(id, query){
    return this.createRequest(`${this.url}/repos/${id}/milestones?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
  getIssues(id,query){
    return this.createRequest(`${this.url}/repos/${id}/issues?${qs.stringify(Object.assign({}, query, this.baseQuery))}`);
  }
}

class Bitbucket extends Git {
}

class Gitbucket extends Git {
}

module.exports = Git;
