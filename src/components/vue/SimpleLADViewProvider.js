import SimpleLADView from './SimpleLADView.js';

/**
 * A view provider for the SimpleLAD object.
 */
export default class SimpleLADViewProvider {
  /** @type {OpenMCT} */
  #openmct;
  /**
   * Constructs a new SimpleLADViewProvider.
   * @param {OpenMCT} openmct 
   */
  constructor(openmct) {
    this.#openmct = openmct;
  }

  /**
   * Returns the key of this view provider.
   * @returns {string}
   */
  get key() {
    return 'simple-lad';
  }

  /**
   * Returns whether the SimpleLAD object can be viewed.
   * @param {DomainObject} domainObject 
   * @returns {boolean}
   */
  canView(domainObject) {
    return domainObject.type === 'simple-lad';
  }

  /**
   * Returns whether the SimpleLAD object can be edited.
   * @returns {boolean}
   */
  canEdit() {
    return false;
  }

  /**
   * Creates a new SimpleLADView.
   * @param {DomainObject} domainObject 
   * @param {ObjectPath} objectPath 
   * @returns {SimpleLADView}
   */
  view(domainObject, objectPath) {
    return new SimpleLADView(this.#openmct, { domainObject, objectPath });
  }

  /**
   * Returns the priority of this view provider.
   * @returns {number}
   */
  priority() {
    return 1;
  }
}

/**
 * @typedef {import('openmct').OpenMCT} OpenMCT
 * @typedef {import('openmct').DomainObject} DomainObject
 * @typedef {Array<DomainObject>} ObjectPath
 */

