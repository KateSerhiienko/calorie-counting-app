<template>
  <div
    class="glb-wrapper profile-wrapper no-data"
    v-if="Object.keys(getUserData).length <= 0"
  >
    <p>
      To better understand your daily calorie needs, please provide us with some
      additional information by completing your profile.
    </p>
    <button
      class="glb-btn"
      type="button"
      @click="setModalOpened('edit-profile')"
    >
      Complete profile
    </button>
  </div>

  <div v-else>
    <div class="glb-wrapper profile-wrapper data">
      <h2 v-if="getUserData.firstName || getUserData.lastName">
        <span>{{ getUserData.firstName }}</span>
        <span>{{ getUserData.lastName }}</span>
      </h2>
      <div class="info">
        <ul>
          <li v-if="getUserData.sex">
            <p>{{ getUserData.sex }}</p>
          </li>
          <li v-if="getUserData.age">
            <p class="label">Age:</p>
            <p>{{ getUserData.age }} years</p>
          </li>
          <li v-if="getUserData.height">
            <p class="label">Height:</p>
            <p>{{ getUserData.height }} cm</p>
          </li>
          <li v-if="getUserData.weight">
            <p class="label">Weight:</p>
            <p>{{ getUserData.weight }} kg</p>
          </li>
          <li v-if="getUserData.activity">
            <p class="label">Activity Level:</p>
            <p>{{ getActivityLabel }}</p>
          </li>
        </ul>
        <svg :viewBox="svg['user-avatar'].viewBox">
          <path :d="svg['user-avatar'].path" />
        </svg>
      </div>
      <button
        class="glb-btn"
        type="button"
        @click="setModalOpened('edit-profile')"
      >
        Edit profile
      </button>
    </div>
    <div class="glb-wrapper profile-wrapper kcal">
      <h3>Daily calorie allowance:</h3>
      <p>
        <span>{{ getUserData.totalDailyEnergyExpenditure.toFixed() }}</span>
        kcal
      </p>
    </div>
    <div class="glb-wrapper profile-wrapper kcal">
      <h3>Calorie deficit for weight loss:</h3>
      <p>
        <span
          >{{ (getUserData.totalDailyEnergyExpenditure * 0.9).toFixed() }}
        </span>
        kcal
      </p>
    </div>
    <div class="glb-wrapper profile-wrapper kcal">
      <h3>Excess calories for weight gain:</h3>
      <p>
        <span
          >{{ (getUserData.totalDailyEnergyExpenditure * 1.1).toFixed() }}
        </span>
        kcal
      </p>
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
  .profile-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: $container-padding;

    button {
      align-self: flex-end;
    }

    &.no-data {
      p {
        margin-bottom: $container-padding;
      }
    }

    &.data {
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $container-padding;
      }

      li {
        display: flex;
        align-items: baseline;
        margin-bottom: calc($container-padding / 4);
      }

      h2 {
        font-size: 20px;
        word-wrap: anywhere;
        margin-bottom: $container-padding;

        span:nth-child(1) {
          margin-right: calc($container-padding / 2);
        }
      }

      .label {
        @include secondary-text(12px);
        margin-right: calc($container-padding / 2);
      }

      p:not(.label) {
        font-weight: bold;
      }

      svg {
        width: 100%;
        min-width: 90px;
        max-width: 90px;
      }
    }

    &.kcal {
      font-weight: bold;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &:nth-child(2) {
        @include custom-background($secondary-color-lavender);
      }
      &:nth-child(3) {
        @include custom-background($secondary-color-beige);
      }
      &:nth-child(4) {
        @include custom-background($secondary-color-blue);
      }

      h3 {
        font-size: 16px;
      }

      p {
        min-width: 90px;
        text-align: right;
      }

      span {
        font-size: 18px;
      }
    }
  }
</style>
