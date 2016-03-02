"use strict";

import request from "superagent";

import Const from "../constants";
import {dispatch} from "../dispatcher";

class ProjectAction {
  fetchAll(){
    return new Promise((resolve, reject)=>{
      request.get(`/api/project`).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_PROJECTS, projects: res.body});
        return resolve();
      });
    });
  }
}

export default new ProjectAction();
