<template>
    <div class="theme-card border rounded-lg p-4 shadow-md">
      <!-- テーマのタイトル -->
      <h2 class="text-lg font-bold mb-2">{{ theme.title }}</h2>
  
      <!-- 投稿一覧 -->
      <ul class="theme-entries mb-4 list-none">
        <li v-for="(entry, index) in entries" :key="index" class="text-gray-700">
          {{ entry }}
        </li>
      </ul>
  
      <!-- 書くボタン -->
      <button
        v-if="!showForm"
        class="bg-blue-500 text-white rounded px-4 py-2 mb-4"
        @click="showForm = true"
      >
        書く
      </button>
  
      <!-- エントリーフォーム -->
      <div v-if="showForm" class="bg-gray-100 rounded-lg p-4">
        <textarea
          v-model="entry"
          class="w-full h-32 border rounded p-2"
          placeholder="ここに書き込んでください..."
        ></textarea>
        <div class="flex justify-end space-x-2 mt-4">
          <button
            class="bg-gray-300 rounded px-4 py-2"
            @click="cancel"
          >
            キャンセル
          </button>
          <button
            class="bg-blue-500 text-white rounded px-4 py-2"
            @click="save"
          >
            保存
          </button>
        </div>
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
        showForm: false, // フォームの表示状態
        entry: "", // 入力されたエントリ内容
        entries: this.theme.entries || [], // 初期化時にテーマのエントリを設定
      };
    },
    methods: {
      // エントリーを保存する
      save() {
        if (this.entry.trim() === "") {
          alert("内容を入力してください。");
          return;
        }
        this.entries.push(this.entry); // 投稿リストに追加
        this.entry = ""; // 入力リセット
        this.showForm = false; // フォームを閉じる
      },
      // フォームを閉じる
      cancel() {
        this.entry = ""; // 入力リセット
        this.showForm = false; // フォームを閉じる
      },
    },
  };
  </script>
  
  <style>
  .theme-card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .theme-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  .theme-entries {
    max-height: 150px;
    overflow-y: auto;
    padding: 0;
  }
  .list-none {
    list-style-type: none;
  }
  </style>
  