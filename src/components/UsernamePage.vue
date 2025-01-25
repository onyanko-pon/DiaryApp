<template>
  <div class="username-page">
    <h1>ユーザー名を登録してください</h1>
    <p><input type="text" placeholder="ユーザー名" v-model="username" /></p>
    <p><button class="youth-button button-5" @click="registerUsername">登録</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, updateProfile } from 'firebase/auth'

const username = ref('')
const router = useRouter()
const auth = getAuth()

function registerUsername() {
  if (username.value.trim() === '') {
    alert('ユーザー名を入力してください。')
    return
  }

  const user = auth.currentUser
  if (user) {
    updateProfile(user, {
      displayName: username.value,
    })
      .then(() => {
        alert(`ようこそ、${username.value}さん！`)
        router.push('/information') // mainPageへ遷移
      })
      .catch((error) => {
        console.error(error)
        alert('ユーザー名の登録に失敗しました。')
      })
  } else {
    alert('ユーザーが認証されていません。もう一度ログインしてください。')
    router.push('/') // ログインページへ戻る
  }
}
</script>

<style>
.username-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin-top: 30px;
}
</style>
