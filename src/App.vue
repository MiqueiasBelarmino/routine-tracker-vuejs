<template>
  <base-container>
    <div
      class="container items-center justify-center w-full max-w-2xl px-2 py-16 sm:px-0"
    >
      <base-day-picker @selected-date="fetchHabitsByDate" />
      <base-modal :isOpen="isEditOpen" @close="closeEditModal">
        <template v-slot:title>Edit Habit</template>
        <template v-slot:content>
          <form>
            <div class="space-y-1">
              <div class="pb-3">
                <div
                  class="mt-2 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6"
                >
                  <div class="col-span-full">
                    <label
                      for="street-address"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Habit name</label
                    >
                    <div class="mt-2">
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autocomplete="street-address"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="border-b border-gray-900/10 pb-2">
                <div class="mt-2 space-y-2">
                  <fieldset>
                    <legend
                      class="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Week Days
                    </legend>
                    <base-week-day-picker />
                  </fieldset>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                @click="closeModal"
                class="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                @click="closeModal"
                class="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </template>
      </base-modal>

      <base-modal :isOpen="isRemoveOpen" @close="closeRemoveModal">
        <template v-slot:title>Remove Habit</template>
        <template v-slot:content>
          <div class="p-6 text-center">
            <h3
              class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
            >
              Are you sure you want to delete this habit?
            </h3>
            <button
              data-modal-hide="popup-modal"
              @click="closeRemoveModal"
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

        <TabPanels class="mt-4">
          <base-tab-panel
            v-if="availableHabits"
            @click-edit="openEditModal"
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
import { getHabits, getHabitsByDay, toggleHabit } from "@/services/habits";
import BaseDayPicker from "@/shared/BaseDayPicker.vue";

export default {
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
  },
  data() {
    return {
      isEditOpen: false,
      isRemoveOpen: false,
      availableHabits: [],
      todos: [
        { id: 2, name: "comprar vitamina" },
        { id: 3, name: "comprar vw 1" },
        { id: 4, name: "ir na padaria" },
      ],
    };
  },
  mounted() {
    this.fetchHabitsByDate(new Date().toISOString());
  },
  methods: {
    async fetchHabits() {
      const { availableHabits } = await getHabits();
      this.availableHabits = availableHabits;
    },
    async fetchHabitsByDate(date) {
      const { availableHabits } = await getHabitsByDay(date);
      this.availableHabits = availableHabits;
    },
    async toggleHabit(id) {
      const response = await toggleHabit(id, new Date());
    },
    closeEditModal() {
      this.isEditOpen = false;
    },
    closeRemoveModal() {
      this.isRemoveOpen = false;
    },
    openEditModal() {
      this.isEditOpen = true;
    },
    openRemoveModal() {
      this.isRemoveOpen = true;
    },
  },
};
</script>