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
        {assignedIssue.values.map((issue, id)=> <Issue
                                  key={id}
                                  project={project}
                                  days={days}
                                  range={range}
                                  issue={issue}
                                  onModifyIssue={this.props.onModifyIssue}
                                  assignee={assignedIssue.key}/>)}
      </div>
    });
    return <div className="">
      <h3 className="row" style={styles[milestone.state || "active"]}>{milestone.title || "unscheduled"}</h3>
      {issues}
      </div>;
  }
};

MileStone.unscheduled = {
  due: moment(),
  title: "unscheduled"
};

const styles = {
  active: {
    borderLeft: "20px solid #3c763d",
    marginBottom: 1
  },
  closed: {
    borderLeft: "20px solid #31708f",
    marginBottom: 1
  },
  dead: {
    borderLeft: "20px solid #a94442",
    marginBottom: 1
  }
};

styles.open = styles.active;
