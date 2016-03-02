"use strict";

import React, {Component} from "react";
import {Link} from "react-router";

export default class Project extends Component {
  render(){
    const {project} = this.props;
    return <tr>
      <td><Link to={`/project/${project.id}/gantt`}>{project.path_with_namespace}</Link></td>
      </tr>;
  }
}
