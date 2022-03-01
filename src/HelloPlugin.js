export default function HelloPlugin () {
  return function install (openmct) {
    openmct.types.addType('mars-weather-telemetry', {
      name: 'Mars Weather Telemetry',
      cssClass: 'icon-generator-telemetry'
    });

    openmct.telemetry.addProvider({
      supportsRequest(object) {
        return object.type === 'mars-weather-telemetry'
      },
      async request(object) {
        const response = await fetch('https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json');
        const responseJson = await response.json();

        return responseJson.soles.map((sol) => {
          return {
            utc: Date.parse(sol.terrestrial_date),
            min_temp: sol.min_temp
          }
        });
      }
    })
  };
}
