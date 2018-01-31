import {convertCoordinate} from '../util';

describe('convertCoordinate', () => {
  it('clamps to the boundaries', () => {
    const opts = {
      min: 3,
      max: 5,
      interval: 1
    };

    expect(convertCoordinate(-1, opts)).toBe(3); // out of bounds
    expect(convertCoordinate(0, opts)).toBe(3); // on the edge
    expect(convertCoordinate(1, opts)).toBe(4); // in the middle
    expect(convertCoordinate(2, opts)).toBe(5); // on the edge
    expect(convertCoordinate(3, opts)).toBe(5); // out of bounds
  });

  it('floors to intervals larger than 1', () => {
    const opts = {
      min: 0,
      max: 30,
      interval: 15
    };

    expect(convertCoordinate(0, opts)).toBe(0);
    expect(convertCoordinate(1, opts)).toBe(0);
    // ...
    expect(convertCoordinate(14, opts)).toBe(0);
    expect(convertCoordinate(15, opts)).toBe(15);
    expect(convertCoordinate(16, opts)).toBe(15);
    // ...
    expect(convertCoordinate(29, opts)).toBe(15);
    expect(convertCoordinate(30, opts)).toBe(30);
  });
});
