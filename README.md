# cell-plot

React components for a plottable coordinate plane built with responsive Flexbox cells.

# Getting Started

```javascript
import React from 'react';
import CellPlot, {Positioned} from 'cell-plot';

const MyComponent = ({things}) => (
  <div style={{width: 300, height: 300, display: 'flex', margin: 10}}>
    <CellPlot
      xLabels={[<label>left</label>, <label>center</label>, <label>right</label>]}
      yLabels={[<label>top</label>, <label>center</label>, <label>bottom</label>]}
      xs={[-1, 0, 1]}
      ys={[-1, 0, 1]}
      xBorders={['1px solid grey']}
      yBorders={['1px solid grey']}
      onClick={(x, y) => window.alert(`<${x}, ${y}>`)}>

      <Positioned x={1}  y={0}  width={1} height={1}>East</Positioned>
      <Positioned x={0}  y={1}  width={1} height={1}>North</Positioned>
      <Positioned x={-1} y={0}  width={1} height={1}>West</Positioned>
      <Positioned x={0}  y={-1} width={1} height={1}>South</Positioned>
    </CellPlot>
  </div>
)
```

![Example](https://user-images.githubusercontent.com/4449/30895902-1ac31114-a302-11e7-8925-6bb1867f9cab.png)

# Details

* `CellPlot`: The main (default) export is a block-level component that acts like a hybrid between a table and a graph. It uses Flexbox to create a resilient frame around a collection of cells. The X and Y axes may be labeled arbitrarily, and border patterns may be specified to mark the plotting area.
* `Positioned`: Must be rendered as a descendant of `CellPlot`. Wrap this around your custom plottable components to place them within the Frame using responsive, percent-based positioning and dimensions.
* `PlotConsumerProps`: CellPlot uses React [Context](https://facebook.github.io/react/docs/context.html) to provide `yAt` and `xAt` utility functions for mapping from viewport coordinates into the coordinates of your plot. These are useful for handling DOM events like mouse movements.

# Assumptions

1. The x and y values proceed in regular increments.
2. The x and y axes are numeric, but not continuous. They proceed in finite steps with no intermediate values.
3. Not every x and y value is labeled, but the quantity of x and y values are some multiple of the quantity of x and y labels.
4. The lowest x and y values are in the top left corner.

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.
