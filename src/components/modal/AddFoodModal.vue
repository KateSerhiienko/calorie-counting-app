<template>
  <div class="modal">
    <div v-if="getIsAddFoodManually">
      Manually
      <form-component
        :fields-list="fieldsList"
        :count-total-kcal="true"
        :button="'Save'"
        @submit-form="handleFormSubmit"
      />
    </div>
    <div v-else>Database</div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import FormComponent from '../common/FormComponent.vue';

  export default {
    name: 'AddFoodModal',
    components: {
      FormComponent,
    },
    data() {
      return {
        fieldsList: [
          {
            name: 'food',
            label: 'Name of food',
            tag: 'input',
            type: 'text',
            placeholder: 'Pizza, apple, coca cola, etc. ...',
          },
          {
            name: 'kcalPer100g',
            label: 'Сalories per 100g',
            tag: 'input',
            type: 'number',
            placeholder: 0,
            value: 0,
            min: 0,
            max: 999,
            units: 'kcal',
          },
          {
            name: 'weight',
            label: 'Food weight in grams',
            tag: 'input',
            type: 'number',
            placeholder: 100,
            value: 100,
            min: 1,
            max: 10000,
            units: 'g',
          },
        ],
      };
    },
    computed: {
      ...mapGetters([
        'getMealtimeList',
        'getMealtimeOfProduct',
        'getIsAddFoodManually',
      ]),
    },
    methods: {
      ...mapMutations(['setModalOpened']),
      handleFormSubmit(formData) {
        this.setModalOpened('');
        console.log('Form data:', formData);
      },
    },
  };
</script>
