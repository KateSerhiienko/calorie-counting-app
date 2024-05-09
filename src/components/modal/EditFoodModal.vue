<template>
  <div v-if="!editedFood.idDatabase">
    <form-component
      :mealtime="editedFood.mealtime"
      :fields-list="manuallyFieldsList"
      :count-total-kcal="true"
      :button="'Save'"
      @submit-form="handleFormSubmit"
    />
  </div>
  <div v-else>
    <form-component
      :mealtime="editedFood.mealtime"
      :fields-list="fromDatabaseFieldsList"
      :count-total-kcal="true"
      :button="'Save'"
      @submit-form="handleFormSubmit"
    />
  </div>
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
      ...mapGetters(['getIdEditingFood', 'getFoodsList']),
      manuallyFieldsList() {
        return [
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
