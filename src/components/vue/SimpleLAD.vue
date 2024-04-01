<template>
  <div class="lad-table">
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ name }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ["openmct", "domainObject"],
  data() {
    return {
      datum: null,
    };
  },
  computed: {
    value() {
      return this.datum ? this.formats[this.valueKey].format(this.datum) : '---';
    },
    name() {
      return this.datum?.name ?? '---';
    }
  },
  mounted() {
    const compositionCollection = this.openmct.composition.get(
      this.domainObject
    );
    compositionCollection.on("add", this.addTelemetrySource);
    compositionCollection.on("remove", this.removeTelemetrySource);
    compositionCollection.load();
    // Subscribe to telemetry data from OpenMCT
    this.subscription = this.openmct.telemetry.subscribe(
      this.domainObject,
      this.handleTelemetryData
    );
  },
  beforeUnmount() {
    // Unsubscribe from telemetry data when the component is destroyed
    if (this.subscription) {
      this.subscription();
    }
  },
  methods: {
    addTelemetrySource(domainObject) {
      
      this.metadata = this.openmct.telemetry.getMetadata(domainObject);
      this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
      if (this.metadata) {
        this.valueMetadata = this.metadata.valuesForHints(["range"])[0];
      }
      this.valueKey = this.valueMetadata ? this.valueMetadata.key : undefined;

      this.subscription = this.openmct.telemetry.subscribe(
        domainObject,
        this.handleTelemetryData
      );
    },
    removeTelemetrySource(domainObject) {
      this.subscription();
    },
    handleTelemetryData(datum) {
      // Update the LAD data with the received telemetry data
      this.datum = datum;
    },
    getStatus(value, limit) {
      // Determine the status based on the value and limit
      if (value > limit) {
        return "Out of Limit";
      } else {
        return "Normal";
      }
    },
    getStatusClass(status) {
      // Return the CSS class based on the status
      return status === "Out of Limit" ? "out-of-limit" : "normal";
    },
  },
};
</script>
