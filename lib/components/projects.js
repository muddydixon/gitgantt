"use strict";

import React, {Component} from "react";

import Project from "./project";

export default class Projects extends Component {
  render(){
    const {projects} = this.props.data;

    return <div className="container">
      <table className="table">
      <thead><tr><th>hoge</th></tr></thead>
      <tbody>
      {projects.map((project, id)=> <Project key={id} project={project} />)}
      </tbody>
      </table>
      </div>;
  }
};
