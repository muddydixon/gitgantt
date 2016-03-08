"use strict";

import request from "superagent";

import Const from "../constants";
import {dispatch} from "../dispatcher";

class IssueAction {
  fetchAll(projectId, opts = {}){
    return new Promise((resolve, reject)=>{
      request.get(`/api/project/${projectId}/issue`).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_ISSUES, issues: res.body});
        return resolve();
      });
    });
  }

  update(projectId, issueId, data = {}){
    return new Promise((resolve, reject)=>{
      request.put(`/api/project/${projectId}/issue/${issueId}`).form(data).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_ISSUES, issues: res.body});
        return resolve();
      });
    });
  }
};

export default new IssueAction();
