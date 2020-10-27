export default class NumberUtils {
  static randomizer(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
