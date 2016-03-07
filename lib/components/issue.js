"use strict";

import React, {Component} from "react";
import moment from "moment";
import d3 from "d3";

const toYMD = (d)=> moment(d).format("YYYY/MM/DD");

export default class Issue extends Component {
  render(){
    const {issue, assignee, days, range, project} = this.props;

    const cellStartAt = 0|(issue.begin - range[0]) / 86400000;
    const cellEndAt = 0|(issue.end - range[0]) / 86400000;
    const isDead = issue.state !== "closed" && issue.end < moment() ? "dead" : null;
    const width = 100 / days;
    const cellStyle = {
      borderLeft: "1px dotted #AAA",
      display: "inline-block",
      width: `${width}%`,
      height: "100%"
    };
    const lastCellStyle = Object.assign({}, cellStyle, {borderRight: "1px dotted #AAA"});
    const workStyle = Object.assign({}, styles.work.base, styles.work[isDead || issue.state]);
    console.log(isDead || issue.state, styles.work[isDead || issue.state]);
    const titleStyle = {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    };
    return <div className="row" style={styles.issue[isDead || issue.state]}>
      <div className="col-md-3" style={titleStyle}>
      <a target="_blank" href={`${project && project.web_url}/issues/${issue.iid}`}>{
        `[${issue.duration}] ${issue.title}`
      }</a></div>
      <div className="col-md-1">{assignee}</div>
      <div className="col-md-8 calendar">
      <div>
      {d3.range(days).map((d, id)=> <div key={id} style={id === days - 1 ? lastCellStyle :cellStyle}>
                          <div style={cellStartAt <= d && d < cellEndAt ? workStyle : {}}>&nbsp;</div>
                          </div>)}
      </div>
      </div>
      </div>;
  }
};

const styles = {
  issue: {
    opened: {
      borderLeft: "10px solid #d6e9c6",
      marginBottom: 1
    },
    closed: {
      borderLeft: "10px solid #bce8f1",
      marginBottom: 1
    },
    dead: {
      borderLeft: "10px solid #ebccd1",
      marginBottom: 1
    }
  },
  work: {
    base: {
      display: "inline-block",
      width: "100%",
      fontSize: "1pt",
      height: 5
    },
    opened: { background: "#3c763d" },
    closed: { background: "#31708f" },
    dead: { background: "#a94442" }
  }
};
