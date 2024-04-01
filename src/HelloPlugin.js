
import SimpleLADViewProvider from './components/vue/SimpleLADViewProvider.js';

export default (options = {}) => {
  /**
   * 
   * @param {import('openmct').OpenMCT} openmct the openmct api instance
   */
  return (openmct) => {
    openmct.objectViews.addProvider(new SimpleLADViewProvider(openmct));
    openmct.types.addType('simple-lad', {
      name: 'Simple LAD',
      creatable: true,
      description:
        'Display the current value for one or more telemetry end points in a fixed table. Each row is a telemetry end point.',
      cssClass: 'icon-tabular-lad',
      initialize(domainObject) {
        domainObject.composition = [];
      }
    });
  }
}
