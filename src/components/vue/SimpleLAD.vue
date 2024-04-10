<template>
  <div class="c-table c-lad-table">
    <table>
      <thead>
        <tr>
          <th>Parameter Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <SimpleLADRow
          v-for="parameter in parameters"
          :domain-object="parameter"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import SimpleLADRow from "./SimpleLADRow.vue";

export default {
  inject: ["openmct", "domainObject", "objectPath"],
  provide() {
    return {
      timeContext: this.openmct.time.getContextForView(this.objectPath),
    };
  },
  components: {
    SimpleLADRow,
  },
  data() {
    return {
      datum: null,
      parameters: [],
    };
  },
  created() {
    /**
     * In the created() hook, we can perform any actions not dependent on the DOM.
     * Typically, this is where we would set up event listeners for changes to the domain object.
     * Here we are setting up event listeners for changes to the composition collection.
     * When a telemetry source is added or removed, we update our parameters array.
     */
    this.compositionCollection = this.openmct.composition.get(
      this.domainObject,
    );
    this.compositionCollection.on("add", this.addTelemetrySource);
    this.compositionCollection.on("remove", this.removeTelemetrySource);
  },
  mounted() {
    /**
     * In the mounted() hook, we can perform any actions that depend on the DOM. Since loading the
     * composition collection will potentially trigger a change to the parameters array, which will
     * trigger a change to the DOM, we do it here.
     */
    this.compositionCollection.load();
  },
  beforeUnmount() {
    /**
     * In the beforeUnmount() hook, we remove the event listeners for the composition collection.
     * This is important to do to avoid memory leaks.
     */
    this.compositionCollection.off("add", this.addTelemetrySource);
    this.compositionCollection.off("remove", this.removeTelemetrySource);
  },
  methods: {
    /**
     * Add a telemetry source to the parameters array.
     * @param {import('openmct').DomainObject} domainObject The telemetry source to add.
     */
    addTelemetrySource(domainObject) {
      this.parameters.push(domainObject);
    },
    /**
     * Remove a telemetry source from the parameters array.
     * @param {import('openmct').Identifier} identifier The identifier of the telemetry source to remove.
     */
    removeTelemetrySource(identifier) {
      this.parameters = this.parameters.filter(
        (domainObject) =>
          !this.openmct.objects.areIdsEqual(
            domainObject.identifier,
            identifier,
          ),
      );
    },
    /**
     * Reset the value of the datum.
     */
    resetValue() {
      this.datum = null;
    },
  },
};
</script>
