"use strict";

import React, {Component} from "react";

import MileStoneAction from "../actions/milestone-action";
import IssueAction from "../actions/issue-action";

import Issue from "./issue";

export default class Gantt extends Component {
  componentWillMount(){
    MileStoneAction.fetchAll(this.props.params.projectId);
    IssueAction.fetchAll(this.props.params.projectId);
  }
  render(){
    const {milestones, issues} = this.props.data;

    return <div className="container">
      <table className="table">
      <thead><tr><th /></tr></thead>
      <tbody>
      {issues.map((issue, id)=> <Issue key={id} issue={issue} />)}
      </tbody>
      </table>
      </div>;
  }
}
