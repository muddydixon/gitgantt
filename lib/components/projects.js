"use strict";

import React, {Component} from "react";

import ProjectAction from "../actions/project-action";
import Project from "./project";

export default class Projects extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1
    };
  }
  onNext(){
    ProjectAction.fetchAll(this.state.page + 1);
    this.setState({ page: this.state.page + 1});
  }
  onPrev(){
    ProjectAction.fetchAll(this.state.page - 1);
    this.setState({ page: this.state.page - 1});
  }
  render(){
    const {projects} = this.props.data;

    return <div className="container">
      <table className="table">
      <thead><tr><th>hoge</th></tr></thead>
      <tbody>
      {projects.map((project, id)=> <Project key={id} project={project} />)}
      </tbody>
      </table>
      <button className="btn btn-info" onClick={this.onNext.bind(this)}>Next</button>&nbsp;
      <button className={`btn btn-info ${this.state.page > 1 ? "" : "hidden"}`} onClick={this.onPrev.bind(this)}>Prev</button>
      </div>;
  }
};
