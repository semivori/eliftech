<template>
  <div class="row form-group" :class="{ required: required }">
    <label class="col-form-label col-sm-4">
      <b>{{ label }}</b>
    </label>
    <div class="col-sm-8">
      <ValidationProvider v-slot="v" :rules="rules">
        <input
            :value="value"
            @input="$emit('input', $event.target.value)"
            :type="type"
            class="form-control"
        />
        <div v-if="v.errors[0]" class="error">{{ v.errors[0] }}</div>
      </ValidationProvider>
    </div>
  </div>
</template>

<script>
export default {
  name: "Field",
  props: {
    value: [String, Number],
    label: String,
    rules: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "text",
    },
  },
  computed: {
    required() {
      return this.rules.match(/required/)
    }
  }
};
</script>

<style scoped>
.form-group.required > label:after {
  content: "*";
  color: red;
  position: relative;
  top: 0;
  right: -5px;
}

.error {
  color: red;
  font-size: 0.85em;
}
</style>