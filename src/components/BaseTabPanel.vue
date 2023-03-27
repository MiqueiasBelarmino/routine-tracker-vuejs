<template>
  <TabPanel :key="title" class="rounded-xl">
    <ul>
      <base-box
        @click-edit="this.$emit('clickEdit')"
        @click-remove="this.$emit('clickRemove')"
        :done="false"
        v-for="item in items"
        :key="item.id"
      >
        <template v-slot:text>
          {{ item.title }}
        </template>
      </base-box>
    </ul>
  </TabPanel>
</template>

<script>
import BaseBox from "@/components/BaseBox.vue";
import { TabPanel } from "@headlessui/vue";

export default {
  components: {
    TabPanel,
    BaseBox,
  },
  props: {
    title: { required: true, type: String },
    items: { required: true, type: Array },
  },
};
</script>
