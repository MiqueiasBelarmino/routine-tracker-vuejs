<template>
  <form>
    <div class="space-y-1">
      <div class="pb-3">
        <div class="mt-2 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
          <div class="col-span-full">
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Task name</label
            >
            <div class="mt-2">
              <input
                v-model="task.name"
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                class="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-900/10 pb-2">
        <div class="mt-2 space-y-2">
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-gray-900">
              Date
            </legend>
            <input v-model="task.targetDate" type="date" name="targetDate" id="targetDate">
          </fieldset>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="button"
        @click="this.$emit('closeModal')"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Cancel
      </button>
      <button
        type="button"
        @click="this.$emit('saveForm', this.task)"
        class="rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script>
import BaseWeekDayPicker from "./BaseWeekDayPicker.vue";

export default {
  components: {
    BaseWeekDayPicker,
  },
  emits: ['closeModal', 'saveForm'],
  data() {
    return {
      task: {id: null, name: null, priority: 0, targetDate: null}
    }
  }
};
</script>

<style>
</style>