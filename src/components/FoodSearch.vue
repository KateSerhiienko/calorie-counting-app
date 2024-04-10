<template>
  <input type="text" v-model="searchTerm" placeholder="Search food..." />
  <ul v-show="searchTerm != ''">
    <li
      v-for="food in filteredAndSortedDatabase"
      :key="food.name"
      @click="saveEditedFood(food)"
    >
      {{ food.name }} {{ food.caloriesPer100g }} kcal
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      database: [
        { id: 1111, name: 'Banana', caloriesPer100g: 300 },
        { id: 2222, name: 'Apple', caloriesPer100g: 200 },
        { id: 3333, name: 'Apricot', caloriesPer100g: 300 },
      ],
      searchTerm: '',
    };
  },
  computed: {
    filteredAndSortedDatabase() {
      return this.database
        .filter((food) => {
          return food.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
  },
  methods: {
    saveEditedFood(food) {
      this.$emit('save-edited-food', food);
    },
  },
  emits: ['save-edited-food'],
};
</script>
