<template>
    <div class="bg-gray-100 rounded-lg p-4">
      <h2 class="text-lg font-bold mb-4">{{ theme.title }}</h2>
      <textarea
        v-model="entry"
        class="w-full h-32 border rounded p-2"
        placeholder="ここに書き込んでください..."
      ></textarea>
      <div class="flex justify-end space-x-2 mt-4">
        <button class="bg-gray-300 rounded px-4 py-2" @click="$emit('close')">閉じる</button>
        <button
          class="bg-blue-500 text-white rounded px-4 py-2"
          @click="save"
        >
          保存
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      theme: Object,
    },
    data() {
      return {
        entry: "",
      };
    },
    methods: {
      save() {
        if (this.entry.trim() === "") {
          alert("内容を入力してください。");
          return;
        }
        this.$emit("save", this.entry);
        this.entry = "";
      },
    },
  };
  </script>
  