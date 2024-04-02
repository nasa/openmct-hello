<template>
  <div class="lad-table">
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
      parameters: []
    };
  },
  created() {
    this.compositionCollection = this.openmct.composition.get(
      this.domainObject
    );
    this.compositionCollection.on("add", this.addTelemetrySource);
    this.compositionCollection.on("remove", this.removeTelemetrySource);
  },
  mounted() {
    this.compositionCollection.load();
  },
  beforeUnmount() {
    this.compositionCollection.off("add", this.addTelemetrySource);
    this.compositionCollection.off("remove", this.removeTelemetrySource);
  },
  methods: {
    addTelemetrySource(domainObject) {
      this.parameters.push(domainObject);
    },
    resetValue() {
      this.datum = null;
    },
    removeTelemetrySource(domainObject) {
      this.parameters = this.parameters.filter(
        (item) =>
          !this.openmct.objects.areIdsEqual(
            item.identifier,
            domainObject.identifier
          )
      );
    },
  },
};
</script>
