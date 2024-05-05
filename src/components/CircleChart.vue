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
      :stroke-dasharray="dasharray"
      :stroke-linecap="'round'"
      :r="radius"
      cx="50%"
      cy="50%"
    />
    <text
      x="50%"
      y="50%"
      dy=".3em"
      class="chart-text"
      text-anchor="middle"
    >
      {{ displayPercent }}%
    </text>
  </svg>
</template>

<script>
  export default {
    name: 'CircleChart',
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
        dasharray: '',
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
      displayPercent() {
        return ((this.dataDasharray[0] * 100) / this.dataDasharray[1]).toFixed(
          0
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
></style>
