"use strict";

import React, {Component} from "react";

export default class Issue extends Component {
  render(){
    const {issue} = this.props;

    return <tr><td>{issue.title}</td></tr>;
  }
}
