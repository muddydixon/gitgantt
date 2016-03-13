"use strict";

import React, {Component} from "react";
import moment from "moment";
import {Modal} from "react-bootstrap";

import IssueAction from "../actions/issue-action";

export default class ModifyIssueForm extends Component {
  render(){
    const {issue, project, milestones} = this.props;
    if(!issue) return null;
    return <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>{issue.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-horizontal" style={styles.form}>
            <div className="form-group row">
              <label className="control-label col-xs-2">Begin</label>
              <div className="col-xs-10">
                <input ref="begin" type="date" className="form-control" defaultValue={moment(issue.begin).format("YYYY-MM-DD")} />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-xs-2">End</label>
              <div className="col-xs-10">
                <input ref="end" type="date" className="form-control" defaultValue={moment(issue.end).format("YYYY-MM-DD")} />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-xs-2">Milestone</label>
              <div className="col-xs-10">
                <select ref="milestone" className="form-control" defaultValue={(issue.milestone && issue.milestone.title) || "unscheduled"} >
                  <option>unscheduled</option>
                  {milestones.map((m, id)=> <option key={id} value={m.title}>{m.title}</option>)}
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={(e)=>this.props.onUpdate(issue, this.refs)}>Update</button>
          <button className="btn btn-danger" onClick={this.props.onCloseModifyIssue}>Cancel</button>
        </Modal.Footer>
      </Modal.Dialog>
      </div>;
  }
};


const styles = {
  form: {
    zIndex: 10
  }
};
