<template>
  <div class="chart-wrapper">
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
        :stroke-dasharray="dasharray"
        :stroke-linecap="'round'"
        :r="radius"
        cx="50%"
        cy="50%"
      />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ChartComponent',
    props: {
      dataDasharray: {
        type: Array,
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
        return ((this.dataDasharray[0] * 100) / this.dataDasharray[1]).toFixed(
          1
        );
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
  .chart-wrapper {
    position: relative;
    max-width: 128px;
    min-height: 128px;
  }

  .chart {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: visible;
  }

  circle {
    fill: transparent;
    stroke: grey;
    stroke-width: 8px;
    transform-origin: center;
    transform: rotate(-90deg);
    transition: stroke-dasharray 0.3s ease-in;
    &.front {
      stroke: black;
    }
  }
</style>
