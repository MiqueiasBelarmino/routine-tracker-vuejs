<template>
  <Tab as="template" :key="title" v-slot="{ selected }">
    <button
      :class="[
        'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
        selected
          ? 'bg-white shadow text-blue-700'
          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
      ]"
    >
      {{ title }}
    </button>
  </Tab>
</template>

<script>
import { Tab } from "@headlessui/vue";


export default {
  components: {
    Tab
  },
  props: {
    title: { required: true, type: String },
  },
};
</script>
