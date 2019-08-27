import PlotlyView from './PlotlyView.js';

export default class PlotlyViewProvider {
    constructor(openmct) {
        this.key = 'plotly.plot';
        this.name = 'Plotly Plot';
        this.cssClass = 'icon-plot-overlay';
        this.openmct = openmct;
    }

    canView(domainObject) {
        return domainObject.telemetry !== undefined;
    }

    canEdit(domainObject) {
        return domainObject.telemetry !== undefined;
    }

    view(domainObject) {
        return new PlotlyView(this.openmct, domainObject);
    }
}