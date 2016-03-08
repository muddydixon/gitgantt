"use strict";

import React, {Component} from "react";
import {Link} from "react-router";

export default class Group extends Component {
  render(){
    const {group} = this.props;
    return <tr>
      <td><Link to={`/group/${group.id}/`}>{group.login || group.name}</Link></td>
      </tr>;
  }
}
