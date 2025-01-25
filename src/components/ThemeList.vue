<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">交換日記テーマ</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ThemeCard
          v-for="theme in themes"
          :key="theme.id"
          :theme="theme"
          @write="openEntryForm"
        />
      </div>
      <EntryForm
        v-if="selectedTheme"
        :theme="selectedTheme"
        @close="selectedTheme = null"
      />
    </div>
  </template>
  
  <script>
  import ThemeCard from "./ThemeCard.vue";
  import EntryForm from "./EntryForm.vue";
  
  export default {
    components: { ThemeCard, EntryForm },
    data() {
      return {
        themes: [
          { id: 1, title: "最近のマイニュース！！" },
          { id: 2, title: "今年の目標" },
          { id: 3, title: "好きな映画について" },
        ],
        selectedTheme: null,
      };
    },
    methods: {
      openEntryForm(theme) {
        this.selectedTheme = theme;
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 800px;
  }
  </style>
  