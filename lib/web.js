"use strict";

import React, {Component} from "react";
import {render} from "react-dom";
import {Router, Route, IndexRoute, hashHistory, PropTypes} from "react-router";
import {Container} from "flux/utils";

import ProjectStore from "./stores/project-store";
import IssueStore from "./stores/issue-store";
import MileStoneStore from "./stores/milestone-store";

import ProjectAction from "./actions/project-action";

import Header from "./components/header";
import Projects from "./components/projects";
import Gantt from "./components/gantt";

class App extends Component {
  static getStores(){
    return [
      ProjectStore,
      IssueStore,
      MileStoneStore
    ];
  }
  static calculateState(state){
    return {
      projects:   ProjectStore.getState(),
      issues:     IssueStore.getState(),
      milestones: MileStoneStore.getState()
    };
  }
  componentWillMount(){
    ProjectAction.fetchAll();
  }
  render(){
    console.log("app", this.state);
    return <div>
      <Header />
      {React.cloneElement(this.props.children, {data: this.state})}
      </div>;
  }
};

render(<Router history={hashHistory}>
       <Route path="/" component={Container.create(App)}>
       <IndexRoute component={Projects} />
       <Route path="/project/:projectId/gantt" component={Gantt} />
       </Route>
       </Router>,
       document.getElementById("app"));
