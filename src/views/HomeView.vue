<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
        </a>
      </div>
      <Popover class="relative">
        <PopoverButton
          class="flex items-center text-sm font-semibold leading-6 text-gray-900"
        >
          New
        </PopoverButton>

        <transition
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-1"
        >
          <PopoverPanel
            class="absolute right-0 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
          >
            <div class="p-4">
              <div
                class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div class="flex-auto">
                  <a
                    @click="openCreateHabitModal"
                    class="block font-semibold text-gray-900"
                  >
                    Habit
                    <span class="absolute inset-0" />
                  </a>
                  <p class="mt-1 text-gray-600">Repetitive task</p>
                </div>
              </div>

              <div
                class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
              >
                <div class="flex-auto">
                  <a class="block font-semibold text-gray-900">
                    Task
                    <span class="absolute inset-0" />
                  </a>
                  <p class="mt-1 text-gray-600">Specific day task</p>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </nav>
  </header>
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
          <TabPanels v-else-if="!isLoading && availableHabits" class="mt-4">
            <base-tab-panel
              v-if="availableHabits"
              @click-edit="openCreateHabitModal"
              @click-remove="openRemoveModal"
              @toggle="toggleHabit"
              title="Habits"
              :items="availableHabits"
            />
            <base-tab-panel title="Tasks" :items="todos" />
          </TabPanels>
      </TabGroup>
    </div>
  </base-container>
</template>

<script>
import { TabGroup, TabList, TabPanels } from "@headlessui/vue";
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
  getHabits,
  getHabitsByDay,
  toggleHabit,
  createHabit,
  deleteHabit,
} from "@/services/habits";
import BaseDayPicker from "@/shared/BaseDayPicker.vue";
import BaseHabitForm from "@/shared/BaseHabitForm.vue";
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
import { getUser } from '@/utils/helpers';

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
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
  },
  data() {
    return {
      isCreateHabitOpen: false,
      isRemoveOpen: false,
      isLoading: true,
      availableHabits: [],
      selectedDate: new Date(),
      habitIdToRemove: null,
      habit: {
        id: null,
        name: null,
        weekDays: [],
      },
      todos: [
        { id: 2, name: "comprar vitamina" },
        { id: 3, name: "comprar vw 1" },
        { id: 4, name: "ir na padaria" },
      ],
      mobileMenuOpen: false,
    };
  },
  mounted() {
    this.fetchHabitsByDate(this.selectedDate.toISOString());
  },
  methods: {
    async fetchHabits() {
      const { availableHabits } = await getHabits();
      this.availableHabits = availableHabits;
    },
    async fetchHabitsByDate(date) {
      this.isLoading = true;
      const { availableHabits } = await getHabitsByDay(date).finally(() => {
        this.isLoading = false;
      });
      this.availableHabits = availableHabits;
    },
    async toggleHabit(id) {
      const response = await toggleHabit(id, this.selectedDate);
      this.fetchHabitsByDate(this.selectedDate.toISOString());
    },
    async createHabit(habit) {
      if(getUser()){
        await createHabit(habit).then((response) => {
          // console.log(response);
          this.isCreateHabitOpen = false;
        });
      }
    },
    selectDate(date) {
      this.selectedDate = date;
      this.fetchHabitsByDate(this.selectedDate.toISOString());
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
    closeRemoveModal() {
      this.isRemoveOpen = false;
    },
    openCreateHabitModal() {
      this.isCreateHabitOpen = true;
    },
    openRemoveModal(habitId) {
      this.habitIdToRemove = habitId;
      this.isRemoveOpen = true;
    },
  },
};
</script>