<template>
  <div class="modal">
    <div v-if="getIsAddFoodManually">
      Manually
      <form-component
        :mealtime="getMealtimeOfFood"
        :fields-list="manuallyFieldsList"
        :count-total-kcal="true"
        :button="'Save'"
        @submit-form="handleFormSubmit"
      />
    </div>
    <div v-else>
      Database
      <div v-if="isSearchingFood">
        <food-search-component @select-food="handleFoodSelect" />
      </div>
      <div v-else>
        <form-component
          :mealtime="getMealtimeOfFood"
          :fields-list="fromDatabaseFieldsList"
          :count-total-kcal="true"
          :button="'Save'"
          @submit-form="handleFormSubmit"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import FormComponent from '../common/FormComponent.vue';
  import FoodSearchComponent from '../common/FoodSearchComponent.vue';

  export default {
    name: 'AddFoodModal',
    components: {
      FormComponent,
      FoodSearchComponent,
    },
    data() {
      return {
        manuallyFieldsList: [
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
        fromDatabaseFieldsList: [
          {
            name: 'name',
            label: 'Name of food',
            tag: 'p',
            value: '',
          },
          {
            name: 'kcalPer100g',
            label: 'Сalories per 100g',
            tag: 'p',
            value: '',
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
        isSearchingFood: true,
      };
    },
    computed: {
      ...mapGetters(['getMealtimeOfFood', 'getIsAddFoodManually']),
    },
    methods: {
      ...mapMutations(['setModalOpened']),
      handleFormSubmit(formData) {
        this.setModalOpened('');
      },
      handleFoodSelect(food) {
        this.isSearchingFood = false;
        this.fromDatabaseFieldsList.forEach((field) => {
          if (field.name && food.hasOwnProperty(field.name)) {
            field.value = food[field.name];
          }
        });
      },
    },
  };
</script>
