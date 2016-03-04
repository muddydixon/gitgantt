"use strict";

import React, {Component} from "react";
import moment from "moment";
import d3 from "d3";

import Issue from "./issue";

export default class MileStone extends Component {
  render(){
    const {milestone, assignedIssues, project, days, range} = this.props;
    if(!assignedIssues) return <div />;

    const issues = assignedIssues.map((assignedIssue)=>{
      return <div key={assignedIssue.key}>
        {assignedIssue.values.map((issue)=> <Issue
                                  key={issue.iid}
                                  project={project}
                                  days={days}
                                  range={range}
                                  issue={issue}
                                  assignee={assignedIssue.key}/>)}
      </div>
    });
    return <div className="row">
      <h3>{milestone.title}</h3>
      {issues}
      </div>;
  }
};

MileStone.unscheduled = {
  due: moment(),
  title: "unscheduled"
};
