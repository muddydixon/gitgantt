"use strict";

import React, {Component} from "react";

import GroupAction from "../actions/group-action";
import Group from "./group";

export default class Groups extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1
    };
  }
  render(){
    const {groups} = this.props.data;

    return <div className="container">
      <table className="table">
      <thead><tr><th>hoge</th></tr></thead>
      <tbody>
      {groups.map((group, id)=> <Group key={id} group={group} />)}
      </tbody>
      </table>
      </div>;
  }
};
