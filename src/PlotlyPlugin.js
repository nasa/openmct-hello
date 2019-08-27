import PlotlyViewProvider from './PlotlyViewProvider.js';

export default function PlotlyPlugin () {
  return function (openmct) {
    openmct.objectViews.addProvider(new PlotlyViewProvider(openmct));
  }
}
