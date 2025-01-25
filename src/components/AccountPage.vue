<template>
  <div class="account-page">
    <h1>アカウント・友達登録</h1>
    <p>ここでアカウントの作成や友達の登録ができます。</p>
    <button
      class="youth-button button-1"
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
    <h2></h2>
    <button
      class="youth-button button-2"
      @click="
        () =>
          $router.push({
            name: 'friend',
            params: { id: '1', text: 'Option 1: Writing my thoughts' },
          })
      "
    >
      友達登録
    </button>
  </div>
</template>

<script>
export default {
  name: 'AccountPage',
}
</script>

<style>
.account-page {
  text-align: center;
  margin-top: 30px;
}
</style>
