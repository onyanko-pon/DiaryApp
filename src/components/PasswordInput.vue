<template>
  <div class="input">
    <h2>合言葉を入力</h2>
    <form @submit.prevent="checkPassword">
      <label for="inputPassword">合言葉:</label>
      <input type="password" v-model="inputPassword" id="inputPassword" required />
      <button type="submit">確認</button>
    </form>
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputPassword: '',
      errorMessage: '',
    }
  },
  methods: {
    checkPassword() {
      const storedPassword = localStorage.getItem('password')
      if (storedPassword === this.inputPassword) {
        // 合言葉が一致した場合、過去日記画面へ遷移
        this.$router.push({ name: 'past' })
      } else {
        // エラーメッセージを表示
        this.errorMessage = '合言葉が間違っています！'
      }
    },
  },
}
</script>
<style>
.input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
