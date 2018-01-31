function floor(value: number, interval: number): number {
  const excess = value % interval;
  return value - excess;
}

function clamp(value: number, {min, max}: {min: number, max: number}): number {
  return Math.max(Math.min(value, max), min);
}

// relativeValue is expected to be converted to the plot's coordinate system, relative to its origin
// (which may not necessarily be <0, 0>).
export function convertCoordinate(relativeValue: number, opts: {min: number, max: number, interval: number}): number {
  return Math.round(
    clamp(
      floor(relativeValue + opts.min, opts.interval),
      {min: opts.min, max: opts.max}
    )
  );
}
