<template>
  <Header 
    :openCreateHabitModal="openCreateHabitModal" 
    :openCreateTaskModal="openCreateTaskModal"
  />
  <base-container>
    <div
      class="container items-center justify-center w-full max-w-2xl px-2 py-16 sm:px-0"
    >
      <base-day-picker @selected-date="selectDate" />
      <base-modal :isOpen="isCreateHabitOpen" @close="closeCreateModal">
        <template v-slot:title>New Habit</template>
        <template v-slot:content>
          <base-habit-form
            :habit="habit"
            @save-form="createHabit"
            @close-modal="closeCreateModal"
          />
        </template>
      </base-modal>

      <base-modal :isOpen="isCreateTaskOpen" @close="closeCreateTaskModal">
        <template v-slot:title>New Task</template>
        <template v-slot:content>
          <base-task-form
            :task="task"
            @save-form="newTask"
            @close-modal="closeCreateTaskModal"
          />
        </template>
      </base-modal>

      <base-modal :isOpen="isRemoveOpen" @close="closeRemoveModal">
        <template v-slot:title>Remove Habit</template>
        <template v-slot:content>
          <div class="p-6 text-center">
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete?
            </h3>
            <button
              data-modal-hide="popup-modal"
              @click="confirmRemove"
              type="button"
              class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              @click="closeRemoveModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </template>
      </base-modal>

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
    </div>
  </base-container>
</template>

<script>
import { TabGroup, TabList, TabPanels } from "@headlessui/vue";
import Header from "@/components/Header.vue";
import BaseContainer from "@/shared/BaseContainer.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import BaseBox from "@/components/BaseBox.vue";
import BaseTab from "@/components/BaseTab.vue";
import BaseTabPanel from "@/components/BaseTabPanel.vue";
import BaseWeekDayPicker from "@/shared/BaseWeekDayPicker.vue";
import BaseModal from "@/shared/BaseModal.vue";
import {
  getHabitsByDay,
  toggleHabit,
  createHabit,
  deleteHabit,
} from "@/services/habits";
import BaseDayPicker from "@/shared/BaseDayPicker.vue";
import BaseHabitForm from "@/shared/BaseHabitForm.vue";
import BaseTaskForm from "@/shared/BaseTaskForm.vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import { getUser } from "@/utils/helpers";
import { createTask, getTasksByDay, toggleTask } from "@/services/tasks";
export default {
  name: "HomeView",
  components: {
    BaseContainer,
    EditIcon,
    RemoveIcon,
    CheckCircleIcon,
    BaseBox,
    TabGroup,
    TabList,
    TabPanels,
    BaseTab,
    BaseTabPanel,
    BaseModal,
    BaseWeekDayPicker,
    BaseDayPicker,
    BaseHabitForm,
    BaseTaskForm,
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Header
  },
  data() {
    return {
      isCreateHabitOpen: false,
      isCreateTaskOpen: false,
      isRemoveOpen: false,
      isLoading: true,
      availableHabits: [],
      availableTasks: [],
      selectedDate: new Date(),
      habitIdToRemove: null,
      habit: {
        id: null,
        name: null,
        weekDays: [],
      },
      task: {
        id: null,
        name: null,
        targetDate: null,
      },
      mobileMenuOpen: false,
    };
  },
  mounted() {
    this.fetchHabitsByDate(this.selectedDate.toISOString());
    this.fetchTasksByDate(this.selectedDate.toISOString());
  },
  methods: {
    async fetchHabitsByDate(date) {
      this.isLoading = true;
      const { availableHabits } = await getHabitsByDay(date).finally(() => {
        this.isLoading = false;
      });
      this.availableHabits = availableHabits;
    },
    async fetchTasksByDate(date) {
      this.isLoading = true;
      const { availableTasks } = await getTasksByDay(date).finally(() => {
        this.isLoading = false;
      });
      this.availableTasks = availableTasks;
    },
    async toggleHabit(id) {
      const response = await toggleHabit(id, this.selectedDate);
      this.fetchHabitsByDate(this.selectedDate.toISOString());
    },
    async toggleSelectedTask(id) {
      const response = await toggleTask(id, this.selectedDate);
      this.fetchTasksByDate(this.selectedDate.toISOString());
    },
    async createHabit(habit) {
      if (getUser()) {
        await createHabit(habit).then((response) => {
          this.isCreateHabitOpen = false;
        });
      }
    },
    async newTask(task) {
      if (getUser()) {
        await createTask(task).then((response) => {
          this.isCreateTaskOpen = false;
        });
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      this.fetchHabitsByDate(this.selectedDate.toISOString());
      this.fetchTasksByDate(this.selectedDate.toISOString());
    },
    async confirmRemove() {
      await deleteHabit(this.habitIdToRemove).then((response) => {
        this.closeRemoveModal();
        this.fetchHabitsByDate(this.selectedDate.toISOString());
      });
    },
    closeCreateModal() {
      this.isCreateHabitOpen = false;
    },
    closeCreateTaskModal() {
      this.isCreateTaskOpen = false;
    },
    closeRemoveModal() {
      this.isRemoveOpen = false;
    },
    openCreateHabitModal() {
      this.isCreateHabitOpen = true;
    },
    openCreateTaskModal() {
      this.isCreateTaskOpen = true;
    },
    openRemoveModal(habitId) {
      this.habitIdToRemove = habitId;
      this.isRemoveOpen = true;
    },
  },
};
</script>