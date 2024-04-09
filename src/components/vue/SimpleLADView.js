import SimpleLAD from './SimpleLAD.vue';
import { createApp } from 'vue';

/**
 * The SimpleLADView defines show() and destroy() methods for the SimpleLAD Vue 3 component.
 */
export default class SimpleLADView {
  /** @type {OpenMCT} */
  #openmct;
  /** @type {import('vue').App} */
  #app;
  /** @type {import('vue').Component} */
  #component;
  /** @type {DomainObject} */
  #domainObject;
  /** @type {ObjectPath} */
  #objectPath;
  /**
   * Constructs a new SimpleLADView.
   * @param {OpenMCT} openmct 
   * @param {DomainObject} options.domainObject
   * @param {ObjectPath} options.objectPath
   */
  constructor(openmct, options = {}) {
    this.#openmct = openmct;
    this.#app = null;
    this.#component = null;
    this.#domainObject = options.domainObject;
    this.#objectPath = options.objectPath;
  }

  /**
   * Method called when navigating to the SimpleLAD object. Defines how the component should be
   * mounted to the main object view element.
   * 
   * Limitations:
   * - Open MCT currently does not support mounting Vue 3 components directly into the main app,
   * so a new Vue 3 app is created. We then mount the newly created app onto the provided element.
   * 
   * @param {HTMLElement} element The element to mount the component to.
   */
  show(element) {
    this.#app = createApp(SimpleLAD);
    // Provide the openmct, objectPath, and domainObject to the SimpleLAD component.
    this.#app.provide('openmct', this.#openmct);
    this.#app.provide('objectPath', this.#objectPath);
    this.#app.provide('domainObject', this.#domainObject);
    this.#component = this.#app.mount(element);
  }

  /**
   * Method called when navigating away from the SimpleLAD object. Unmounts the SimpleLAD Vue 3
   * component and sets unused resources to null to expediate garbage collection.
   */
  destroy() {
    this.#app.unmount();
    this.#app = null;
    this.#component = null;
  }
}

/**
 * @typedef {import('openmct').OpenMCT} OpenMCT
 * @typedef {import('openmct').DomainObject} DomainObject
 * @typedef {Array<DomainObject>} ObjectPath
 */
