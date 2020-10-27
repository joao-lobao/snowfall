import React from "react";
import { NUM_SNOWFLAKES } from "../Constants";
import { Snowflake } from "./Snowflake";

export default class Snowfall extends React.Component {
  render() {
    const snowflakes = Array.from(Array(NUM_SNOWFLAKES).keys());
    return snowflakes.map((_item, i) => {
      return <Snowflake key={i}></Snowflake>;
    });
  }
}
