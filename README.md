# cell-plot

React components for a plottable coordinate plane built with responsive Flexbox cells.

# Example

```javascript
import React from 'react';
import CellPlot, {Positioned} from 'cell-plot';

const Container = ({children}) => (
  <div style={{width: 300, height: 300, display: 'flex', margin: 10}}>{children}</div>
)

const Box = ({children}) => (
  <div style={{height: '100%', backgroundColor: '#884', color: 'white', opacity: 0.8}}>{children}</div>
);

const MyComponent = ({things}) => (
  <Container>
    <CellPlot
      xLabels={[<label>left</label>, <label>center</label>, <label>right</label>]}
      yLabels={[<label>top</label>, <label>center</label>, <label>bottom</label>]}
      xs={[1, 2, 3, 4, 5, 6]}
      ys={[1, 2, 3, 4, 5, 6]}
      xBorders={['1px solid grey', '1px dotted grey']}
      yBorders={['1px solid grey', '1px dotted grey']}
      onClick={(x, y) => window.alert(`<${x}, ${y}>`)}>

      <Positioned x={5} y={3} width={2} height={2}><Box>East</Box></Positioned>
      <Positioned x={3} y={5} width={2} height={2}><Box>North</Box></Positioned>
      <Positioned x={1} y={3} width={2} height={2}><Box>West</Box></Positioned>
      <Positioned x={3} y={1} width={2} height={2}><Box>South</Box></Positioned>
    </CellPlot>
  </Container>
)
```

![CellPlot](https://user-images.githubusercontent.com/4449/30896409-6d54129a-a305-11e7-9790-3391eb46c536.png)

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
