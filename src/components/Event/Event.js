import React, { Component } from "react";
import { Media } from "reactstrap";
import "./Event.scss";

export default class Event extends Component {
  convertDate(date) {
    let startdate = new Date(date);

    function weekDay(dayNumber) {
      let week = [
        "Sunday",
        "Monday",
        "Thuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      return week[dayNumber];
    }

    return `
    ${weekDay(startdate.getDay())} 
    ${startdate.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    })} | 
    ${("0" + (startdate.getDay() + 1)).slice(-2)} 
    ${startdate.toLocaleString("en-us", { month: "long" }).substr(0, 3)}`;
  }

  render() {
    return (
      <div className="col-md-4 event-element">
        <div className="event-title">
          {this.convertDate(this.props.startdate)}
        </div>
        <Media left>
          <Media object src={this.props.image} alt="img" />
          <div className="event-name">{this.props.name}</div>
        </Media>
      </div>
    );
  }
}
