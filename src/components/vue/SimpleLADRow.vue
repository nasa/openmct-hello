<template>
  <tr>
    <td :style="centerTextStyle">{{ name }}</td>
    <td :class="valueClasses">{{ value }}</td>
  </tr>
</template>

<script>
export default {
  inject: ["openmct", "timeContext"],
  props: {
    domainObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      datum: null,
    };
  },
  computed: {
    centerTextStyle() {
      return {
        textAlign: "center",
      };
    },
    valueClasses() {
      const classes = [];

      if (this.datum) {
        const limit = this.limitEvaluator.evaluate(
          this.datum,
          this.valueMetadata,
        );

        if (limit) {
          classes.push(limit.cssClass);
        }
      }

      return classes;
    },
    value() {
      return this.datum
        ? this.formats[this.valueKey].format(this.datum)
        : "---";
    },
    name() {
      return this.domainObject?.name ?? "---";
    },
  },
  created() {
    // Get the metadata for the domain object
    this.metadata = this.openmct.telemetry.getMetadata(this.domainObject);
    // Get the value metadata for the domain object
    if (this.metadata) {
      this.valueMetadata = this.metadata.valuesForHints(["range"])[0];
    }
    // Get the key for the value from the value metadata
    this.valueKey = this.valueMetadata ? this.valueMetadata.key : undefined;
    // Get the format map for the metadata
    this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
    // Get the limit evaluator for the domain object
    this.limitEvaluator = this.openmct.telemetry.limitEvaluator(
      this.domainObject,
    );

    // Add the telemetry collection and set up the event listeners
    this.addTelemetryCollection();
  },
  mounted() {
    this.telemetryCollection.load();
  },
  /**
   * Remove the telemetry collection and event listeners.
   */
  beforeUnmount() {
    this.removeTelemetryCollection();
  },
  methods: {
    /**
     * Add the telemetry collection and set up the event listeners.
     */
    addTelemetryCollection() {
      if (this.telemetryCollection) {
        this.removeTelemetryCollection(this.domainObject);
      }
      this.telemetryCollection = this.openmct.telemetry.requestCollection(
        this.domainObject,
        {
          size: 1,
          strategy: "latest",
          timeContext: this.timeContext,
        },
      );
      this.telemetryCollection.on("add", this.setLatestValue);
      this.telemetryCollection.on("clear", this.resetValue);
    },
    /**
     * Remove the telemetry collection and the event listeners.
     */
    removeTelemetryCollection() {
      if (!this.telemetryCollection) return;
      this.telemetryCollection.off("add", this.setLatestValue);
      this.telemetryCollection.off("clear", this.resetValue);
      this.telemetryCollection.destroy();
      this.telemetryCollection = null;
    },
    /**
     * Set the latest value of the datum.
     * @param {*} datum The latest value of the datum.
     */
    setLatestValue(datum) {
      this.datum = datum?.[0] ?? null;
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
