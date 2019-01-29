import React, { Component } from "react";
import LakersEvents from "../LakersEvents/LakersEvents";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card } from "reactstrap";
import "./App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faKey, faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faEnvelope, faKey, faSearch);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Code Test Stanza</p>
        </header>
        <div className="container">
          <div className="row">
            <Card>
              <LakersEvents />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
