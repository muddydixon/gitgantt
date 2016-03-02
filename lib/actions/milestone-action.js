"use strict";

import request from "superagent";

import Const from "../constants";
import {dispatch} from "../dispatcher";

class MileStoneAction {
  fetchAll(id, opts = {}){
    return new Promise((resolve, reject)=>{
      request.get(`/api/project/${id}/milestone`).end((err, res)=>{
        if(err) return reject(err);
        dispatch({type: Const.FETCH_MILESTONES, milestones: res.body});
        return resolve();
      });
    });
  }
}

export default new MileStoneAction();
