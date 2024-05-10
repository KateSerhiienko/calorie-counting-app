<template>
  <div v-if="Object.keys(getUserData).length <= 0">
    <p>
      To better understand your daily calorie needs, please provide us with some
      additional information:
    </p>
    <button
      type="button"
      @click="setModalOpened('edit-profile')"
    >
      Complete profile
    </button>
  </div>

  <div v-else>
    <div>
      <ul>
        <li v-if="getUserData.firstName || getUserData.lastName">
          <span>{{ getUserData.firstName }}</span>
          <span>{{ getUserData.lastName }}</span>
        </li>
        <li v-if="getUserData.sex">
          <span>{{ getUserData.sex }}</span>
        </li>
        <li v-if="getUserData.age">
          <span>Age:</span>
          <span>{{ getUserData.age }} years</span>
        </li>
        <li v-if="getUserData.height">
          <span>Height:</span>
          <span>{{ getUserData.height }} cm</span>
        </li>
        <li v-if="getUserData.weight">
          <span>Weight:</span>
          <span>{{ getUserData.weight }} kg</span>
        </li>
        <li v-if="getUserData.activity">
          <span>Activity Level:</span>
          <span> {{ getActivityLabel }}</span>
        </li>
      </ul>
      <svg
        class="user-image"
        :viewBox="svg['user-avatar'].viewBox"
      >
        <path :d="svg['user-avatar'].path" />
      </svg>
      <button
        type="button"
        @click="setModalOpened('edit-profile')"
      >
        Edit profile
      </button>
    </div>
    <div>
      <p>Daily calorie allowance:</p>
      <p>{{ getUserData.totalDailyEnergyExpenditure.toFixed() }}</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'ProfilePage',
    computed: {
      ...mapGetters(['getUserData', 'getActivityLevels']),
      getActivityLabel() {
        const activity = this.getActivityLevels.find(
          (level) => level.value === this.getUserData.activity
        );
        return activity ? activity.label : this.getUserData.activity;
      },
      svg() {
        return svgJSON;
      },
    },
    methods: {
      ...mapMutations(['setModalOpened']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  svg {
    width: 100px;
  }
</style>
