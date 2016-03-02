"use strict";

import {ReduceStore} from "flux/utils";
import dispatcher from "../dispatcher";
import Const from "../constants";

class ProjectStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.FETCH_PROJECTS:
      return action.projects;
    default:
      return state;
    }
  }
}

export default new ProjectStore(dispatcher);
