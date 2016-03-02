"use strict";

import {ReduceStore} from "flux/utils";
import dispatcher from "../dispatcher";
import Const from "../constants";

class MileStoneStore extends ReduceStore {
  getInitialState(){
    return [];
  }
  reduce(state, action){
    switch(action.type){
    case Const.FETCH_MILESTONES:
      return action.milestones;
    default:
      return state;
    }
  }
}

export default new MileStoneStore(dispatcher);
