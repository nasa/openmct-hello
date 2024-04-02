<template>
  <tr>
    <td :style="centerTextStyle">{{ name }}</td>
    <td>{{ value }}</td>
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
    value() {
      return this.datum
        ? this.formats[this.valueKey].format(this.datum)
        : "---";
    },
    name() {
      return this.domainObject?.name ?? "---";
    },
    // style() {
    //   if (!this.valueMetadata) {
    //     return {
    //       backgroundColor: "white",
    //     };
    //   }
    //   if (this.value > this.valueMetadata.max) {
    //     return {
    //       backgroundColor: "red",
    //     };
    //   } else {
    //     return {
    //       backgroundColor: "green",
    //     };
    //   }
    // },
  },
  mounted() {
    this.metadata = this.openmct.telemetry.getMetadata(this.domainObject);
    this.formats = this.openmct.telemetry.getFormatMap(this.metadata);
    if (this.metadata) {
      this.valueMetadata = this.metadata.valuesForHints(["range"])[0];
    }
    this.valueKey = this.valueMetadata ? this.valueMetadata.key : undefined;

    this.addTelemetryCollection();
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
      this.telemetryCollection.load();
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
