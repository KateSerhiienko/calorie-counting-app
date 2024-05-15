<template>
  <form
    @submit.prevent="handleSubmit"
    class="form-wrapper"
  >
    <ul>
      <template
        v-for="field in fieldsList"
        :key="field.name"
      >
        <li v-if="field.tag === 'input'">
          <label
            class="glb-label"
            :for="field.name"
            >{{ field.label }}:</label
          >
          <input
            class="glb-input"
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
          <span
            class="units"
            v-if="field.units"
            >{{ field.units }}</span
          >
        </li>
        <li v-if="field.tag === 'p'">
          <p class="glb-label">{{ field.label }}:</p>
          <p>{{ field.value }}</p>
          <span
            class="units"
            v-if="field.units"
            >{{ field.units }}</span
          >
        </li>
        <li v-if="field.tag === 'select'">
          <label
            class="glb-label"
            :for="field.name"
            >{{ field.label }}:</label
          >
          <select
            class="glb-select"
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
          <div v-if="field.tag === 'select' && field.explenation">
            <p class="glb-label explanation">
              {{ optionExplanations[formData[field.name]] }}
            </p>
          </div>
        </li>
      </template>
      <div
        class="total"
        v-if="countTotalKcal"
      >
        <p>
          Total: <span>{{ totalKcal }} kcal</span>
        </p>
      </div>
    </ul>
    <button
      class="glb-btn"
      type="submit"
    >
      {{ button }}
    </button>
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
        formData: Object.fromEntries(
          this.fieldsList.map((field) => [
            field.name,
            field.value !== undefined ? field.value : '',
          ])
        ),
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
      optionExplanations() {
        const explanations = {};
        for (const field of this.fieldsList) {
          if (field.tag === 'select') {
            for (const option of field.list) {
              if (typeof option === 'object') {
                explanations[option.value] = option.explanation;
              }
            }
          }
        }
        return explanations;
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

<style
  scoped
  lang="scss"
>
  .form-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    ul {
      display: flex;
      flex-direction: column;
    }

    li {
      display: flex;
      flex-direction: column;
      margin-bottom: calc($container-padding * 2);
      position: relative;
    }

    p:not(.glb-label) {
      font-weight: bold;
    }

    .explanation {
      font-size: 12px;
      padding-top: calc($container-padding / 4);
      padding-left: calc($container-padding / 4);
    }

    .units {
      position: absolute;
      right: 2px;
      bottom: 0;
    }

    .total {
      align-self: flex-end;

      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }

    button {
      align-self: center;
    }
  }
</style>
