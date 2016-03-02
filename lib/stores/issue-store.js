"use strict";

import {ReduceStore} from "flux/utils";
import dispatcher from "../dispatcher";
import Const from "../constants";

class IssueStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.FETCH_ISSUES:
      return action.issues;
    default:
      return state;
    }
  }
}

export default new IssueStore(dispatcher);
