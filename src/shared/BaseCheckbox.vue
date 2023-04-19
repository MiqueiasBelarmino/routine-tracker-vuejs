<template>
  <div class="relative flex gap-x-2">
    <div class="flex h-6 items-center">
      <input
        :id="id"
        :name="name"
        v-model="model"
        :value="inputValue"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
    </div>
    <div class="text-sm leading-6">
      <label :for="id" class="font-medium text-gray-900">{{ label }}</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { type: String },
    name: { type: String },
    label: { type: String },
    modelValue: { type: [Array, Boolean] },
    inputValue: { type: String },
    label: { type: String },
  },
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>