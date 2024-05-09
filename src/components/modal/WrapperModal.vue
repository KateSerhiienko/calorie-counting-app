<template>
  <div
    class="modal-wrapper"
    v-show="getModalOpened"
  >
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
    <div class="modals">
      <mealtime-modal v-if="getModalOpened === 'mealtime'" />
      <add-food-modal v-else-if="getModalOpened === 'add-food'" />
      <developer-modal v-else-if="getModalOpened === 'developer'" />
      <edit-food-modal v-else-if="getModalOpened === 'edit-food'" />
      <edit-profile-modal v-else-if="getModalOpened === 'edit-profile'" />
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
></style>
