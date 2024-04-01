import SimpleLADView from './SimpleLADView.js';

export default class SimpleLADViewProvider {
  /** @type {import('openmct').OpenMCT} */
  #openmct;
  constructor(openmct) {
    this.#openmct = openmct;
  }

  get key() {
    return 'simple-lad';
  }

  canView(domainObject) {
    return domainObject.type === 'simple-lad';
  }

  canEdit(_domainObject) {
    return false;
  }

  view(domainObject, objectPath) {
    return new SimpleLADView(this.#openmct, { domainObject, objectPath });
  }

  priority() {
    return 1;
  }
}

