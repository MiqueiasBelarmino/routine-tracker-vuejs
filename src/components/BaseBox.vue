<template>
  <li
    :class="[ isDone ? 'opacity-70 line-through':'',
    'group relative flex items-center bg-white mb-2 rounded-md p-2 hover:bg-gray-100'
    ]"
    
  >
    <uncheck-circle-icon @click="toggleItem" v-if="!isDone" class="mr-3" />
    <check-circle-icon @click="toggleItem" v-if="isDone" class="mr-3" />
    <h3 class="text-base font-medium leading-5">
      <slot name="text" />
    </h3>
    <div
      class="hidden absolute right-0 h-full group-hover:flex items-center rounded justify-between bg-gray-200 px-2"
    >
      <edit-icon @click="this.$emit('clickEdit')" class="mr-2" />
      <remove-icon @click="this.$emit('clickRemove')" />
    </div>
  </li>
</template>

<script>
import EditIcon from "@/components/icons/EditIcon.vue";
import RemoveIcon from "@/components/icons/RemoveIcon.vue";
import CheckCircleIcon from "@/components/icons/CheckCircleIcon.vue";
import UncheckCircleIcon from "@/components/icons/UncheckCircleIcon.vue";

export default {
  components: {
    EditIcon,
    RemoveIcon,
    CheckCircleIcon,
    UncheckCircleIcon,
  },
  props: {
    done: { default: false, type: Boolean },
  },
  data() {
    return {
      isDone: this.done,
    };
  },
  methods: {
    toggleItem() {
      this.isDone = !this.isDone;
      this.$emit('toggle');
    },
  },
};
</script>