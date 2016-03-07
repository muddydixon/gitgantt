"use strict";

import React, {Component} from "react";
import moment from "moment";
import d3 from "d3";
import Url from "url";

import MileStoneAction from "../actions/milestone-action";
import IssueAction from "../actions/issue-action";

import MileStone from "./milestone";
import Issue from "./issue";

const getDurationFromLabel = (issue)=>{
  const d = d3.max(issue.labels, (label)=>{
    const m = label.match(/^(\d)d/i);
    if(!m) return 1;
    return +m[1];
  });
  return d || 1;
};
const setDates = (issue)=>{
  const head = issue.description.split(/\n/).slice(0,3).join("\n");

  const b = head.match(/^\*\sbegin:\s*(.+)/m);
  const e = head.match(/^\*\send:\s*(.+)/m);
  const duration = getDurationFromLabel(issue);
  issue.begin = b ? moment(b[1].replace(/\//g, "-")) : moment(issue.created_at);
  issue.end   = e ? moment(e[1].replace(/\//g, "-")) : duration ? issue.begin.clone().add(duration, "day") : null;
  issue.duration = (0|(issue.end - issue.begin) / 86400000) || duration || 1;
  issue.begin.startOf("day");
  if(issue.end) issue.end.startOf("day");
};

export default class Gantt extends Component {
  getMilestone(milestones, title){
    const ms = milestones.filter((milestone)=> milestone.title === title);
    if(ms.length === 0) return "unscheduled";
    return ms[0];
  }
  componentWillMount(){
    MileStoneAction.fetchAll(this.props.params.projectId);
    IssueAction.fetchAll(this.props.params.projectId);
  }
  render(){
    const {projects, milestones, issues} = this.props.data;
    if(issues.length === 0) return <div />;
    const project = projects.filter((p)=> p.id === +this.props.params.projectId)[0];
    issues.forEach(setDates);
    const range = [d3.min(issues || [], (d)=> d.begin), d3.max(issues || [], (d)=> d.end)];
    const days = 0|(range[1] - range[0]) / 86400000;

    const organizedMilestone= d3.nest()
            .key((m)=> m.due || `${moment()}` )
            .entries(milestones);

    const organizedIssues = d3.nest()
            .key((i)=> (i.milestone && i.milestone.title) || "unscheduled")
            .sortKeys(d3.ascending)
            .key((i)=> (i.assignee && i.assignee.name) || "unassigned")
            .entries(issues);

    return <div className="container">
      <div className="row">
      <div className="row">
      <div className="col-md-offset-4 col-md-8">
      <span className="pull-left">{range[0].format("YYYY/MM/DD")}</span>
      <span className="pull-right">{range[1].clone().add(-1, "day").format("YYYY/MM/DD")}</span>
    </div>
    </div>
      </div>
      {organizedIssues.map((milestone, id)=> <MileStone
                           key={milestone.key}
                           project={project}
                           days={days}
                           range={range}
                           milestone={this.getMilestone(milestones, milestone.key)}
                           assignedIssues={milestone.values} />)}
      </div>;
  }
}
