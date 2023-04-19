<template>
  <div class="relative grid grid-cols-3 sm:grid-cols-4">
    <base-checkbox v-model="selectedWeekDays" inputValue="0" id="sunday" name="sunday" label="Sunday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="1" id="monday" name="monday" label="Monday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="2" id="tuesday" name="tuesday" label="Tuesday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="3" id="wednesday" name="wednesday" label="Wednesday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="4" id="thursday" name="thursday" label="Thursday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="5" id="friday" name="friday" label="Friday" />
    <base-checkbox v-model="selectedWeekDays" inputValue="6" id="saturday" name="saturday" label="Saturday" />
  </div>
</template>
<script>
import BaseCheckbox from "@/shared/BaseCheckbox.vue";

export default {
  components: {
    BaseCheckbox,
  },
  emits: ['selectWeekDays'],
  data() {
    return {
      selectedWeekDays: []
    };
  },
  watch: {
    selectedWeekDays(value){
      this.$emit('selectWeekDays', value);
    }
  }
};
</script>
