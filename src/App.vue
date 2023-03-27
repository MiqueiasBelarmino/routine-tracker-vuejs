<template>
  <base-container>
    <div
      class="container items-center justify-center w-full max-w-2xl px-2 py-16 sm:px-0"
    >
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <base-tab title="Habits" />
          <base-tab title="Tasks" />
        </TabList>

        <TabPanels class="mt-4">
          <base-tab-panel title="Habits" :items="habits" />
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
  },
  data() {
    return {
      habits: [
        { id: 1, title: "Banho no pet" },
        { id: 2, title: "Lavar banheiro" },
        { id: 3, title: "Leitura matinal" },
        { id: 4, title: "corrida matinal" },
        { id: 5, title: "tomar 3l de agua" },
        { id: 6, title: "Praticar atividades fisicas !!!" },
        { id: 7, title: "regar as plantas" },
        { id: 8, title: "Estudar teoria musical" },
        { id: 9, title: "Praticar cello" },
      ],
      todos: [
        { id: 1, title: "comprar pomada" },
        { id: 2, title: "comprar vitamina d" },
        { id: 3, title: "comprar vw 1" },
        { id: 4, title: "ir na padaria" },
        { id: 5, title: "teste" },
        { id: 6, title: "Using Tailwind CSS" },
        { id: 7, title: "Using Tailwind CSS" },
        { id: 8, title: "Using Tailwind CSS" },
        { id: 9, title: "Using Tailwind CSS" },
      ],
    };
  },
};
</script>