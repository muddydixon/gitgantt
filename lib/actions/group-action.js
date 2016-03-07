"use strict";

import request from "superagent";

import Const from "../constants";
import {dispatch} from "../dispatcher";

class GroupAction {
  fetchAll(page = 1){
    return new Promise((resolve, reject)=>{
      request.get(`/api/group?page=${page}`).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_GROUPS, groups: res.body});
        return resolve();
      });
    });
  }
}

export default new GroupAction();
