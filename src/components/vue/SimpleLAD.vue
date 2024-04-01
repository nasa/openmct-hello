<template>
  <div class="lad-table">
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Value</th>
          <th>Limit</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="param in ladData" :key="param.key">
          <td>{{ param.name }}</td>
          <td>{{ param.value }}</td>
          <td>{{ param.limit }}</td>
          <td :class="getStatusClass(param.status)">{{ param.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  inject: ['openmct', 'domainObject'],
  data() {
    return {
      ladData: []
    }
  },
  mounted() {
    // Subscribe to telemetry data from OpenMCT
    this.subscription = this.openmct.telemetry.subscribe(this.domainObject, this.handleTelemetryData)
  },
  beforeUnmount() {
    // Unsubscribe from telemetry data when the component is destroyed
    if (this.subscription) {
      this.subscription()
    }
  },
  methods: {
    handleTelemetryData(data) {
      // Update the LAD data with the received telemetry data
      this.ladData = data.map(item => ({
        key: item.key,
        name: item.name,
        value: item.value,
        limit: item.limit,
        status: this.getStatus(item.value, item.limit)
      }))
    },
    getStatus(value, limit) {
      // Determine the status based on the value and limit
      if (value > limit) {
        return 'Out of Limit'
      } else {
        return 'Normal'
      }
    },
    getStatusClass(status) {
      // Return the CSS class based on the status
      return status === 'Out of Limit' ? 'out-of-limit' : 'normal'
    }
  }
}
</script>
