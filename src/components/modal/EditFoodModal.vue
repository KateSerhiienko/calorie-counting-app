<template>
  <template v-if="!editedFood.idDatabase">
    <form-component
      :fields-list="manuallyFieldsList"
      :count-total-kcal="true"
      :button="'Save'"
      @submit-form="handleFormSubmit"
    />
  </template>
  <template v-else>
    <form-component
      :fields-list="fromDatabaseFieldsList"
      :count-total-kcal="true"
      :button="'Save'"
      @submit-form="handleFormSubmit"
    />
  </template>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import FormComponent from '../common/FormComponent.vue';

  export default {
    name: 'EditFoodModal',
    components: {
      FormComponent,
    },
    data() {
      return {
        editedFood: null,
      };
    },
    created() {
      this.editedFood = this.getFoodsList.find(
        (food) => food.id === this.getIdEditingFood
      );
    },
    computed: {
      ...mapGetters(['getIdEditingFood', 'getFoodsList', 'getMealtimeList']),
      manuallyFieldsList() {
        return [
          {
            name: 'mealtime',
            label: 'Mealtime',
            tag: 'select',
            list: this.getMealtimeList,
            value: this.editedFood.mealtime,
          },
          {
            name: 'name',
            label: 'Name of food',
            tag: 'input',
            type: 'text',
            value: this.editedFood.name,
          },
          {
            name: 'kcalPer100g',
            label: 'Сalories per 100g',
            tag: 'input',
            type: 'number',
            value: this.editedFood.kcalPer100g,
            min: 0,
            max: 999,
            units: 'kcal',
          },
          {
            name: 'weight',
            label: 'Food weight in grams',
            tag: 'input',
            type: 'number',
            value: this.editedFood.weight,
            min: 1,
            max: 10000,
            units: 'g',
          },
        ];
      },
      fromDatabaseFieldsList() {
        return [
          {
            name: 'mealtime',
            label: 'Mealtime',
            tag: 'select',
            list: this.getMealtimeList,
            value: this.editedFood.mealtime,
          },
          {
            name: 'name',
            label: 'Name of food',
            tag: 'p',
            value: this.editedFood.name,
          },
          {
            name: 'kcalPer100g',
            label: 'Сalories per 100g',
            tag: 'p',
            value: this.editedFood.kcalPer100g,
            units: 'kcal',
          },
          {
            name: 'weight',
            label: 'Food weight in grams',
            tag: 'input',
            type: 'number',
            value: this.editedFood.weight,
            min: 1,
            max: 10000,
            units: 'g',
          },
        ];
      },
    },
    methods: {
      ...mapMutations(['setModalOpened', 'updateFood']),
      handleFormSubmit(formData) {
        const foodToUpdate = { ...formData };
        Object.keys(this.editedFood).forEach((key) => {
          if (!foodToUpdate.hasOwnProperty(key)) {
            foodToUpdate[key] = this.editedFood[key];
          } else if (
            typeof foodToUpdate[key] === 'string' &&
            !isNaN(foodToUpdate[key])
          ) {
            foodToUpdate[key] = parseFloat(foodToUpdate[key]);
          }
        });
        this.updateFood(foodToUpdate);
        this.setModalOpened('');
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
></style>
