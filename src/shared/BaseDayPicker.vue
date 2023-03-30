<template>
  <div
    class="day-picker-container bg-white rounded-lg grid grid-cols-3 mb-3 container w-full h-16"
  >
    <div class="flex items-center justify-center w-full h-full">
      <arrow-left-icon
        class=" hover:opacity-50 hover:cursor-pointer"
        color="#1E90FF"
        @click="previousDay"
      />
    </div>
    <div
      class="grid items-center justify-center w-full h-full border-l-2 border-r-2 hover:border-gray-400 hover:bg-gray-100 hover:opacity-50 text-base font-medium leading-5"
    >
      <div class="w-full">
        <span class="w-full flex justify-center">{{ getDay }}</span>
        <span class="w-full flex justify-center">{{ getMonth }}</span>
      </div>
    </div>
    <div class="flex items-center justify-center w-full h-full">
      <arrow-right-icon
        class="hover:border-gray-400 disabled hover:opacity-50 hover:cursor-pointer"
        color="#1E90FF"
        @click="nextDay"
        disabled="true"
      />
    </div>
  </div>
</template>

<script>
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon.vue";
import { MONTHS } from "@/utils/constants";
import { addDays } from "@/utils/helpers";

export default {
  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
  },
  data() {
    return {
      date: new Date(),
      disabled: true,
    };
  },
  computed: {
    getDay() {
      return this.date.getDate();
    },
    getMonth() {
      return MONTHS[this.date.getMonth()];
    },
  },
  methods: {
    nextDay() {
      this.date = addDays(this.date, 1);
      this.$emit("selectedDate", this.date);
    },
    previousDay() {
      this.date = addDays(this.date, -1);
      this.$emit("selectedDate", this.date);
    },
  },
};
</script>
