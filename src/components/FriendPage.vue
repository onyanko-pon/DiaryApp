<template>
  <div class="friendpage">
    <h1>交換日記をする相手を登録</h1>
    <h2>QRコードから読み取ってもらう</h2>
    <button
      class="youth-button button-1"
      @click="
        () =>
          $router.push({
            name: 'qrcode',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      QRコード作成
    </button>
    <h2>ユーザーネームから探す（余力）</h2>
    <button
      class="youth-button button-2"
      @click="
        () =>
          $router.push({
            name: 'friendregist',
            params: { id: '2', text: 'Option 2: Writing about today' },
          })
      "
    >
      ユーザーネーム入力
    </button>
    <h2>既存のグループLINEから作る</h2>
    <button
      class="youth-button button-3"
      @click="
        () =>
          $router.push({
            name: 'group',
            params: { id: '3', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      グループLINE登録
    </button>
  </div>
</template>

<script>
export default {
  name: 'FriendPage',
}
</script>

<style>
/* 全体のボタン配置 */
.friendpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
