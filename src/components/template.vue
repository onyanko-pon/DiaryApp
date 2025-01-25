<template>
  <div class="Instructions">
    <!-- 受け取った引数を表示 -->
    <h1>テンプレートを選択しよう</h1>
    <h2>友達向け</h2>
    <button
      class="arrow-image"
      @click="
        () =>
          $router.push({
            name: 'diaryinput',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      <img src="../assets/frienddiary.png" alt="矢印" />
    </button>
    <h2>家族向け</h2>
    <button
      class="arrow-image"
      @click="
        () =>
          $router.push({
            name: 'diaryinput',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      <img src="../assets/frienddiary.png" alt="矢印" />
    </button>

    <div>{{ id }}</div>
    <div>{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'OtherPage',
  props: {
    //ここで引数を受け取る
    id: String,
    text: String,
    imageName: String,
  },
}
</script>

<style>
.arrow-image {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;
  display: inline-flex; /* 中央揃えのため */
  justify-content: center;
  align-items: center;
}

.arrow-image img {
  width: 400px; /* 必要に応じてサイズを調整 */
  height: auto;
  transition:
    transform 0.2s,
    opacity 0.2s; /* ホバーエフェクト用 */
}

.arrow-image:hover img {
  transform: scale(1.1); /* ホバー時に拡大 */
  opacity: 0.8; /* 少し透明に */
}
</style>
