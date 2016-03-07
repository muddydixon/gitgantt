"use strict";

import {ReduceStore} from "flux/utils";
import dispatcher from "../dispatcher";
import Const from "../constants";

class GroupStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.FETCH_GROUPS:
      return action.groups;
    default:
      return state;
    }
  }
}

export default new GroupStore(dispatcher);
