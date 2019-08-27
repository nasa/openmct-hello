export default class PlotlyView {
    constructor(openmct, domainObject) {
        this.openmct = openmct;
        this.domainObject = domainObject;

        this.logData = this.logData.bind(this);
        this.subscribeToNewData = this.subscribeToNewData(this);
    }

    show(element) {
        // The HTML element that this view is rendered into.
        // See https://developer.mozilla.org/en-US/docs/Web/API/Element
        this.element = element;        
        
        // Render Plotly Plot into provided HTML element as an example
        Plotly.newPlot(element, {
            x: [1, 2, 3, 4], // Real telemetry data will need to go here
            y: [10, 15, 13, 17], // See above
            mode: 'markers',
            type: 'glscatter'
          });

        // Request telemetry data
        this.requestData()
            .then(this.plotData)
            .then(this.subscribeToNewData);
    }

    requestData() {
        return this.openmct.telemetry.request(this.domainObject);
    }

    plotData(data) {
        /**
         * UPDATE PLOTLY PLOT WITH HISTORICAL DATA HERE
         * */
        console.log(JSON.stringify(data));
    }

    subscribeToNewData() {
        this.openmct.telemetry.subscribe(this.domainObject, this.addDatumToPlot);
    }

    addDatumToPlot(datum){
        /**
         * UPDATE PLOTLY PLOT WITH REALTIME DATA HERE
         * */
        console.log(JSON.stringify(datum));
    }

    destroy() {
    }
}