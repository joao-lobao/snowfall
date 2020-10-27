import React from "react";
import { NUM_SNOWFLAKES } from "../Utils/Constants";
import Snowflake from "./Snowflake";

export default class Snowfall extends React.Component {
  render() {
    const snowflakes = Array.from(Array(NUM_SNOWFLAKES).keys());
    return snowflakes.map(() => {
      return <Snowflake></Snowflake>;
    });
  }
}
