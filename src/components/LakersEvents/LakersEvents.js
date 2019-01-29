import React, { Component } from "react";
import Event from "../Event/Event";
import Spinner from "../../spinner.gif";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
  CardBody,
  CardHeader,
  Input,
  InputGroupAddon,
  InputGroup
} from "reactstrap";
import "./LakersEvents.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class LakersEvents extends Component {
  constructor(props) {
    super(props);

    this.state = { displayedEvents: [] };

    this.searchHandler = this.searchHandler.bind(this);
    this.getAllEvents = this.getAllEvents.bind(this);

    this.getAllEvents();
  }
  getInitialState() {
    this.getAllEvents();
  }

  getAllEvents() {
    axios
      .get("http://localhost:8080/api/getAll")
      .then(response => {
        console.log(response.data);
        this.setState({
          displayedEvents: response.data,
          AllEvents: response.data
        });
      })
      .catch(error => this.setState({ error }));
  }

  searchHandler(event) {
    let searcjQery = event.target.value.toLowerCase();
    let displayedEvents = this.state.AllEvents.filter(el => {
      let searchValue = el.name.toLowerCase();
      return searchValue.indexOf(searcjQery) !== -1;
    });
    console.log(displayedEvents);
    this.setState({
      displayedEvents: displayedEvents
    });
  }
  render() {
    let events = this.state.displayedEvents,
      first = "",
      current_date = "",
      new_month = false,
      show = (
        <div className="spinner">
          <img src={Spinner} alt="loading" />
        </div>
      );

    if (Object.keys(events).length > 0) {
      show = (
        <div className="holder">
          <CardHeader>
            <InputGroup>
              <InputGroupAddon addonType="append">
                <FontAwesomeIcon icon="search" />
              </InputGroupAddon>
              <Input
                placeholder="Search Events"
                className="search"
                onChange={this.searchHandler}
              />
            </InputGroup>
          </CardHeader>

          <CardBody className="row">
            {events.map((el, i) => {
              new_month = false;
              if (
                first === "" ||
                (first !== "" && current_date !== el.date_label)
              ) {
                current_date = el.date_label;
                new_month = true;
                first = false;
              }
              if (new_month) {
                return (
                  <div className="date-title col-sm-12" key={"d" + i}>
                    {current_date}
                  </div>
                );
              }
              return (
                <Event
                  key={i}
                  name={el.name}
                  image={el.background}
                  phone={el.description}
                  startdate={el.dates.start}
                />
              );
            })}
          </CardBody>
        </div>
      );
    } else {
      show = (
        <div className="holder spinner">
          <img src={Spinner} alt="loading" />
        </div>
      );
    }

    return show;
  }
}
