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
            class="absolute right-0 top-full z-10 mt-3 w-max overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
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
                  <a
                    @click="openCreateTaskModal"
                    class="block font-semibold text-gray-900"
                  >
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
</template>

<script>
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

export default {
  name: "Header",
  components: {
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
  props: {
    openCreateHabitModal: {
      type: Function,
      required: true,
    },
    openCreateTaskModal: {
      type: Function,
      required: true,
    },
  },
};
</script>