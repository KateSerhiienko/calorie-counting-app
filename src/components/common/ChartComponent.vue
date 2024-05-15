<template>
  <svg
    class="chart"
    viewBox="0 0 42 42"
  >
    <circle
      :r="radius"
      cx="50%"
      cy="50%"
      :stroke-dashoffset="dashoffset"
    />
    <circle
      ref="mainChart"
      class="front"
      :class="{ overflow: isOverflow }"
      :stroke-dasharray="dasharray"
      :stroke-linecap="'round'"
      :r="radius"
      cx="50%"
      cy="50%"
    />
  </svg>
</template>

<script>
  export default {
    name: 'ChartComponent',
    props: {
      dataDasharray: {
        type: Object,
        required: true,
      },
      radius: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        dasharray: '0 0',
        dashoffset: '100',
        radiusBaseVal: 0,
        circumference: 0,
      };
    },
    computed: {
      precisePercent() {
        const value = this.dataDasharray.value;
        const total = this.dataDasharray.total;
        return ((value * 100) / total).toFixed(1);
      },
      isOverflow() {
        return this.dataDasharray.value >= this.dataDasharray.total;
      },
    },
    mounted() {
      this.radiusBaseVal = this.$refs.mainChart.r.baseVal.value;
      this.circumference = 2 * Math.PI * this.radiusBaseVal;
      this.updateDasharray();
    },
    methods: {
      updateDasharray() {
        const percent = this.precisePercent;
        this.setLengthDasharray(percent, this.circumference);
      },
      setLengthDasharray(percent, circumference) {
        if (circumference > 0) {
          const length = (percent / 100) * circumference;
          const offset = circumference - length;
          this.dasharray = `${length} ${offset}`;
          this.dashoffset = circumference.toFixed(3);
        }
      },
    },
    watch: {
      dataDasharray: {
        handler() {
          this.updateDasharray();
        },
        deep: true,
        immediate: true,
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .chart {
    overflow: visible;
  }

  circle {
    fill: transparent;
    stroke: rgba($not-active-color, 0.3);
    stroke-width: 3px;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dasharray 0.3s ease-in;
    &.front {
      stroke: $primary-color;
    }
    &.overflow {
      stroke: $secondary-color-pink;
    }
  }
</style>
