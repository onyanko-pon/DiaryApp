<template>
  <div class="Instructions">
    <!-- 受け取った引数を表示 -->
    <h1>使い方説明</h1>
    <p>このアプリは友達と交換日記を楽しむためのアプリです</p>
    <p>親友と2人で始めたり、グループで始めたり、</p>
    <h2>使い方はあなた次第！</h2>
    <img src="../assets/yazirushi.png" alt="矢印" class="arrow-image" />
    <h2>例えば...</h2>
    <img src="../assets/template.png" alt="矢印" class="template-image" />
    <h2>まずはアカウント登録をしよう！</h2>
    <button
      class="youth-button button-2"
      @click="
        () =>
          $router.push({
            name: 'register',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      アカウント作成
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
.Instructions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
/* 矢印画像のスタイル */
.arrow-image {
  width: 200px; /* 画像の幅を小さく */
  height: auto; /* 縦横比を維持 */
  margin-top: -10px; /* 配置を少し上に */
}
.template-image {
  width: 500px; /* 画像の幅を小さく */
  height: auto; /* 縦横比を維持 */
  margin-top: -10px; /* 配置を少し上に */
}
</style>
