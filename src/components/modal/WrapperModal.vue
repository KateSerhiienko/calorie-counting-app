<template>
  <div
    class="glb-overlay modal-overlay"
    v-show="getModalOpened"
  >
    <div class="modal-wrapper">
      <header-component
        :title="modalTitle"
        :is-menu="modalIsMenu"
        :is-arrow="true"
      >
        <div v-if="getModalOpened === 'add-food'">
          <ul>
            <li @click="toggleIsAddFoodManually()">
              <svg
                class="user-image"
                :viewBox="svg['write'].viewBox"
              >
                <path :d="svg['write'].path" />
              </svg>
              <p v-if="!getIsAddFoodManually">Create custom food</p>
              <p v-else>Add food from database</p>
            </li>
          </ul>
        </div>
      </header-component>

      <div
        class="modal short"
        v-if="getModalOpened === 'mealtime'"
      >
        <mealtime-modal />
      </div>
      <div
        class="modal"
        v-else-if="getModalOpened === 'add-food'"
      >
        <add-food-modal />
      </div>
      <div
        class="modal"
        v-else-if="getModalOpened === 'developer'"
      >
        <developer-modal />
      </div>
      <div
        class="modal"
        v-else-if="getModalOpened === 'edit-food'"
      >
        <edit-food-modal />
      </div>
      <div
        class="modal"
        v-else-if="getModalOpened === 'edit-profile'"
      >
        <edit-profile-modal />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';
  import HeaderComponent from '../common/HeaderComponent.vue';
  import MealtimeModal from './MealtimeModal.vue';
  import AddFoodModal from './AddFoodModal.vue';
  import DeveloperModal from './DeveloperModal.vue';
  import EditFoodModal from './EditFoodModal.vue';
  import EditProfileModal from './EditProfileModal.vue';

  export default {
    name: 'WrapperModal',
    components: {
      HeaderComponent,
      MealtimeModal,
      AddFoodModal,
      DeveloperModal,
      EditFoodModal,
      EditProfileModal,
    },
    data() {
      return {
        modals: {
          mealtime: {
            title: 'Mealtime',
            isMenu: false,
          },
          'add-food': {
            title: 'Add Food',
            isMenu: true,
          },
          developer: {
            title: 'Developer',
            isMenu: false,
          },
          'edit-food': {
            title: 'Edit Food',
            isMenu: false,
          },
          'edit-profile': {
            title: 'Edit Profile',
            isMenu: false,
          },
        },
      };
    },
    computed: {
      ...mapGetters(['getModalOpened', 'getIsAddFoodManually']),
      svg() {
        return svgJSON;
      },
      modalTitle() {
        const modal = this.modals[this.getModalOpened];
        return modal ? modal.title : 'Modal';
      },
      modalIsMenu() {
        const modal = this.modals[this.getModalOpened];
        return modal ? modal.isMenu : false;
      },
    },
    methods: {
      ...mapMutations(['toggleIsAddFoodManually']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .modal-overlay {
    z-index: 2;
  }

  .modal-wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 20px 20px calc(20px + $container-padding);
    background-color: $primary-bg-color;

    .modal {
      margin-top: $container-padding;
      height: calc(100vh - 130px);
      max-height: calc($mobile-max-height - 130px);
      min-height: calc($mobile-min-height - 130px);

      &.short {
        height: fit-content;
        min-height: fit-content;
      }
    }
  }
</style>
