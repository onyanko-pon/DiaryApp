<template>
  <div class="aikotoba">
    <h2>合言葉を登録しよう</h2>
    <p>これはパスワードのようなもの</p>
    <p>交換日記を大切に保管するために登録しよう</p>
    <form @submit.prevent="registerPassword">
      <label for="password">合言葉:</label>
      <input type="password" v-model="password" id="password" required />
      <button type="submit">登録</button>
    </form>
    <p v-if="successMessage">{{ successMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: '',
      successMessage: '',
    }
  },
  methods: {
    registerPassword() {
      // 合言葉をローカルストレージに保存
      localStorage.setItem('password', this.password)
      this.successMessage = '合言葉を登録しました！'
      this.password = '' // フォームをリセット
    },
  },
}
</script>
<style>
.aikotoba {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
