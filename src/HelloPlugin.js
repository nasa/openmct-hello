
import SimpleLADViewProvider from './components/vue/SimpleLADViewProvider.js';

/**
 * A plugin for the OpenMCT framework that adds a simple LAD view.
 */
export default (options = {}) => {
  /**
   * The main entry point for the plugin. Defines actions required to install
   * the plugin.
   * @param {OpenMCT} openmct the openmct api instance
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

/**
 * @typedef {import('openmct').OpenMCT} OpenMCT
 */

