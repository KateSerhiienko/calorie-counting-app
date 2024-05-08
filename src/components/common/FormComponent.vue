<template>
  <form @submit.prevent="handleSubmit">
    <ul>
      <li
        v-for="field in fieldsList"
        :key="field.name"
      >
        <div v-if="field.tag === 'input'">
          <label :for="field.name">{{ field.label }}:</label>
          <input
            :type="field.type"
            :name="field.name"
            :placeholder="field.placeholder"
            :min="field.min"
            :max="field.max"
            required
            :value="
              formData[field.name] !== undefined
                ? formData[field.name]
                : field.value
            "
            @input="updateFormData(field.name, $event.target.value)"
          />
          <span v-if="field.units">{{ field.units }}</span>
        </div>
      </li>
    </ul>
    <div v-if="countTotalKcal">
      <p>Total: {{ totalKcal }}</p>
    </div>
    <button type="submit">{{ button }}</button>
  </form>
</template>

<script>
  export default {
    name: 'FormComponent',
    props: {
      fieldsList: {
        type: Array,
        required: true,
      },
      countTotalKcal: {
        type: Boolean,
        default: false,
      },
      button: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        formData: {},
      };
    },
    computed: {
      totalKcal() {
        const weight =
          this.formData.weight ||
          this.fieldsList.find((field) => field.name === 'weight')?.value ||
          0;
        const kcalPer100g =
          this.formData.kcalPer100g ||
          this.fieldsList.find((field) => field.name === 'kcalPer100g')
            ?.value ||
          0;

        return ((kcalPer100g / 100) * weight).toFixed();
      },
    },
    methods: {
      handleSubmit() {
        // empty field -> use initial prop value
        for (const field of this.fieldsList) {
          if (!this.formData[field.name]) {
            this.formData[field.name] =
              field.value !== undefined ? field.value : '';
          }
        }

        this.$emit('submit-form', this.formData);

        this.formData = {};
      },
      updateFormData(fieldName, value) {
        this.formData[fieldName] = value;
      },
    },
    emits: ['submit-form'],
  };
</script>
