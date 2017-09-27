# cell-plot

React components for a plottable coordinate plane built with responsive Flexbox cells.

* [Example](https://github.com/EmpaticoOrg/cell-plot/blob/master/stories/index.tsx)
* [Demo](https://empaticoorg.github.io/cell-plot/?left=0)

# Details

* `CellPlot`: The main (default) export is a block-level component that renders something like graphing paper for plotting children components. It uses Flexbox to frame out a collection of clickable cells with borders and labels.
* `Rectangle`: Must be rendered as a descendant of `CellPlot`. Wrap this around your custom plottable components to place them within the frame using responsive, percent-based positioning and dimensions.
* `PlotConsumerProps`: CellPlot uses React [Context](https://facebook.github.io/react/docs/context.html) to provide `yAt` and `xAt` utility functions for mapping from viewport coordinates into the coordinates of your plot. These are useful for handling DOM events like mouse movements.

# Assumptions

1. The x and y values proceed in regular increments.
2. The x and y axes are numeric, but not continuous. They proceed in regular finite steps.
3. Not every x and y value is labeled, but the quantity of x and y values are some multiple of the quantity of x and y labels.
4. The lowest x and y values are in the top left corner.

## Contributing

Bug reports and pull requests are welcome. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.
