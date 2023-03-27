<template>
  <div class="relative grid grid-cols-3 sm:grid-cols-4">
    <base-checkbox id="sunday" name="sunday" label="Sunday" />
    <base-checkbox id="monday" name="monday" label="Monday" />
    <base-checkbox id="tuesday" name="tuesday" label="Tuesday" />
    <base-checkbox id="wednesday" name="wednesday" label="Wednesday" />
    <base-checkbox id="thursday" name="thursday" label="Thursday" />
    <base-checkbox id="friday" name="friday" label="Friday" />
    <base-checkbox id="saturday" name="saturday" label="Saturday" />
  </div>
</template>
<script>
import BaseCheckbox from "@/shared/BaseCheckbox.vue";

export default {
  components: {
    BaseCheckbox
  }
}
</script>
