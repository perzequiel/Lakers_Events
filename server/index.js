const request = require("request");
const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

const API_URL = "https://s3.amazonaws.com/spotonit/lakers-events.json";

app.use(function(req, res, next) {
  express.static("dist");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/getAll", (req, res) => {
  request.get(API_URL, (error, resp, body) => {
    if (error) {
      return console.dir(error);
    }

    let jsonLakers = "";
    const lines = body.split("\n");

    lines.forEach(line => {
      // Remove no JSON Functions
      switch (true) {
        // ObjectID
        case line.includes("ObjectId"):
          const oid_line = line.split("ObjectId(")[1].split(")")[0];
          line = line.split('ObjectId("')[0] + oid_line + line.split(")")[1];
          break;
        // NumberInt
        case line.includes("NumberInt"):
          const nint_line = line.split("NumberInt(")[1].split(")")[0];
          line = line.split("NumberInt(")[0] + nint_line + line.split(")")[1];
          break;
        // ISODate
        case line.includes("ISODate"):
          const date_line = line.split("ISODate(")[1].split(")")[0];
          line = line.split("ISODate(")[0] + date_line + line.split(")")[1];
          break;

        default:
          break;
      }

      jsonLakers += `\n${line}`;
    });

    let jsonLakersResponse = JSON.parse(jsonLakers);

    jsonLakersResponse.forEach(el => {
      let d = new Date(el.dates.start);
      let month = d.toLocaleString("en-us", { month: "long" });
      let label = `${month} ${d.getFullYear()}`;
      let dateKey = `${("0" + (d.getMonth() + 1)).slice(-2)}${d.getFullYear()}`;

      el.date_key = dateKey;
      el.date_label = label;
    });

    jsonLakersResponse.sort((obj1, obj2) => {
      return obj1.date_key - obj2.date_key;
    });

    res.send(jsonLakersResponse);
  });
});

app.get("/api/getAllByDate", (req, res) => {
  request.get(`http://localhost:${port}/api/getAll`, (error, resp, body) => {
    if (error) {
      return console.dir(error);
    }

    let events = {};

    JSON.parse(body).forEach(el => {
      let d = new Date(el.dates.start);
      let month = d.toLocaleString("en-us", { month: "long" });
      let label = `${month} ${d.getFullYear()}`;
      let dateKey = `D${("0" + (d.getMonth() + 1)).slice(
        -2
      )}${d.getFullYear()}`;

      if (dateKey in events) {
        events[dateKey].data.push(el);
      } else {
        events[dateKey] = { label: label };
        events[dateKey]["data"] = [el];
      }
    });

    res.send(events);
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
