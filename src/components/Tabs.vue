<template>
  <TabGroup>
    <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
      <base-tab title="Habits" />
      <base-tab title="Tasks" />
    </TabList>

    <div v-if="isLoading" class="flex justify-center">
      <div
        class="mt-3 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span
          class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span
        >
      </div>
    </div>
    <TabPanels
      v-else-if="!isLoading && (availableHabits || availableTasks)"
      class="mt-4"
    >
      <base-tab-panel
        v-if="availableHabits"
        @click-edit="openCreateHabitModal"
        @click-remove="openRemoveModal"
        @toggle="toggleHabit"
        title="Habits"
        :items="availableHabits"
      />
      <base-tab-panel
        v-if="availableTasks"
        @click-edit="openCreateTaskModal"
        @click-remove="openRemoveModal"
        @toggle="toggleSelectedTask"
        title="Tasks"
        :items="availableTasks"
      />
    </TabPanels>
  </TabGroup>
</template>
  
  <script>
import { TabGroup, TabList, TabPanels } from "@headlessui/vue";
import BaseTab from "@/components/BaseTab.vue";
import BaseTabPanel from "@/components/BaseTabPanel.vue";

export default {
  name: "Tabs",
  components: {
    TabGroup,
    TabList,
    TabPanels,
    BaseTab,
    BaseTabPanel,
  },
  props: {
    isLoading: Boolean,
    availableHabits: Array,
    availableTasks: Array,
    openCreateHabitModal: Function,
    openCreateTaskModal: Function,
    openRemoveModal: Function,
    toggleHabit: Function,
    toggleSelectedTask: Function
  },
};
</script>
  