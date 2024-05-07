<template>
  <div
    class="modal-wrapper"
    v-show="getModalOpened"
  >
    <header-component
      :title="modalTitle"
      :is-menu="modalIsMenu"
      :is-arrow="true"
    ></header-component>
    <div class="modals">
      <add-food-modal v-if="getModalOpened === 'add-food'" />
      <developer-modal v-if="getModalOpened === 'developer'" />
      <edit-food-modal v-if="getModalOpened === 'edit-food'" />
      <edit-profile-modal v-if="getModalOpened === 'edit-profile'" />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HeaderComponent from '../common/HeaderComponent.vue';
  import AddFoodModal from './AddFoodModal.vue';
  import DeveloperModal from './DeveloperModal.vue';
  import EditFoodModal from './EditFoodModal.vue';
  import EditProfileModal from './EditProfileModal.vue';

  export default {
    name: 'WrapperModal',
    components: {
      HeaderComponent,
      AddFoodModal,
      DeveloperModal,
      EditFoodModal,
      EditProfileModal,
    },
    data() {
      return {
        modals: {
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
      ...mapGetters(['getModalOpened']),
      modalTitle() {
        const modal = this.modals[this.getModalOpened];
        return modal ? modal.title : 'Modal';
      },
      modalIsMenu() {
        const modal = this.modals[this.getModalOpened];
        return modal ? modal.isMenu : false;
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
