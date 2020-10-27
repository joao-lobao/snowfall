import React from "react";
import { NumberUtils } from "../../Utils";
import {
  MIN_SCREEN_X,
  MAX_SCREEN_X,
  MIN_SCREEN_Y,
  MIN_SNOWFLAKE_SIZE,
  MAX_SNOWFLAKE_SIZE,
  MIN_SIZE_OF_LARGE_SNOWFLAKES,
  MIN_SNOWFLAKE_VER_SPEED,
  MAX_SNOWFLAKE_VER_SPEED,
  MAX_SIZE_OF_SMALL_SNOWFLAKES,
  MIN_SNOWFLAKE_HOR_SPEED,
  MAX_SNOWFLAKE_HOR_SPEED,
  MAX_SCREEN_Y,
} from "../../Constants";
import "./Snowflake.css";

export default class Snowflake extends React.Component<
  {},
  {
    speedV: number;
    speedH: number;
    blur: number;
    size: number;
    direction: number;
    proximity: number;
    position: { x: number; y: number };
  }
> {
  constructor(props: any) {
    super(props);
    const {
      blur,
      proximity,
      speedV,
      size,
    } = this.getPerspectiveParamsBasedOnSize();
    this.state = {
      blur,
      proximity,
      speedV,
      speedH: NumberUtils.randomizer(
        MIN_SNOWFLAKE_HOR_SPEED,
        MAX_SNOWFLAKE_HOR_SPEED
      ),
      size,
      direction: NumberUtils.randomizer(-1, 1),
      position: {
        x: NumberUtils.randomizer(MIN_SCREEN_X, MAX_SCREEN_X),
        y: MIN_SCREEN_Y,
      },
    };
  }

  getSizeBasedOn(randomNumber: number) {
    let size = 0;
    if (
      randomNumber > MAX_SIZE_OF_SMALL_SNOWFLAKES &&
      randomNumber < MIN_SIZE_OF_LARGE_SNOWFLAKES
    ) {
      size = NumberUtils.randomizer(
        MIN_SNOWFLAKE_SIZE,
        MAX_SIZE_OF_SMALL_SNOWFLAKES
      );
    }
    return size || randomNumber;
  }

  getBlurProximityAndSpeedBasedOn(randomNumber: number) {
    let blur = 0;
    let proximity = 0;
    let speedV = 0;
    if (randomNumber > MIN_SIZE_OF_LARGE_SNOWFLAKES) {
      blur = NumberUtils.randomizer(5, 15);
      proximity = 999;
      speedV = NumberUtils.randomizer(
        MIN_SNOWFLAKE_VER_SPEED + 2,
        MAX_SNOWFLAKE_VER_SPEED
      );
    } else {
      blur = NumberUtils.randomizer(0, 3);
      proximity = 1;
      speedV = NumberUtils.randomizer(
        MIN_SNOWFLAKE_VER_SPEED,
        MAX_SNOWFLAKE_VER_SPEED - 2
      );
    }

    return {
      blur,
      proximity,
      speedV,
    };
  }

  getPerspectiveParamsBasedOnSize() {
    let randomNumber = NumberUtils.randomizer(
      MIN_SNOWFLAKE_SIZE,
      MAX_SNOWFLAKE_SIZE
    );

    const { blur, proximity, speedV } = this.getBlurProximityAndSpeedBasedOn(
      randomNumber
    );
    const size = this.getSizeBasedOn(randomNumber);

    return {
      blur,
      proximity,
      speedV,
      size,
    };
  }

  move() {
    let x = this.state.position.x + this.state.speedH * this.state.direction;
    let y = this.state.position.y + this.state.speedV;

    if (this.state.position.x < MIN_SCREEN_Y) {
      x = MAX_SCREEN_X;
    } else if (this.state.position.x > MAX_SCREEN_X) {
      x = MIN_SCREEN_X;
    }

    if (this.state.position.y >= MAX_SCREEN_Y) {
      y = MIN_SCREEN_Y;
    }

    this.setState({
      position: { x, y },
    });
  }

  interval: any = undefined;

  componentDidMount() {
    this.interval = setInterval(() => this.move(), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div
        className="snowflake"
        style={{
          filter: `blur(${this.state.blur}px)`,
          zIndex: this.state.proximity,
          transform: `translate(${this.state.position.x}px, ${this.state.position.y}px)`,
          width: `${this.state.size}px`,
          height: `${this.state.size}px`,
        }}
      ></div>
    );
  }
}
