<template>
  <div
    class="modal-overlay"
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
      <div class="modal">
        <mealtime-modal v-if="getModalOpened === 'mealtime'" />
        <add-food-modal v-else-if="getModalOpened === 'add-food'" />
        <developer-modal v-else-if="getModalOpened === 'developer'" />
        <edit-food-modal v-else-if="getModalOpened === 'edit-food'" />
        <edit-profile-modal v-else-if="getModalOpened === 'edit-profile'" />
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
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
    background-color: rgba($primary-text-color, 0.5);
    backdrop-filter: blur(5px);
    padding-top: 40px;
  }

  .modal-wrapper {
    height: 100%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 20px;
    background-color: $secondary-bg-color;

    .modal {
      margin-top: $container-padding;
    }
  }
</style>
