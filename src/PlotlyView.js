export default class PlotlyView {
    constructor(openmct, domainObject) {
        this.openmct = openmct;
        this.domainObject = domainObject;

        this.plotData = this.plotData.bind(this);
        this.subscribeToNewData = this.subscribeToNewData.bind(this);
        this.addDatumToPlot = this.addDatumToPlot.bind(this);
        this.setBounds = this.setBounds.bind(this);
    }

    show(element) {
        // The HTML element that this view is rendered into.
        // See https://developer.mozilla.org/en-US/docs/Web/API/Element
        this.element = element;

        //Get the current time bounds. These can be used for initializing the x-axis of the plot
        let bounds = this.openmct.time.bounds();
        this.setBounds(bounds);
        //Listen for bounds changes
        this.openmct.time.on('bounds', this.setBounds);
        
        // Render Plotly Plot into provided HTML element as an example
        Plotly.newPlot(element, {
            x: [1, 2, 3, 4], // These should be the time values taken from the telemetry data
            y: [10, 15, 13, 17], // These will be telemetry values taken from the telemetry data
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

    setBounds(bounds) {
        //For now just log the start and end time
        console.log(`Start bounds: ${new Date(bounds.start).toISOString()}, End bounds: ${new Date(bounds.end).toISOString()}`);
        //These bounds can be used for populating the x-axis of the plot.
    }

    plotData(data) {
        /**
         * UPDATE PLOTLY PLOT WITH HISTORICAL DATA HERE
         * Data will look something like -
         * {"name":"SWG 1","utc":1567015798700,"yesterday":1566929398700,"sin":-0.7289686344389263,"cos":0.6845470984557944}
         * Where 'utc' is time in ms since Jan 1 1970 - ie JavaScript time.
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