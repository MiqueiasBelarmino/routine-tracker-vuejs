<template>
  <section class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 container mx-auto">
    <p v-for="item in itens" :key="item.id">{{ item.title }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      itens: [
        { id: 1, title: "Using Tailwind CSS" },
        { id: 2, title: "Using Tailwind CSS" },
        { id: 3, title: "Using Tailwind CSS" },
        { id: 4, title: "Using Tailwind CSS" },
        { id: 5, title: "Using Tailwind CSS" },
        { id: 6, title: "Using Tailwind CSS" },
        { id: 7, title: "Using Tailwind CSS" },
        { id: 8, title: "Using Tailwind CSS" },
        { id: 9, title: "Using Tailwind CSS" }
      ],
    };
  },
  methods: {
    getItems() {
      return this.itens;
    },
  },
};
</script>

<style>
</style>