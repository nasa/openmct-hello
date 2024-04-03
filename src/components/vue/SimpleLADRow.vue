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
    }
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
        const limit = this.limitEvaluator.evaluate(this.datum, this.valueMetadata);

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
    }
  },
  created() {
    this.metadata = this.openmct.telemetry.getMetadata(this.domainObject);
    this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
    if (this.metadata) {
      this.valueMetadata = this.metadata.valuesForHints(["range"])[0];
    }
    this.valueKey = this.valueMetadata ? this.valueMetadata.key : undefined;
    this.limitEvaluator = this.openmct.telemetry.limitEvaluator(this.domainObject);

    this.addTelemetryCollection();
  },
  mounted() {
    this.telemetryCollection.load();
  },
  methods: {
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
        }
      );
      this.telemetryCollection.on("add", this.setLatestValue);
      this.telemetryCollection.on("clear", this.resetValue);
    },
    removeTelemetryCollection() {
      if (!this.telemetryCollection) return;
      this.telemetryCollection.off("add", this.setLatestValue);
      this.telemetryCollection.off("clear", this.resetValue);
      this.telemetryCollection.destroy();
      this.telemetryCollection = null;
    },
    setLatestValue(datum) {
      this.datum = datum?.[0] ?? null;
    },
    resetValue() {
      this.datum = null;
    },
    beforeUnmount() {
      this.removeTelemetryCollection();
    },
  },
};
</script>
