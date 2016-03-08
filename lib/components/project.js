"use strict";

import React, {Component} from "react";
import {Link} from "react-router";

export default class Project extends Component {
  render(){
    const {project} = this.props;
    return <tr>
      <td><Link to={`/project/${project.full_name || project.id}/gantt`}>{project.full_name || project.path_with_namespace}</Link></td>
      </tr>;
  }
}
