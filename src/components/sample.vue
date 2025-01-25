<template>
    <div class="min-h-screen bg-gray-100">
      <!-- ヘッダー -->
      <header class="bg-blue-600 text-white py-4">
        <div class="container mx-auto text-center">
          <h1 class="text-3xl font-bold">交換日記アプリ</h1>
        </div>
      </header>
  
      <!-- メインコンテンツ -->
      <main class="container mx-auto p-4">
        <h2 class="text-2xl font-semibold text-gray-700 mb-6">交換日記テーマ</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThemeCard
            v-for="theme in themes"
            :key="theme.id"
            :theme="theme"
            @write="openEntryForm"
          />
        </div>
      </main>
  
      <!-- フッター -->
      <footer class="bg-gray-800 text-white text-center py-4">
        <p>&copy; 2025 交換日記アプリ | All Rights Reserved</p>
      </footer>
    </div>
  </template>
  
  <style>
  /* スクロール可能なテーマカード投稿一覧 */
  .theme-entries {
    max-height: 100px;
    overflow-y: auto;
  }
  
  /* カードのスタイル */
  .theme-card {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .theme-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }
  </style>
  