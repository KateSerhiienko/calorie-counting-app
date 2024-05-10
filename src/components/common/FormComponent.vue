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
        <div v-if="field.tag === 'p'">
          <p>{{ field.label }}:</p>
          <p>{{ field.value }}</p>
          <span v-if="field.units">{{ field.units }}</span>
        </div>
        <div v-if="field.tag === 'select'">
          <label :for="field.name">{{ field.label }}:</label>
          <select
            :name="field.name"
            required
            :value="
              formData[field.name] !== undefined
                ? formData[field.name]
                : field.value
            "
            @change="updateFormData(field.name, $event.target.value)"
          >
            <template v-for="option in field.list">
              <option
                v-if="typeof option === 'string' || typeof option === 'number'"
                :key="option"
              >
                {{ option }}
              </option>
              <option
                v-else-if="typeof option === 'object'"
                :key="option.id"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </template>
          </select>
          <div v-if="field.tag === 'select'">
            <p>
              {{
                field.list.find(
                  (option) => option.value === formData[field.name]
                )?.explanation
              }}
            </p>
          </div>
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
  import { mapGetters } from 'vuex';

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
      ...mapGetters(['getMealtimeList']),
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
