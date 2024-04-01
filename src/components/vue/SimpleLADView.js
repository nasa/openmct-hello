import SimpleLAD from './SimpleLAD.vue';
import { createApp } from 'vue';

export default class SimpleLADView {
  /** @type {import('openmct').OpenMCT} */
  #openmct;
  /** @type {import('vue').App} */
  #app;
  /** @type {import('vue').Component} */
  #component;
  /** @type {import('openmct').DomainObject} */
  #domainObject;
  /** @type {string} */
  #objectPath;
  constructor(openmct, options = {}) {
    this.#openmct = openmct;
    this.#app = null;
    this.#component = null;
    this.#domainObject = options.domainObject;
    this.#objectPath = options.objectPath;
  }
  show(element) {
    this.#app = createApp(SimpleLAD);
    this.#app.provide('openmct', this.#openmct);
    this.#app.provide('domainObject', this.#domainObject);
    this.#component = this.#app.mount(element);
  }
  destroy() {
    this.#app.unmount();
    this.#app = null;
    this.#component = null;
  }
}

