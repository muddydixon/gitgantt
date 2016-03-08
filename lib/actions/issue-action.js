"use strict";

import request from "superagent";

import Const from "../constants";
import {dispatch} from "../dispatcher";

class IssueAction {
  fetchAll(id, opts = {}){
    return new Promise((resolve, reject)=>{
      request.get(`/api/project/${id}/issue`).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_ISSUES, issues: res.body});
        return resolve();
      });
    });
  }
  update(issue, data = {}){
    console.log(issue, data);
  }
}

export default new IssueAction();
