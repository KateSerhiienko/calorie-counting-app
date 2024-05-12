<template>
  <form-component
    :fields-list="fieldsList"
    :button="'Save'"
    @submit-form="handleFormSubmit"
  />
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import FormComponent from '../common/FormComponent.vue';

  export default {
    name: 'EditProfileModal',
    components: {
      FormComponent,
    },
    data() {
      return {
        totalDailyEnergyExpenditure: 0,
      };
    },
    computed: {
      ...mapGetters(['getUserData', 'getActivityLevels']),
      fieldsList() {
        return [
          {
            name: 'firstName',
            label: 'First Name',
            tag: 'input',
            type: 'text',
            placeholder: 'Enter your first name',
            value: this.getUserData.firstName || '',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            tag: 'input',
            type: 'text',
            placeholder: 'Enter your flast name',
            value: this.getUserData.lastName || '',
          },
          {
            name: 'sex',
            label: 'Biological sex',
            tag: 'select',
            list: ['female', 'male'],
            value: this.getUserData.sex || 'female',
          },
          {
            name: 'age',
            label: 'Age',
            tag: 'input',
            type: 'number',
            placeholder: 'Enter your age',
            value: 18,
            min: 0,
            max: 120,
            units: 'years',
          },
          {
            name: 'height',
            label: 'Height',
            tag: 'input',
            type: 'number',
            placeholder: 'Enter your height',
            value: 165,
            min: 0,
            max: 250,
            units: 'cm',
          },
          {
            name: 'weight',
            label: 'Weight',
            tag: 'input',
            type: 'number',
            placeholder: 'Enter your weight',
            value: 65,
            min: 0,
            max: 400,
            units: 'kg',
          },
          {
            name: 'activity',
            label: 'Activity level',
            tag: 'select',
            list: this.getActivityLevels,
            explenation: true,
            value: this.getUserData.activity || '1.375',
          },
        ];
      },
    },
    methods: {
      ...mapMutations(['setUserData', 'setModalOpened']),
      handleFormSubmit(formData) {
        this.countTotalDailyEnergyExpenditure(formData);
        const userData = {
          ...formData,
          totalDailyEnergyExpenditure: this.totalDailyEnergyExpenditure,
        };

        this.setUserData(userData);

        this.setModalOpened('');
      },
      countTotalDailyEnergyExpenditure(data) {
        const { age, sex, height, weight, activity } = data;

        const baseMetabolicRate =
          sex === 'male'
            ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
            : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

        this.totalDailyEnergyExpenditure = baseMetabolicRate * activity;
      },
    },
  };
</script>
